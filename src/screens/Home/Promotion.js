import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, CardMedia, Skeleton } from "@mui/material";
import { endPoints } from "../../constant/Environment";
import { getAllData } from "../../Utility/API";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsDashLg, BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
const Promotions = ({ showSmallShimmer = true }) => {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
   const authState = useSelector((state) => state.auth);
  const {  isAuthenticated } = authState;

  const getPromotionList = async () => {
    try {
      const url = `${endPoints.api.GET_BANNER}`;
      const result = await getAllData(url);
      if (result?.status === "success") {
        setPromoList(result?.data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPromotionList();
  }, []);

  const activeBanners = promoList?.filter((item) => item?.isActive);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div onClick={onClick} className="custom-arrow next-arrow">
        <BsArrowRight size={16} />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div onClick={onClick} className="custom-arrow prev-arrow">
        <BsArrowLeft size={16} />
      </div>
    );
  };

  const settings = {
    dots: true,
    customPaging: () => <BsDashLg className="slick-dot-icon" />,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: activeBanners?.length > 1,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div
      className="promo-mobile"
      style={{
        marginTop: !isAuthenticated ?  window.innerWidth < 768 ? "50px" : "100px" : '0px',
      }}
    >
      <Box
        className="slider-wrapper"
        sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}
      >
        {loading ? (
          Array.from(new Array(1)).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={showSmallShimmer ? 200 : 300}
              animation="wave"
              sx={{
                width: "100%",
                borderRadius: 2,
                mt: { xs: 0, md: 1 },
                mb: { xs: 2, md: 3 },
              }}
            />
          ))
        ) : (
          <Slider {...settings}>
            {activeBanners.map((item) => {
              const imageUrl = `${endPoints.imageCDN}${item?.banner_url}`;
              return (
                <Box
                  key={item?.id}
                  sx={{
                    mt: { xs: 0, md: 1 },
                    mb: { xs: 2, md: 3 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt="promotion-banner"
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      cursor: "default",
                    }}
                  />
                </Box>
              );
            })}
          </Slider>
        )}
      </Box>
    </div>
  );
};

export default Promotions;

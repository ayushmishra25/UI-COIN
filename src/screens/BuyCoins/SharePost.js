import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import img01 from "../../images/today-coins.webp";
import img02 from "../../images/tomorrow-coins.webp";
import img03 from "../../images/next-coins.webp";
import img2 from "../../images/gold-coin.svg";
import img3 from "../../images/sega-coin.svg";
import { addData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { useSnackbarContext } from "../../component/SnackbarContext";
import TodayClaimImg from "../../images/TodayClaim.png";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SharePost = (props) => {
  const { openDailyRewards, closeRewardModal, selectedPost } = props;
  const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarContext();
  const { t } = useTranslation();


  const [creative, setCreative] = useState("");
  const [showcreative, setShowCreative] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState("")


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCreative(file);
      setShowCreative(imageUrl);
      UploadImage(file);
    }
  };

  const UploadImage = (files) => {
    var formdata = new FormData();
    formdata.append("file", files);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    setIsLoading(true);
    const UPLOAD_BANNER = "upload/bannerimage";
    let imgUrl = `${endPoints.apiBaseUrl}${UPLOAD_BANNER}`;
    fetch(imgUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCreative(result.data);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  const submit = async () => {
    //  showSuccessSnackbar("Thank you, we will review you information");
    const data = {
      id_user: IsLoginData?.idUser || null,
      post_image: creative,
      post_url: imageURL,
      post_date:""
    };

    setLoading(true);
    const url = `${endPoints.api.POST_SOCIAL_URL}`;
    const response = await addData(url, data);
    console.log('response',response)
    setLoading(false);
    if (response.data.status == "success") {
      closeRewardModal(true);
      showSuccessSnackbar(t("sharePostModal.successMessage"));
    } else {
      showErrorSnackbar(response?.data?.message || t("sharePostModal.errorMessage"));
    }
  };


  function convertTextToLinks1(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    return text.split(urlRegex).map((part, index) => 
      urlRegex.test(part) ? (
        <a 
          key={index} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: "#7070ff", textDecoration: "underline",cursor:'pointer',
          display: "inline", // Ensures it aligns properly within text
          verticalAlign: "middle", // Fixes misalignment in text
          lineHeight: "inherit", // Matches the surrounding text's line height
        }}
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  }


  function convertTextToLinks(text) {
    const urlRegex = /(https?:\/\/[^\s,]+)/g; // Exclude trailing commas
  
    return text?.split(urlRegex)?.map((part, index) =>
      urlRegex.test(part) ? (
        <Link
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#7070ff",
            textDecoration: "underline",
            cursor: "pointer",
            "&:hover": {
              color: "#5050dd",
              textDecoration: "none",
            },
          }}
        >
          {part.replace(/,$/, "")} {/* Remove trailing comma */}
        </Link>
      ) : (
        part
      )
    );
  }
  
  

  const text = t("sharePostModal.description", "Post about SpinSaga Casino on https://www.trustpilot.com/review/spinsagacasino.com, put post URL below and update screenshot of post to get 2 Real Cash!");

  return (
    <>
      <BootstrapDialog
        onClose={closeRewardModal}
        aria-labelledby="customized-dialog-title"
        open={openDailyRewards}
        className="first_modal"

      >
        <IconButton
          aria-label="close"
          onClick={closeRewardModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            background: theme.palette.custom.black2_light2,
            color: theme.palette.custom.white_gray,
          }}
        >
          <DialogTitle id="customized-dialog-title">
            {selectedPost?.name}
          </DialogTitle>
          <Typography variant="h1" component="h5">
            {/* {selectedPost?.description} */}
       {convertTextToLinks(selectedPost?.description)}
          </Typography>

          <Grid
            container
            spacing={{ xs: 4, sm: 3, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            {loading && <Loader loading={loading} />}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("sharePostModal.postURLLabel")}
                variant="outlined"
                value={imageURL}
                onChange={(e)=>{
                  setImageURL(e.target.value)
                }}
                sx={{
                  marginTop: 4,
                }}
              />

              {/* File Upload */}
              <div style={{marginTop:'10px'}}>
                <Typography variant="body1" gutterBottom>
                  {t("sharePostModal.uploadScreenshot")}
                </Typography>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadFileIcon />}
                    color="primary"
                  >
                    {t("sharePostModal.chooseFile")}
                  </Button>
                </label>
              </div>

              {/* URL Input Field */}

              {/* Image Preview */}
              {showcreative && (
                <div style={{ marginTop: 20 }}>
                  <Typography variant="subtitle1">{t("sharePostModal.preview")}</Typography>
                  <img
                    src={showcreative}
                    alt="Selected Preview"
                    style={{
                      maxWidth: "150px",
                      marginTop: 10,
                      borderRadius: 8,
                    }}
                  />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={{ xs: 4, sm: 3, md: 4 }}
            style={{ justifyContent: "center" }}
          >
            <Grid item xs={12}>
              <Button
                className="full_btn"
                size="medium"
                sx={{
                  background: theme.palette.custom.pink_bg,
                  color: theme.palette.custom.white_gray,
                  marginTop: 3,
                }}
                disabled={creative && imageURL ? false : true }
                onClick={() => {
                  submit();
                }}
              >
                {t("sharePostModal.submit")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default SharePost;

import React from "react";
import "./style.css";
import locationicon from "../../images/location-off.png";
import { useSelector } from "react-redux";

const FailedGeocheck = () => {
  const authState = useSelector((state) => state.auth);
  const { isVpn, isUserInAllowedRegion } = authState;

  return (
    <div>
      <div className="verification-box">
        <div className="inner-geodiv" style={{ backgroundColor: "#ed1c51" }}>
          <img className="locationicon" src={locationicon}></img>
          <span className="main-para">
            <span className="big-heading">
              {isVpn
                ? "VPN WARNING"
                : isUserInAllowedRegion
                ? "LOCATION WARNING"
                : ""}
            </span>

            <br />
            <span className="small-heading">
              {isVpn
                ? "To proceed, disable the proxy service on your device. Once you have resolved this error, please try login again."
                : isUserInAllowedRegion
                ? "It appears that you are currently located outside of our permitted gaming area. Unfortunately, this means you are unable to access our games at this time."
                : ""}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FailedGeocheck;

// import React from "react";
// import "./style.css";
// import locationicon from "../../images/location-off.png";
// import { useSelector } from "react-redux";
// const FailedGeocheck = () => {
//   const globalState = useSelector((state) => state.global);
//   const { geoError } = globalState;
//   console.log("geoError", globalState);
//   // console.log("geoError", globalState);
//   return (
//     <div>
//       <div className="verification-box">
//         <div className="inner-geodiv" style={{ backgroundColor: "#ed1c51" }}>
//           <img className="locationicon" src={locationicon}></img>
//           <span className="main-para">
//             <span className="big-heading">
//               {geoError?.type
//                 ? geoError?.type == "boundary"
//                   ? "LOCATION WARNING!"
//                   : geoError?.type == "proxy"
//                   ? "VPN WARNING"
//                   : geoError?.type == "jailbreak_detection"
//                   ? "DEVICE WARNING"
//                   : `${geoError?.type?.toUpperCase()} WARNING`
//                 : "LOCATION WARNING!"}
//             </span>
//             <br />
//             {/* <span className='big-heading'>Location Warning!</span><br/> */}
//             <span className="small-heading">
//               {geoError?.message
//                 ? `${geoError?.message} Once you have resolved this error, please try login again.`
//                 : "To access SpinSaga Casino you need to enable access to location services on your device. Please enable these on your device or browser then try login again."}
//             </span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default FailedGeocheck;

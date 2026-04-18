import React from "react";
import { useTranslation } from "react-i18next";
import { FormControl, Select, MenuItem, Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
    const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const rawLang = IsLoginData?.language || i18n.language || "en";
  const [language, setLanguage] = React.useState(
    ["en", "es", "pt", "it"].includes(rawLang) ? rawLang : rawLang.split("-")[0] || "en"
  );

  const dispatch = useDispatch();
  // console.log("IsLoginData", IsLoginData);

  // Sync language when user's saved language preference is loaded
  React.useEffect(() => {
    if (IsLoginData?.language && IsLoginData.language !== language) {
      setLanguage(IsLoginData.language);
      i18n.changeLanguage(IsLoginData.language);
      localStorage.setItem("language", IsLoginData.language);
    }
  }, [IsLoginData?.language]);

  const GetUserById = async () => {
    try {
      if (IsLoginData?.idUser) {
        const url = `${endPoints.api.GET_BY_USERID}/${IsLoginData?.idUser}`;
        const response = await getAllData(url);
        dispatch(setLoginData({ user: response.data, isAuthenticated: true }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageChange = async (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    // Optionally store in localStorage for persistence
    localStorage.setItem("language", selectedLanguage);

    // Update language preference on backend if user is logged in
    if (IsLoginData?.idUser) {
      try {
        let result = await updateUser(endPoints.api.UPDATE_LANGUAGE, {
          language: selectedLanguage,
          idUser: IsLoginData.idUser,
        });
        console.log("result", result);
        // Fetch updated profile info from server
        if (result?.status == "success") {
          await GetUserById();
        }
      } catch (error) {
        console.error("Failed to update language preference:", error);
      }
    }
  };

  const selectedLang =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <Box>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <Select
          value={language}
          onChange={handleLanguageChange}
          displayEmpty
          renderValue={() => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span style={{ fontSize: "1.2rem" }}>{selectedLang.flag}</span>
              <Typography variant="body2">{selectedLang.name}</Typography>
            </Box>
          )}
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ fontSize: "1.2rem" }}>{lang.flag}</span>
                <Typography>{lang.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;

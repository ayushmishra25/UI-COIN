import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getAllData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { useTheme } from "@mui/material/styles";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
];

const CurrencySwitcher = () => {
  const theme = useTheme();
  const IsLoginData = useSelector((state) => state.auth.IsLoginData);
  const [currency, setCurrency] = React.useState(
    IsLoginData?.currency || "USD",
  );
  const dispatch = useDispatch();

  // Sync currency when user's saved currency preference is loaded
  React.useEffect(() => {
    if (IsLoginData?.currency && IsLoginData.currency !== currency) {
      setCurrency(IsLoginData.currency);
      localStorage.setItem("currency", IsLoginData.currency);
    }
  }, [IsLoginData?.currency]);

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

  const handleCurrencyChange = async (event) => {
    const selectedCurrency = event.target.value;
    setCurrency(selectedCurrency);
    // Store in localStorage for persistence
    localStorage.setItem("currency", selectedCurrency);

    // Update currency preference on backend if user is logged in
    if (IsLoginData?.idUser) {
      try {
        let result = await updateUser(endPoints.api.UPDATE_CURRENCY, {
          currency: selectedCurrency,
          idUser: IsLoginData.idUser,
        });
        console.log("result", result);
        // Fetch updated profile info from server
        if (result?.status === "success") {
          await GetUserById();
        }
      } catch (error) {
        console.error("Failed to update currency preference:", error);
      }
    }
  };

  const selectedCurrency =
    currencies.find((c) => c.code === currency) || currencies[0];

  return (
    <Card
      className="profile_card"
      style={{ marginBottom: 24, marginTop: 30 }}
      sx={{
        backgroundColor: theme.palette.custom.blue_bg,
      }}
    >
      <CardContent>
        <Typography variant="h4" align="left" gutterBottom>
          Select Currency
        </Typography>
        <Typography className="form_p" variant="subtitle2" sx={{ mb: 2 }}>
          Choose your preferred currency for displaying prices
        </Typography>

        <FormControl fullWidth size="small">
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            displayEmpty
            renderValue={() => (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ fontSize: "1.2rem" }}>
                  {selectedCurrency.symbol}
                </span>
                <Typography variant="body2">
                  {selectedCurrency.code} - {selectedCurrency.name}
                </Typography>
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
            {currencies.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span style={{ fontSize: "1.2rem" }}>{c.symbol}</span>
                  <Typography>
                    {c.code} - {c.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default CurrencySwitcher;

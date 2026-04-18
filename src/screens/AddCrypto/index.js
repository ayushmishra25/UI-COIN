import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Grid,
  Button,
  Box,
  Container,
  Typography,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@mui/material";
import { addBetData, getAllBetData } from "../../Utility/API";
import { PaymentEndpoints } from "../../constant/Environment";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useTheme } from "@emotion/react";
import { CurrencyList } from "../BuyCoins/CurrencyList";
import { useTranslation } from "react-i18next";

const validationSchema = (t) =>
  Yup.object({
    address: Yup.string().required(t("addCrypto.addressRequired")),
    currency: Yup.string().required(t("addCrypto.currencyRequired")),
  });

const AddCrypto = () => {
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const theme = useTheme();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;
  const { t } = useTranslation();
  const [crytpoValue, setCryptoValue] = useState([]);

  const formik = useFormik({
    initialValues: {
      address: "",
      currency: "",
    },
    validationSchema: validationSchema(t),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = async (data) => {
    let payload = {
      id_user: IsLoginData?.idUser,
      address: data.address,
      currency: data.currency,
    };

    try {
      dispatch(setLoading(true));
      let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.ADD_CRYPTO}`;
      const response = await addBetData(url, payload);

      if (response.data.status === "success") {
        showSuccessSnackbar(response.data.message);
        formik.resetForm();
        getcrytpoValues();
      }
    } catch (error) {
      console.error("Error submitting:", error);
      showErrorSnackbar(t("addCrypto.submitError"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getcrytpoValues();
  }, [IsLoginData]);

  const getcrytpoValues = async () => {
    try {
      if (IsLoginData?.idUser) {
        let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.GET_CRYPTO_BY_USER}/${IsLoginData?.idUser}`;
        const response = await getAllBetData(url);
        console.log("response", response);
        if (response?.length > 0) {
          setCryptoValue(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" mt={4} mb={2}>
            {t("addCrypto.heading")}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label={t("addCrypto.currencyLabel")}
                  name="currency"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.currency && Boolean(formik.errors.currency)
                  }
                  helperText={formik.touched.currency && formik.errors.currency}
                >
                  {CurrencyList?.map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          src={option.icon || option.icon_png}
                          alt={option.symbol}
                          sx={{ width: 28, height: 28 }}
                        />
                        <Typography variant="body1">{option?.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t("addCrypto.addressLabel")}
                  name="address"
                  // type="password"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                sx={{
                  backgroundColor: theme.palette.custom.greenbtn,
                  color: theme.palette.custom.white,
                  textTransform: "capitalize",
                }}
                fullWidth
                variant="contained"
                type="submit"
              >
                {t("addCrypto.submit")}
              </Button>
            </Box>
          </form>
        </Grid>

        {/* {crytpoValue.length >= 0 && ( */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mt={4} mb={2}>
            {t("addCrypto.addedCryptos")}
          </Typography>
          <TableContainer
            component={Box}
            sx={{ border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>{t("addCrypto.cryptoAddressHeader")}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{t("addCrypto.currencyHeader")}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {crytpoValue.length > 0 &&
                  crytpoValue.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "16px" }}>
                        {/* {item?.address} */}
                        {item?.address
                          ? item?.address?.slice(0, 4) +
                            "*".repeat(item?.address?.length - 4)
                          : ""}
                      </TableCell>
                      <TableCell sx={{ fontSize: "18px" }}>
                        {item?.currency}
                      </TableCell>
                    </TableRow>
                  ))}

                {crytpoValue.length == 0 && (
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>
                      {t("addCrypto.noCryptoAdded")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* )} */}
      </Grid>
    </Container>
  );
};

export default AddCrypto;

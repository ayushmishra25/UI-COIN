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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { addBetData, addData, getAllBetData } from "../../Utility/API";
import { endPoints, PaymentEndpoints } from "../../constant/Environment";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbarContext } from "../../component/SnackbarContext";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";
import { useTheme } from "@emotion/react";

const monthOptions = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const yearOptions = Array.from({ length: 20 }, (_, i) => {
  const year = new Date().getFullYear() + i;
  return { value: year.toString(), label: year.toString() };
});

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .required("Required")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits")
    .test("is-valid-card", "Invalid card number", (value) => {
      if (!value) return false;
      const digits = value.replace(/\s+/g, "");
      let sum = 0;
      let shouldDouble = false;
      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits.charAt(i));
        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
      }
      return sum % 10 === 0;
    }),
  cardExpiryMonth: Yup.string().required("Required"),
  cardExpiryYear: Yup.string().required("Required"),
});

const info = {
  billingDetailsId: "536b4bfd-5b39-44f2-ad02-6e4222b6ad42",
  usage: "MULTI_USE",
  paymentHandleToken: "Cv1KNXcR5i6BsYA",
  customerId: "62c92644-e3a1-4b60-a54f-aa19a29e7026",
  action: "NONE",
  merchantRefNum: "spinsaga_3674_29df19d4",
  id: "d9a20494-1951-4b71-8466-808e44266f6f",
  card: {
    holderName: "Shekhar asdasd",
    cardExpiry: {
      month: "05",
      year: "2039",
    },
    cardBin: "472409",
    issuingCountry: "CA",
    cardType: "VI",
    lastDigits: "0008",
    cardCategory: "DEBIT",
  },
  status: "PAYABLE",
  paymentType: "CARD",
};
const AddCard = () => {
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbarContext();
  const theme = useTheme();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { IsLoginData } = authState;

  const [cardInfo, setCardInfo] = useState([]);

  //   console.log("IsLoginData", IsLoginData);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .substring(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submitCard(values);
    },
  });

  useEffect(() => {
    getAddedCardInfo();
  }, [IsLoginData]);

  const getAddedCardInfo = async () => {
    try {
      if (IsLoginData?.idUser) {
        let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.CARD_INFO_BY_ID}/${IsLoginData?.idUser}`;
        const response = await getAllBetData(url);
        console.log("response", response);
        if (response?.status === "success") {
          setCardInfo(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitCard = async (data) => {
    const {
      idUser,
      name,
      surname,
      birthDate,
      email,
      country,
      town,
      stateCode,
      stateName,
      zipCode,
      address,
    } = IsLoginData;
    let payload = {
      cardNum: data.cardNumber.replace(/\s+/g, ""),
      cardExpiryMonth: data.cardExpiryMonth,
      cardExpiryYear: data.cardExpiryYear,
      id_user: idUser,
      firstName: name,
      surname: surname,
      birthDate: birthDate,
      email: email,
      country: country,
      city: town,
      state: stateCode,
      zipCode: zipCode,
      address: address,
    };

    try {
      dispatch(setLoading(true));
      let url = `${PaymentEndpoints.apiBaseUrl}${PaymentEndpoints.api.CREATE_CUSTOMER}`;
      const response = await addBetData(url, payload);

      if (response.data.status == "success") {
           showSuccessSnackbar(response.data.message);
            formik.resetForm();
        getAddedCardInfo();
      }
    } catch (error) {
      console.error("Error submitting card:", error);
      showErrorSnackbar("Failed to submit card. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" mt={4} mb={2}>
            Add Debit Card
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  type="text"
                  value={formik.values.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    formik.setFieldValue("cardNumber", formatted);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardNumber &&
                    Boolean(formik.errors.cardNumber)
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Card Expiry Month"
                  name="cardExpiryMonth"
                  value={formik.values.cardExpiryMonth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardExpiryMonth &&
                    Boolean(formik.errors.cardExpiryMonth)
                  }
                  helperText={
                    formik.touched.cardExpiryMonth &&
                    formik.errors.cardExpiryMonth
                  }
                >
                  {monthOptions.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Card Expiry Year"
                  name="cardExpiryYear"
                  value={formik.values.cardExpiryYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cardExpiryYear &&
                    Boolean(formik.errors.cardExpiryYear)
                  }
                  helperText={
                    formik.touched.cardExpiryYear &&
                    formik.errors.cardExpiryYear
                  }
                >
                  {yearOptions.map((year) => (
                    <MenuItem key={year.value} value={year.value}>
                      {year.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                Submit
              </Button>
            </Box>
          </form>
        </Grid>
        {cardInfo.length > 0 && (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" mt={4} mb={2}>
              Saved Cards
            </Typography>
            <TableContainer component={Box} sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Card Number</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Expiry</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cardInfo.map((card, index) => (
                    <TableRow key={index}>
                      <TableCell>**** **** **** {card.last4}</TableCell>
                      <TableCell>{card.expiryMonth}/{card.expiryYear}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}


      </Grid>
    </Container>
  );
};

export default AddCard;

import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useState } from "react";

function ToasterMessage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [currentVariant, setCurrentVariant] = useState(null);

  const action = (key) => (
    <CloseIcon
      onClick={() => {
        closeSnackbar(key);
        setCurrentVariant(null);
      }}
    />
  );

  const showSnackbar = (message, variant) => {
    if (currentVariant === variant) return; // Don't show if same variant is already open

    enqueueSnackbar(message, {
      variant,
      action,
    });
    setCurrentVariant(variant);
  };

  const showDefaultSnackbar = (message) => {
    showSnackbar(message, "default");
  };

  const showSuccessSnackbar = (message) => {
    showSnackbar(message, "success");
  };

  const showErrorSnackbar = (message) => {
    showSnackbar(message, "error");
  };

  const showWarningSnackbar = (message) => {
    showSnackbar(message, "warning");
  };

  const showInfoSnackbar = (message) => {
    showSnackbar(message, "info");
  };

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          showDefaultSnackbar("I love snacks deafult");
        }}
      >
        Show snackbar
      </Button>
      <Button
        onClick={() => {
          showSuccessSnackbar("This is a success message!");
        }}
      >
        Show success snackbar
      </Button>
      <Button
        onClick={() => {
          showErrorSnackbar("This is an error message!");
        }}
      >
        Show error snackbar
      </Button>
      <Button
        onClick={() => {
          showWarningSnackbar("This is a warning message!");
        }}
      >
        Show warning snackbar
      </Button>
      <Button
        onClick={() => {
          showInfoSnackbar("This is an info message!");
        }}
      >
        Show info snackbar
      </Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}  anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <ToasterMessage />
    </SnackbarProvider>
  );
}

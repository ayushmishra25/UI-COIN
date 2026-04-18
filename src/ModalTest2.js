import * as React from 'react';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import logo from "../src/images/logo.png";
import img2 from "../src/images/gold-coin.svg";
import img3 from "../src/images/sega-coin.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function ModalTest2() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme(); // Ensure useTheme is properly used here

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Demo 2
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className="first_modal"

            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
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
                    }}>
                    <DialogTitle
                    className='modal_hedingimg'
                    id="customized-dialog-title">
                      Welcome to <img
              className="header-logo"
              src={logo}
              alt="logo"

            />
                    </DialogTitle>


                    <Grid container
                        spacing={{ xs: 4, sm: 3, md: 4 }}
                        style={{ justifyContent: 'center' }}
                    >

                        <Grid
                            item
                            xs={12}

                        >
                            <div className='card_upar'>
                                <Typography variant="h1" component="h3">
                                    CONGRATULATIONS! You've got
                                </Typography>
                                <Typography variant="h1" component="h4">

                                    <Typography
                                            sx={{

                                                color: theme.palette.custom.red_light,
                                            }}
                                            variant="p" component="span">
                                           7,500 Bonus Cash&nbsp;
                                        </Typography>
                                        &
                                    <br/>
                                    <Typography
                                            sx={{

                                                color: theme.palette.custom.green_green,
                                            }}
                                            variant="p" component="span">
                                            2.50 Sweepstakes Coins&nbsp;
                                        </Typography>
                                   for FREE!
                                </Typography>
                                <Typography variant="h1" component="h5">
                                You can enjoy our Social Casino games with Bonus Cash and enter our promotional Sweepstakes with Sweepstakes Coins
                                </Typography>
                            </div>


                        </Grid>
                    </Grid>
                    <Grid container
                        spacing={{ xs: 4, sm: 3, md: 4 }}
                        style={{ justifyContent: 'center' }}
                        className='space_t'
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <div className='modal_img_info'>
                                <div className="info_card">
                                    <img src={img2} alt="logo" className="sidebar-coin" />
                                    <Typography variant="p" component="h3">
                                        Play with&nbsp;
                                        <Typography
                                            sx={{

                                                color: theme.palette.custom.green_green,
                                            }}
                                            variant="p" component="span">
                                            SC <br /> Sweepstakes Coins <br />
                                        </Typography>
                                        for real Cash Prizes
                                    </Typography>


                                </div>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <div className='modal_img_info border-left'
                             sx={{
                                border: theme.palette.custom.gray_border,
                            }}
                            >
                                <div className="info_card">
                                    <img src={img3} alt="logo" className="sidebar-coin" />
                                    <Typography variant="p" component="h3">
                                        Play with&nbsp;
                                        <Typography
                                            sx={{

                                                color: theme.palette.custom.red_light,
                                            }}
                                            variant="p" component="span">
                                            GC <br /> Bonus Cash <br />
                                        </Typography>
                                        for fun
                                    </Typography>

                                </div>
                            </div>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                        >
                            <form>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="" />
                                    <label class="form-check-label" for="">I agree with the Sweepstakes Rules, Terms of Service & Privacy Policy. </label>
                                </div>


                            </form>
                            <Button
                                className='full_btn'
                                size="medium"
                                sx={{
                                    background: theme.palette.custom.pink_bg,
                                    color: theme.palette.custom.white_gray,
                                }}
                            >

                                Start Playing
                            </Button>

                        </Grid>

                        <Typography variant="h1" component="h6">
                            No purchase necessary. Terms of Service apply. It's always free to enter our Sweepstakes.
                        </Typography>



                    </Grid>

                </DialogContent>

            </BootstrapDialog>
        </>
    );
}

export default ModalTest2;

import React from "react";
import { Grid, Typography, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Faq = () => {
  const loginData = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
    <Grid container spacing={3} style={{ padding:40,marginTop:70 }}>
      {/* First Row: General FAQs */}
      <Grid xs={12}>
        <Typography variant="h4" sx={{marginBottom:3}}>General FAQs</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h5">General</Typography>
      </Grid>

      {/* Third Row: FAQ Content */}
      <Grid xs={12}>
        <Container>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How do I create an account?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Getting started is easy! Just click on the [BUTTON
              TEXT/LOGIN/REGISTER] and follow the simple steps to create your
              account.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How do I update my details?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Access your profile settings to easily update your personal
              information. It's just a few clicks away!
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How can I contact customer support?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              You can contact our customer support team via email or live chat.
              We are available 24/7 to assist you with any questions or
              concerns.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              Is it safe to play at Spin Saga Casino?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Yes, Spin Saga Casino is committed to providing a safe and secure
              gaming environment. We use state-of-the-art encryption technology
              to protect your personal and financial information.
            </Typography>
          </Box>
        </Container>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h5">Coins</Typography>
      </Grid>

      <Grid xs={12}>
        <Container>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              What are Real Cash?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Real Cash are our in-game currency. Use them to play our exciting
              games and enjoy the real casino experience.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How do I get Real Cash?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Purchase Real Cash packages or keep an eye out for promotions and
              bonuses across our website, newsletters and social media.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How do I use Real Cash?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Spend your Real Cash to play various social casino games and
              unlock exciting features.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              Can I win real money with Real Cash?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Real Cash are for entertainment purposes only and cannot be
              exchanged for cash prizes.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              Can I play on my mobile device?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Yes, Spin Saga Casino is fully optimized for mobile gaming. Enjoy
              your favorite games on the go!
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              Are there any age restrictions for playing on Spin Saga Casino?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              You must be 21 years or older to play on Spin Saga Casino.
            </Typography>
          </Box>
        </Container>
      </Grid>

      <Grid xs={12}>
        <Typography variant="h5">Banking</Typography>
      </Grid>

      <Grid xs={12}>
        <Container>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              What payment methods do you accept?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              We accept multiple secure payment methods, including credit cards,
              debit cards, e-wallets, and bank transfers.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How long does it take for my deposit to process?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Deposit processing times vary depending on the payment method you
              choose. Generally, credit card and debit card deposits are
              processed instantly, while e-wallet and bank transfers may take a
              few minutes.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How do I withdraw my winnings?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              To withdraw your winnings, visit the "Withdraw" section of your
              account and select your preferred method. Withdrawal times may
              vary depending on the method chosen.
            </Typography>
          </Box>
        </Container>
      </Grid>

      <Grid xs={12}>
        <Typography variant="h5">Games</Typography>
      </Grid>

      <Grid xs={12}>
        <Container>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              What types of games do you offer?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              We offer a wide variety of games, including slots, table games,
              video poker, and live dealer games.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              Can I play games for free?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Yes, we offer a demo mode where you can try our games for free
              without risking any real money.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How do I find my favorite games?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              You can use our search bar or browse through our game categories
              to find your favorite games.
            </Typography>
          </Box>
        </Container>
      </Grid>

      <Grid xs={12}>
        <Typography variant="h5">Technical</Typography>
      </Grid>

      <Grid xs={12}>
        <Container>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
               What devices are compatible with Spin Saga Casino?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Spin Saga Casino is compatible with desktop computers, laptops,
              tablets, and smartphones.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              How do I update my browser for optimal performance?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              To ensure the best gaming experience, please make sure your
              browser is up-to-date.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
            >
              <Box component="span" sx={{ mr: 1 }}>
                •
              </Box>
              I'm experiencing technical difficulties. What should I do?
            </Typography>
            <Typography variant="body2" sx={{ ml: 3 }}>
              Please contact our customer support team for assistance. We'll do
              our best to resolve any issues you're facing.
            </Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
    </>
  );
};

export default Faq;

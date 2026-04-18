import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Button, Typography, Stack } from '@mui/material';

/**
 * Example component demonstrating how to use i18next in your React components
 * Copy patterns from this file to other components in your app
 */

const I18nExample = () => {
  const { t, i18n } = useTranslation();
  const [coins, setCoin] = useState(10);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {t('common.selectLanguage')}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant={i18n.language === 'en' ? 'contained' : 'outlined'}
              onClick={() => changeLanguage('en')}
              sx={{ color: 'white' }}
            >
              English
            </Button>
            <Button
              variant={i18n.language === 'es' ? 'contained' : 'outlined'}
              onClick={() => changeLanguage('es')}
              sx={{ color: 'white' }}
            >
              Español
            </Button>
            <Button
              variant={i18n.language === 'pt' ? 'contained' : 'outlined'}
              onClick={() => changeLanguage('pt')}
              sx={{ color: 'white' }}
            >
              Português
            </Button>
            <Button
              variant={i18n.language === 'it' ? 'contained' : 'outlined'}
              onClick={() => changeLanguage('it')}
              sx={{ color: 'white' }}
            >
              Italiano
            </Button>
          </Stack>
          <Typography sx={{ mt: 2, color: '#999' }}>
            {t('common.language')}: {i18n.language.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>

      {/* Navigation Example */}
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('common.info')} - {t('navigation')}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
            <Typography>{t('navigation.home')}</Typography>
            <Typography>•</Typography>
            <Typography>{t('navigation.profile')}</Typography>
            <Typography>•</Typography>
            <Typography>{t('navigation.games')}</Typography>
            <Typography>•</Typography>
            <Typography>{t('navigation.wallet')}</Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Games Example */}
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('games.play')} {t('games.allGames')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="success">
              {t('games.play')}
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
              {t('games.joinGame')}
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
              {t('games.favorites')}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Messages Example */}
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('messages')}
          </Typography>
          <Typography sx={{ color: '#4caf50', mb: 1 }}>
            ✓ {t('messages.loginSuccess')}
          </Typography>
          <Typography sx={{ color: '#ff9800', mb: 1 }}>
            ⚠ {t('messages.warning')}
          </Typography>
          <Typography sx={{ color: '#f44336' }}>
            ✕ {t('messages.loginFailed')}
          </Typography>
        </CardContent>
      </Card>

      {/* Profile Example */}
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('profile.myProfile')}
          </Typography>
          <Stack spacing={1}>
            <Typography>{t('profile.firstName')}: John</Typography>
            <Typography>{t('profile.lastName')}: Doe</Typography>
            <Typography>{t('profile.email')}: john@example.com</Typography>
            <Typography>{t('profile.country')}: USA</Typography>
          </Stack>
          <Button variant="contained" sx={{ mt: 2 }}>
            {t('profile.editProfile')}
          </Button>
        </CardContent>
      </Card>

      {/* Wallet Example */}
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('wallet.wallet')}
          </Typography>
          <Typography variant="h4" sx={{ color: '#ffd700', my: 2 }}>
            {t('wallet.balance')}: ${coins}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success">
              {t('wallet.deposit')}
            </Button>
            <Button variant="contained" color="error">
              {t('wallet.withdraw')}
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
              {t('wallet.transfer')}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Auth Example */}
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('auth.login')}
          </Typography>
          <Stack spacing={2}>
            <Typography>{t('auth.email')}: user@example.com</Typography>
            <Typography>{t('auth.password')}: ••••••••</Typography>
            <Typography sx={{ color: '#2196F3', cursor: 'pointer' }}>
              {t('auth.forgotPassword')}
            </Typography>
            <Button variant="contained">{t('auth.signIn')}</Button>
            <Typography>
              {t('auth.dontHaveAccount')} {t('auth.signUp')}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Promotions Example */}
      <Card sx={{ mb: 3, bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('promotions.promotions')}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {t('promotions.monthlyPromotions')} - {t('promotions.specialOffers')}
          </Typography>
          <Box sx={{ p: 2, bgcolor: '#16213e', borderRadius: 1, mb: 2 }}>
            <Typography sx={{ color: '#ffd700', fontWeight: 'bold' }}>
              {t('promotions.bonusCode')}: CASINO50
            </Typography>
            <Typography sx={{ color: '#aaa', fontSize: '0.9em' }}>
              {t('promotions.expiresOn')}: Dec 31, 2024
            </Typography>
          </Box>
          <Button variant="contained" color="warning" fullWidth>
            {t('promotions.claimBonus')}
          </Button>
        </CardContent>
      </Card>

      {/* Footer Example */}
      <Card sx={{ bgcolor: '#1a1a2e', color: 'white' }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <Typography sx={{ cursor: 'pointer', color: '#2196F3' }}>
              {t('footer.aboutUs')}
            </Typography>
            <Typography>•</Typography>
            <Typography sx={{ cursor: 'pointer', color: '#2196F3' }}>
              {t('footer.privacyPolicy')}
            </Typography>
            <Typography>•</Typography>
            <Typography sx={{ cursor: 'pointer', color: '#2196F3' }}>
              {t('footer.termsConditions')}
            </Typography>
            <Typography>•</Typography>
            <Typography sx={{ cursor: 'pointer', color: '#2196F3' }}>
              {t('footer.contactUs')}
            </Typography>
          </Stack>
          <Typography sx={{ textAlign: 'center', mt: 2, color: '#666' }}>
            © 2024 Casino Coin. {t('footer.copyright')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default I18nExample;

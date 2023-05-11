import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { VDataTableServer } from 'vuetify/labs/components';
import 'vuetify/styles';

export default createVuetify({
  components: {
    VDataTableServer,
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#B3E5FC',
          error: '#FF4D4D',
          warning: '#FFC70E',
          info: '#4781CC',
          success: '#47B267',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

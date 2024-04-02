/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      /*Dessa ska vara överallt:*/
      light_bg: '#FFFFFF',
      light_menu: '#F5F5F5',
      light_topgradient: '#E0E0E0',
      light_bottomgradient: '#F0F0F0',
      light_primary_text: '#000000',
      light_primary_text_hover: '#666666',
      light_secondary_text: '#757575',
      light_action_button: '#007bff',
      action_button_hover:'#4d8fff',
      light_card: '#F5F5F5',
      light_outer_card: '#F0F0F0',
      light_footer: '#CCCCCC',

      dark_bg: '#121212',
      dark_card: '#212121',
      dark_outer_card: '#2C2C2C',
      dark_menu: '#181818',
      dark_topgradient: '#404040',
      dark_bottomgradient: '#282828',
      dark_primary_text: '#FFFFFF',
      dark_primary_text_hover: '#999999',
      dark_secondary_text: '#B3B3B3',
      dark_action_button: '#007bff',
      dark_gradient_top: '#404040',
      dark_gradient_bottom: '#121212',
      dark_footer:'#757575',

      prio_highest: '#ef1313',
      prio_high:'#ffa62e',
      prio_medium:'#66564f',
      prio_low:'#312d2b',

      progress_low: '#e64747',
      progress_mid: '#e6e22e',
      progress_high: '#8fb935',

      /*Best colors here! :D */
      //test: hsl(210,20%,98%)
      background:'#ffffff',
      foreground:'#09090b',
      card:'	#ffffff',
      card_foreground:'	#09090b',
      primary: '#16a34a',
      primary_foreground:'#fff1f2',
      secondary:'#f4f4f5',
      secondary_foreground:'#18181b',
      muted: '#f4f4f5',
      accent:'#f4f4f5',
      accent_foreground:'#18181b',
      input:'#e4e4e7',
      ring:'#16a34a',
      border_color:'#e4e4e7',
      
      dark_background:'#0c0a09',
      dark_foreground:'#f2f2f2',
      dark_card:'#1c1917',
      dark_card_foreground:'#f2f2f2',
      dark_primary: '#22c55e',
      dark_primary_foreground:'#052e16',
      dark_secondary:'	#27272a',
      dark_secondary_foreground:'',
      dark_muted: '#fafafa',
      dark_accent:'#292524',
      dark_accent_foreground:'#fafafa',
      dark_input:'#27272a',
      dark_ring:'#15803d',
      dark_border:'#27272a'
     
    },

    extend: {},
  },
  plugins: [],
}

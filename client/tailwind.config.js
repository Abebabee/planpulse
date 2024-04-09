/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      prio_highest: '#ef1313',
      prio_high:'#ffa62e',
      prio_medium:'#66564f',
      prio_low:'#312d2b',

      progress_low: '#e64747',
      progress_mid: '#e6e22e',
      progress_high: '#8fb935',

      tag_bug: '#FF0000',
      tag_feat: '#00FF00',
      tag_ui: '#ADD8E6',
      tag_test: '#FFFF00',
      tag_other: '#C0C0C0',

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

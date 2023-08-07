/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#213D77',
				primaryHover: '#2d5099',
				primaryDisabled: '#2d5099BF',
				secondary: '#9EA3AE',
				secondarySoftTrans: '#00092980',
				cadetBlue: '#A0AEC0',
				bgSoft: '#F3F7FF',
				link: '#1E86FF',
				softBlue: '#6192F8',
				borderPrimary: '#E5E5E5',
				bgNegative: '#FF0000',
				bgWarningBadge: '#FDF6B2',
				textWarningBadge: '#705700',
			},
			container: {
				center: true,
				padding: '2rem',
				screens: {
					sm: '100%',
					md: '100%',
					lg: '1120px',
					xl: '1280px',
					'2xl': '1366px',
					'3xl': '1440px',
				},
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			keyframes: {
				ticker: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
		},
	},
	plugins: [],
};

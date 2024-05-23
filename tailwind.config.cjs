/* @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{html,vue,js}', './src/*.{html,vue,js}'],
    theme: {
        extend: {
            maxWidth: {
                screen: '100vw'
            },
            borderWidth: {
                3: '3px',
                5: '5px'
            },
            colors: {
                'primary-color': 'var(--primary-color)',
                'secondary-color': 'var(--secondary-color)',
                'third-color': 'var(--third-color)',
                'fourth-color': 'var(--fourth-color)',
                'accent-color': 'var(--accent-color)',
                'disabled-color': 'var(--disabled-color)',
                'primary-background': 'var(--primary-background)',
                'login-background': 'var(--login-background)',
                'login-producto': 'var(--login-producto)',
                'logos-background': 'var(--logos-background)',
                'menu-background': 'var(--menu-background)',
                'menu-selected-background': 'var(--menu-backgroundselected)',
                'header-background': 'var(--header-background)',
                'sidebar-background': 'var(--sidebar-background)',
                'clock-color': 'var(--clock-color)',
                'title-color': 'var(--title-color)',
                'subtitle-color': 'var(--subtitle-color)',
                'title-login-color': 'var(--titleLogin-color)',
                'subtitle-login-color': 'var(--subtitleLogin-color)',
                'text1-color': 'var(--text1-color)',
                'text2-color': 'var(--text2-color)',
                'text3-color': 'var(--text3-color)',
                'text-login-color': 'var(--textLogin-color)',
                'border-color': 'var(--border-color)',
                option: {
                    one: '#3dc9ea',
                    two: '#28cbd5',
                    three: '#80affd',
                    four: '#c2b6f8',
                    disabled: '#e6e6e6'
                },
                default: {
                    primary: '#1D7BB2',
                    secondary: '#f5f5f5',
                    accent: '#233043',
                    icon: '#0088a8',
                    check: '#3B8AED',
                    checkdarker: '#1C7AB2',
                    radio: '#3B8AED',
                    button: '#33A0FF',
                    disabled: '#e6e6e6',
                    graybtn: '#4D627D',
                    grayletter: '#4B4B4B'
                },
                header: {
                    user: '#33A0FF',
                    main: '#1D7BB2',
                    mainh: '#1D7BB2E6'
                },
                requerimiento: {
                    14: '#E52F40',
                    1: '#CB2332',
                    2: '#AB1927',
                    3: '#E55A2D',
                    4: '#D45228',
                    5: '#B23E18',
                    6: '#E6B903',
                    7: '#CFA702',
                    8: '#B59204',
                    9: '#52B23B',
                    10: '#41962C',
                    11: '#257411',
                    13: '#165008'
                },
                error: '#dd4b39'
            },
            screens: {
                phone: '640px',
                laptop: '1280px',
                desktop: '1536px'
            },
            spacing: {
                'header-phone': 'var(--header-spacing-phone)',
                'header-phone-rp': 'var(--header-spacing-phone-rp)',
                'sidebar-phone': 'var(--sidebar-spacing-phone)',
                'header-laptop': 'var(--header-spacing-laptop)',
                'sidebar-laptop': 'var(--sidebar-spacing-laptop)',
                'header-desktop': 'var(--header-spacing-desktop)',
                'sidebar-desktop': 'var(--sidebar-spacing-desktop)',
                'sidebar+sidemenu-laptop': 'var(--sidebar-spacing-laptop)',
                'sidebar+sidemenu-desktop': 'var(--sidebar-spacing-desktop)'
            },
            backgroundImage: {
                'app-phone': 'url("@/assets/images/fondo.png")',
                'app-phone-header': 'url("@/assets/images/fondo.png")',
                'app-laptop': 'url("@/assets/images/fondo.png")'
            },
            gridTemplateRows: {
                'sidebar-phone': 'repeat(1, minmax(0, 1fr))',
                'sidebar-laptop': 'repeat(5, minmax(0, var(--sidebar-spacing-laptop)))',
                'app-phone':
                    'var(--header-spacing-phone) calc(100% - var(--header-spacing-phone) - var(--sidebar-spacing-phone)) var(--sidebar-spacing-phone)',
                'app-laptop': 'var(--header-spacing-laptop) repeat(1, minmax(0, 1fr))',
                'app-desktop': 'var(--header-spacing-desktop) repeat(1, minmax(0, 1fr))'
            },
            gridTemplateColumns: {
                'sidebar-phone': 'repeat(3, minmax(0, 1fr))',
                'sidebar-laptop': 'repeat(1, minmax(0, 1fr))',
                'app-phone': 'repeat(1, minmax(0, 1fr))',
                'app-laptop': 'var(--sidebar-spacing-laptop) minmax(900px, 1fr)',
                'app-desktop': 'var(--sidebar-spacing-desktop) minmax(900px, 1fr)'
            },
            gridTemplateAreas: {
                'app-phone': ['header', 'section', 'sidebar'],
                'app-laptop': ['sidebar header', 'sidebar section'],
                'sidebar-phone': ['account home configuration'],
                'sidebar-laptop': ['home', 'configuration', 'account']
            },
            boxShadow: {
                all: '0 0 4px 4px rgba(0, 0, 0, 0.05)'
            },
            backgroundPosition: {
                'header-laptop': 'center top'
            }
        },
        fontFamily: {
            'layout-light': ['Sailec-Light', 'Montserrat-Light', 'sans-serif'],
            layout: ['Sailec-Regular', 'Montserrat-Regular', 'sans-serif'],
            'layout-semibold': ['Sailec-Bold', 'Montserrat-Semibold', 'sans-serif'],
            'layout-bold': ['Sailec-Bold', 'Montserrat-Bold', 'sans-serif'],
            app: ['Montserrat-Regular', 'sans-serif'],
            'app-semibold': ['Montserrat-Semibold', 'sans-serif'],
            'app-bold': ['Montserrat-Bold', 'sans-serif']
        }
    },
    plugins: [require('@savvywombat/tailwindcss-grid-areas'), require('@tailwindcss/line-clamp')]
}

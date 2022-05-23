import home from 'icons/home.png';
import info from 'icons/info.png';
import gear from 'icons/settings.png';

export const MenuItems = [
    {
        title: "Home",
        url: '/',
        cName: 'nav-links-clicked',
        image: home,
    },
    // {
    //     title: "Profile",
    //     url: '/profile',
    //     cName: 'nav-links',
    //     image: profile,
    // },
    {
        title: "About",
        url: '/about',
        cName: 'nav-links',
        image: info,
    },
    {
        title: "Contact us",
        url: '/contact',
        cName: 'nav-links',
        image: gear,
    },
    // {
    //     title: "Sign up",
    //     url: '#',
    //     cName: 'nav-links-mobile',
    // },
]
export const navItems = [
  {
    type: "image",
    src: "/youtube.png",
    width: 30,
    height: 30,
    alt: "Logo",
    href:"https://www.youtube.com/"
  },
  {
    type: "links",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "FAQs", href: "/faqs" },
      { label: "History", href: "/history" },
    ],
  },
  {
    type: "iconLink",
    href: "/payment",
    icon: {
      name: "GiLynxHead", // from react-icons

    },
  },
];

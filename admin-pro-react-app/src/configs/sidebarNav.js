const dashboardsItem = [
  {
    link: "/dashboards/analytical",
    section: "analytical",
    text: "Analytical",
  },
  {
    link: "/dashboards/demographical",
    section: "demographical",
    text: "Demographical",
  },
  {
    link: "/dashboards/modern",
    section: "modern",
    text: "Modern",
  },
];

const home = [
  {
    link: "/",
    section: "home",
    icon: <i class="bx bx-home-alt"></i>,
    text: "Dashboards",
    childNav: dashboardsItem,
  },
];

const app = [
  {
    link: "/apps/notes",
    section: "notes",
    icon: <i class="bx bx-notepad"></i>,
    text: "Notes",
    childNav: [],
  },
  {
    link: "/apps/chat",
    section: "chat",
    icon: <i class="bx bx-message-rounded-dots"></i>,
    text: "Chat",
    childNav: [],
  },
  {
    link: "/apps/contacts",
    section: "contacts",
    icon: <i class="bx bx-user"></i>,
    text: "Contacts",
    childNav: [],
  },
];

const product = [
  {
    link: "/product",
    section: "products",
    icon: <i class="bx bx-archive"></i>,
    text: "Product",
    childNav: [],
  },
  {
    link: "/product/cart",
    section: "cart",
    icon: <i class="bx bx-cart"></i>,
    text: "Shopping Cart",
    childNav: [],
  },
  {
    link: "/product/checkout",
    section: "checkoutProduct",
    icon: <i class="bx bx-list-check"></i>,
    text: "Checkout",
    childNav: [],
  },
];

const productManagement = [
  {
    link: "/productMana/add",
    section: "addProducts",
    icon: <i class="bx bx-folder-plus"></i>,
    text: "Add Product",
    childNav: [],
  },
  {
    link: "/productMana/orders",
    section: "ordersProduct",
    icon: <i class="bx bx-notepad"></i>,
    text: "Orders",
    childNav: [],
  },
];

const sidebarNav = [
  { tab: home, text: "Home" },
  { tab: app, text: "App" },
  { tab: product, text: "eCommerce" },
  { tab: productManagement, text: "Product Management" },
];

export default sidebarNav;

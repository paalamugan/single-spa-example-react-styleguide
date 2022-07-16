const locales = [
  {
    locale: "en",
    messages: import("./en"),
    //loadData: import(`@formatjs/intl-relativetimeformat/dist/locale-data/en`),
  },
  // {
  //   locale: "de",
  //   messages: import("./de"),
  // },
  {
    locale: "es",
    messages: import("./es"),
  },
];

export default locales;

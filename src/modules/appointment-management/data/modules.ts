export const commonModules = [
  {
    id: "manage-shits",
    title: "Gestionar turnos",
    imageUrl: new URL(
      "../../../assets/images/modules/health/manage-shifts.webp",
      import.meta.url
    ).href,
    linkTo: "manage-shifts",
  },
  {
    id: "manage-content",
    title: "Gestionar contenido informativo",
    imageUrl: new URL(
      "../../../assets/images/modules/health/informative-content.webp",
      import.meta.url
    ).href,
    linkTo: "home",
  },
  {
    id: "request-shifts",
    title: "Solicitar turno",
    imageUrl: new URL(
      "../../../assets/images/modules/health/request-shift.webp",
      import.meta.url
    ).href,
    linkTo: "request-shifts",
  },
];

export const secretaryModules = [
  ...commonModules,
  {
    id: "statistics",
    title: "Estadísticas",
    imageUrl: new URL(
      "../../../assets/images/statistics-reporting.jpg",
      import.meta.url
    ).href,
    linkTo: "statistics",
  },
];

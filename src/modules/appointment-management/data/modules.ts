import { ModuleItemType } from "@modules/appointment-management/types";

export const adminItems: ModuleItemType[] = [
  {
    id: "request-turn",
    icon: ["fas", "plus"],
    title: "Solicitar turno",
    description: "Reserva un nuevo turno en nuestro sistema",
    linkTo: "/modules/appointment-management/request-shifts",
  },
  {
    id: "manage-turn",
    icon: ["fas", "gear"],
    title: "Gestionar turnos",
    description: "Administra la disponibilidad de turnos",
    linkTo: "/modules/appointment-management/manage-shifts",
  },
  {
    id: "informative-content",
    icon: ["fas", "house"],
    title: "Contenido informativo",
    description:
      "Observe los turnos en espera y gestione el contenido informativo",
    linkTo: "/modules/appointment-management/home",
  },
];

export const secretaryItems: ModuleItemType[] = [
  ...adminItems,
  {
    id: "statistics",
    icon: ["fas", "chart-simple"],
    title: "Ver estadísticas",
    description: "Visualiza datos y metricas de los turnos",
    linkTo: "/modules/appointment-management/statistics",
  },
];

export const doctorItems: ModuleItemType[] = [
  {
    id: "call-turn",
    icon: ["fas", "phone"],
    title: "Atender turno",
    description: "Atiende un turno en nuestro sistema",
    linkTo: "/modules/appointment-management/call-turns",
  },
  {
    id: "request-turn",
    icon: ["fas", "plus"],
    title: "Solicitar turno",
    description: "Reserva un nuevo turno en nuestro sistema",
    linkTo: "/modules/appointment-management/request-shifts",
  },
  {
    id: "statistics",
    icon: ["fas", "chart-simple"],
    title: "Ver estadísticas",
    description: "Visualiza datos y metricas de los turnos",
    linkTo: "/modules/appointment-management/statistics",
  },
];

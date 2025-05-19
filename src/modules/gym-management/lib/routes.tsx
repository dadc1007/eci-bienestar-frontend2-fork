export const GYM_BASE_PATH = "/modules/gym-management";

export const STUDENT_ROUTES = {
  base: `${GYM_BASE_PATH}/student`,
  reservations: "reservations",
  booking: "booking",
  routines: "routines",
  progress: "progress",
  evolution: "evolution",
  firstRegister: "first-register",
  bodyMeasurements: "body-measurements",
};

export const TRAINER_ROUTES = {
  base: `${GYM_BASE_PATH}/trainer`,
  routines: "trainer-routines",
  exercises: "exercises",
  sessions: "sessions",
  reservations: "trainer-reservations",
  progress: "progress",
};
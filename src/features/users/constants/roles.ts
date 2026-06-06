export const USER_ROLES = {
  PATIENT: 'Patient',
  MEDIC: 'Medic',
  ADMINISTRATIVE: 'Administrative',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

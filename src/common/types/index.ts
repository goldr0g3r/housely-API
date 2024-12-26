export type TACCESS_TOKEN = `${string}.${string}.${string}`;
export type TREFRESH_TOKEN = `${string}.${string}.${string}`;

export type TIP_ADDRESS = `${number}.${number}.${number}.${number}`;

export enum TokenTypeEnum {
  ACCESS = 'access',
  REFRESH = 'refresh',
  CONFIRMATION = 'confirmation',
  RESET_PASSWORD = 'resetPassword',
}

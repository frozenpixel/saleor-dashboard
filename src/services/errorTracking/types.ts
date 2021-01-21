export type UserData = {
  id: string;
  email: string;
  username: string;
} | null;

export interface ExtensionMethods {
  init: () => boolean;
  setUserData: (userData: UserData) => void;
  captureException: (e: Error) => string | null | undefined;
}

export type ExtensionFactory = () => ExtensionMethods;

export enum TrackerPermission {
  USER_DATA
}

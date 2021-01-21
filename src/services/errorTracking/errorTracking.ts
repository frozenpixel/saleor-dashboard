import {
  ExtensionFactory,
  ExtensionMethods,
  TrackerPermission,
  UserData
} from "./types";

type ErrorTrackingFactory = (
  ExtensionFactory: ExtensionFactory,
  permissions?: TrackerPermission[]
) => ExtensionMethods;

export const ErrorTrackingFactory: ErrorTrackingFactory = (
  ExtensionFactory,
  permissions = []
) => {
  let ENABLED = false;
  const extension = ExtensionFactory();

  const safelyInvoke = <T extends () => any>(
    fn: T,
    permission?: TrackerPermission
  ): ReturnType<T> => {
    const hasPermission =
      permission !== undefined ? permissions.includes(permission) : true;

    if (ENABLED && hasPermission) {
      try {
        return fn();
      } catch (e) {
        throw new Error(`Tracking Extension Error: ${e}`);
      }
    }
  };

  const init: ExtensionMethods["init"] = () => {
    if (!ENABLED) {
      ENABLED = extension.init();
    }

    return ENABLED;
  };

  const setUserData: ExtensionMethods["setUserData"] = (userData: UserData) =>
    safelyInvoke(
      () => extension.setUserData(userData),
      TrackerPermission.USER_DATA
    );

  const captureException: ExtensionMethods["captureException"] = (e: Error) =>
    safelyInvoke(() => extension.captureException(e));

  return {
    captureException,
    init,
    setUserData
  };
};

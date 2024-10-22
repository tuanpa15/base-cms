import {
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE,
  REGEX_URL,
} from "../utils/regex";
import i18next from "../i18n/i18n";

export const commonRules = {
  email: {
    pattern: REGEX_EMAIL,
    message: i18next.t("validate.emailWrongFormat"),
  },
  phone: {
    pattern: REGEX_PHONE,
    message: i18next.t("validate.phoneInvalid"),
  },
  required: {
    required: true,
    message: i18next.t("validate.fieldIsRequired"),
  },
  password: {
    pattern: REGEX_PASSWORD,
    message: i18next.t("validate.passwordWrongFormat"),
  },
  whiteSpace: {
    whitespace: true,
    message: i18next.t("validate.noAllSpaces"),
  },

  url: {
    pattern: REGEX_URL,
    message: i18next.t("validate.incorrectFormat"),
  },
  confirmPassword: ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }

      return Promise.reject(new Error(i18next.t("validate.passwordNotMatch")));
    },
  }),
};

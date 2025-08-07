/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function isArrayOfStrings(_val: unknown): _val is string[] {
  return Boolean(_val) && Array.isArray(_val) && _val.some((field) => typeof field === "string");
}

/* eslint-disable no-case-declarations */
const genericMessage = "Something went wrong while trying to connect with the server";

export const handleApiError = (error: any) => {
  // @ts-ignore
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line
    console.error("[Service Error]", { error });
  }
  if (!error?.response) {
    const { data } = error || {};
    if (!data) return genericMessage;

    return (data?.error && data?.error[0]?.message) || data?.message || genericMessage;
  }


  const { response } = error || {};
  const { data } = response;

  switch (response?.status) {
    case 400:
      const keys = Object.keys(data).filter((field) => !["success", "message", "code"].includes(field));

      if (data?.message) {
        return `${data?.message}`;
      }

      const firstItem = data[keys[0]];

      if (Array.isArray(firstItem)) {
        if (isArrayOfStrings(firstItem)) {
          return firstItem.join("\n");
        }
        let toastMsg = {};
        firstItem?.forEach((v, i) => {
          toastMsg = {
            ...toastMsg,
            [`error-${i}`]: `${v}`,
          };
        });
        // return `${keys[0]}: ${firstItem[0]}`;
        return JSON.stringify(toastMsg);
      }
      if (typeof firstItem === "string") return firstItem;
      if (typeof firstItem === "number") return firstItem;

      const detailKeys = Object.keys(data?.detail || {});
      if (detailKeys.length) {
        const firstDetail = data?.detail[detailKeys[0]];
        if (Array.isArray(firstDetail)) return `${detailKeys[0]}: ${firstDetail[0]}`;
        if (typeof firstDetail === "string") return firstDetail;
      }

      const dataErrors = Object.keys(data?.errors || {});
      if (dataErrors.length > 0) {
        const firstError = data?.errors[dataErrors[0]];
        if (Array.isArray(firstError)) return JSON.stringify(firstError);
        // return `${dataErrors[0]}: ${firstError[0]}`;
        if (typeof firstError === "string") return firstError;
      }

      const dataErrorsError = Object.keys(data?.errors?.error || {});
      if (dataErrorsError.length > 0) {
        const toastMsg = {};
        return JSON.stringify(toastMsg);
      }

      const errorReturnMsg =
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        "Bad Request Sent";

      return typeof errorReturnMsg === "string" ? errorReturnMsg : JSON.stringify(errorReturnMsg);

    case 401:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        data?.data ||
        "You are not authorized to perform this action"
      );

    case 403:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        data?.data ||
        "You are forbidden from performing this action"
      );
    case 404:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : "JSON.stringify(data?.detail)")) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        "The resource you are trying to load cannot be found"
      );
    case 409:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        "A duplicate already exists"
      );
    case 500:
      return genericMessage;
    case 504:
      return "Gateway server Timeout";
    default:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        genericMessage
      );
  }
};

export default handleApiError;

export function recurseValue(value: any) {
  if (Array.isArray(value)) {
    let toastMsg = {};
    value?.forEach((v, i) => {
      toastMsg = {
        ...toastMsg,
        [`error-${i}`]: `${v}`,
      };
    });
    // return `${keys[0]}: ${value[0]}`;
    return JSON.stringify(toastMsg);
  }
  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
}

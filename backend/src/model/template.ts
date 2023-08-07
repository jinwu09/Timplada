const date = new Date();

export interface data {
  status?: number;
  payload: string;
  success?: boolean;
  author: string;
  date: string;
}
export const sendTemplate = (inPayload: any, isSuccess?: boolean) => {
  const send: data = {
    success: isSuccess,
    payload: inPayload,
    author: "Albert John Sants",
    date:
      date.getFullYear() +
      "/" +
      date.getMonth() +
      "/" +
      date.getDate() +
      " " +
      date.toTimeString(),
  };
  return send;
};
export enum Code {
  s100_Continue = 100,
  s101_Switching_Protocol = 101,
  s102_Processing = 102,
  s103_Early_Hints = 103,

  s200_OK = 200,
  s201_Created = 201,
  s202_Accepted = 202,
  s203_Non_Auth_Information = 203,
  s204_No_content = 204,
  s205_Reset_Content = 205,
  s206_Partial_Content = 206,
  s207_Multi_Status = 207,
  s208_Already_Reported = 208,

  S400_Bad_Request = 400,
  s401_Unauthorized = 401,
  s402_Payment_Required = 402,
  s403_Forbidden = 403,
  s404_Not_Found = 404,
  s405_Method_Not_Allowed = 405,
  s406_Not_Acceptable = 406,
  s407_Proxy_Auth_Required = 407,
  s408_Request_Timeout = 408,
  s409_Conflict = 409,
}

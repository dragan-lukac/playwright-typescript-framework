export interface User {
    username: string;
    password: string;
}

export const users = {
  standard: "standard_user",
  lockedOut: "locked_out_user",
};
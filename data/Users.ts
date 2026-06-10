export interface User {
  username: string;
  password: string;
}

const PASSWORD = process.env.SAUCEDEMO_PASSWORD!;
const makeUser = (username: string): User => ({ username, password: PASSWORD });

export const standardUser: User = {username: 'standard_user', password: PASSWORD};
export const lockedOutUser: User = makeUser("locked_out_user");
export const problemUser: User = makeUser("problem_user");
export const performanceGlitchUser: User = makeUser("performance_glitch_user");
export const errorUser: User = makeUser("error_user");
export const visualUser: User = makeUser("visual_user");
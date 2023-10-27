export interface UserState extends Partial<User> {
  isLoggedIn: boolean;
}
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export type UserSetPayload = User;

export type Role = 'Admin' | 'User';

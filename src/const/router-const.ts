export enum AppRoutes {
  Main = '/',
  Login = '/login',
  Register = '/register',
  Repass = '/repass',
  Confirm = '/confirm/:confirmId',
  NewPassword = '/newpassword/:repassId',
  NotFound = '/notfound',
  Dashboard = '/dashboard',
  Pets = '/pets',
  Finance = '/finance',
  Fundraising = '/fundraising',
  Team = '/team',
};

export const APP_START_ROUTE = AppRoutes.Dashboard;

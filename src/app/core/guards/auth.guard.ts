import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = () => {
  return !!inject(AuthService).isLoggedIn();
};

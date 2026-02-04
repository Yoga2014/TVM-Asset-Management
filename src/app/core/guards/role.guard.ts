import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const RoleGuard: CanActivateFn = (route) => {
  return inject(AuthService).hasRole(route.data['role']);
};

import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _user = signal<Employee | null>(null);
  private router = inject(Router);

  constructor() {
    if (this.isBrowser) {
      const stored = localStorage.getItem('user');
      if (stored) {
        this._user.set(JSON.parse(stored));
      }
    }
  }

  get user() {
    return this._user();
  }

  login(email: string, password: string): Employee {
   const employee: Employee = {
    id: 1,
    name: email.split('@')[0],   
    email: email,              
    department: 'IT',
    role: email === 'admin@gmail.com' ? 'ADMIN' : 'EMPLOYEE',
    joiningDate: '2024-01-01',
    status: 'ACTIVE'
  };

    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(employee));
    }

    this._user.set(employee);
    return employee;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this._user();
  }

  hasRole(role: 'ADMIN' | 'EMPLOYEE'): boolean {
    return this._user()?.role === role;
  }
}

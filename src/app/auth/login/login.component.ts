import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router,private auth:AuthService) {}

  login() {
  const user = this.auth.login(this.email, this.password);

  if (!user) {
    this.error = 'Invalid email or password';
    return;
  }

  // redirect based on role
  if (user.role === 'ADMIN') {
    this.router.navigate(['/admin']);
  } else {
    this.router.navigate(['/employee']);
  }
}
}

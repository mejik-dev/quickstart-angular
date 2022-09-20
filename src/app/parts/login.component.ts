import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MicrogenService } from '../microgen.service';

@Component({
  selector: 'login',
  template: `
    <form>
      <input type="hidden" name="operation" value="login" />
      <div class="form-group">
        <label>Username</label>
        <input #username type="text" name="username" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input #password type="password" name="password" required />
      </div>
      <div class="form-button">
        <button
          type="submit"
          (click)="handleLogin(username.value, password.value)"
          class="button button-primary"
        >
          Submit
        </button>
      </div>
    </form>
  `,
})
export class LoginComponent {
  constructor(
    private readonly microgen: MicrogenService,
    private router: Router
  ) {}

  handleLogin = async (username: string, password: string) => {
    const { error, token } = await this.microgen.login(username, password);

    if (error) {
      alert(error.message);
      return;
    }

    if (token) {
      this.router.navigate(['/profile']);
    }
  };
}

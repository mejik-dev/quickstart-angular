import { Component } from '@angular/core';

@Component({
  template: `
    <div class="auth-page">
      <div class="auth-button">
        <button (click)="setSwitchAuthForm('login')">Login</button>
        <button (click)="setSwitchAuthForm('register')">Register</button>
        <div>
          <login *ngIf="switchAuthForm === 'login'"></login>
          <register *ngIf="switchAuthForm === 'register'"></register>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {
  switchAuthForm = 'login';

  setSwitchAuthForm(authName: string) {
    this.switchAuthForm = authName;
  }
}

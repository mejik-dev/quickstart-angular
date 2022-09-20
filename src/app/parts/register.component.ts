import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MicrogenService } from '../microgen.service';

@Component({
  selector: 'register',
  template: `
    <form>
      <div class="form-group">
        <label>First Name</label>
        <input #firstName type="text" name="firstname" required />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input #lastName type="text" name="lastname" />
      </div>
      <div class="form-group">
        <label>Username</label>
        <input #username type="text" name="username" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input #email type="email" name="email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input #password type="password" name="password" required />
      </div>
      <div class="form-button">
        <button
          (click)="
            handleRegister(
              firstName.value,
              lastName.value,
              email.value,
              username.value,
              password.value
            )
          "
          class="button button-primary"
        >
          Submit
        </button>
      </div>
    </form>
  `,
})
export class RegisterComponent {
  constructor(
    private readonly microgen: MicrogenService,
    private router: Router
  ) {}

  handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) => {
    const { user, error } = await this.microgen.register(
      firstName,
      lastName,
      email,
      username,
      password
    );
    if (error) {
      alert(error.message);
      return;
    }

    console.log(user);
    const { error: errorProfile } = await this.microgen.createProfile(
      user._id
    );

    if (errorProfile) {
      alert(errorProfile.message);
      return;
    }
    this.router.navigate(['/profile']);
  };
}

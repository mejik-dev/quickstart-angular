import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MicrogenService } from './microgen.service';

@Component({
  template: `
    <div class="profile-page">
      <div class="button-top">
        <a [routerLink]="'/' + user.username" class="button">View Profile</a>
        <button (click)="handleLogout()">Logout</button>
      </div>
      <div class="profile-wrapper">
        <div class="profile-header">
          <label class="label-file" for="file">
            <img
              class="image-avatar"
              width="90"
              height="90"
              [src]="profile.image || 'https://via.placeholder.com/90'"
              alt=""
            />
            <span>{{ loading ? 'Uploading...' : 'Change Image' }}</span>
          </label>
          <input
            name="file"
            id="file"
            type="file"
            accept="image/*"
            (change)="handleChangeImage($event)"
          />
        </div>
        <div class="card">
          <form method="post">
            <div class="card-field">
              <label>First Name</label>
              <input
                #firstName
                type="text"
                name="firstname"
                [value]="user?.firstName ?? ''"
              />
            </div>
            <div class="card-field">
              <label>Last Name</label>
              <input
                #lastName
                type="text"
                name="lastname"
                [value]="user?.lastName ?? ''"
              />
            </div>
            <div class="card-field">
              <label>Phone Number</label>
              <input
                #phoneNumber
                type="text"
                name="phonenumber"
                [value]="user?.phoneNumber ?? ''"
              />
            </div>
            <div class="card-field">
              <label>Company</label>
              <input
                #company
                type="text"
                name="company"
                [value]="profile?.company ?? ''"
              />
            </div>
            <div class="card-field">
              <label>Position</label>
              <input
                #position
                type="text"
                name="position"
                [value]="profile?.position ?? ''"
              />
            </div>
            <div class="card-field">
              <label>Location</label>
              <input
                #location
                type="text"
                name="location"
                [value]="profile?.location ?? ''"
              />
            </div>
            <div class="card-field">
              <label>Website</label>
              <input
                #website
                type="url"
                name="website"
                [value]="profile?.website ?? ''"
              />
            </div>
            <div class="form-button">
              <button
                type="submit"
                (click)="
                  handleUpdate(
                    firstName.value,
                    lastName.value,
                    phoneNumber.value,
                    company.value,
                    location.value,
                    position.value,
                    website.value
                  )
                "
                class="button button-primary"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class EditProfileComponent implements OnInit {
  user: any;
  profile: any;
  loading = false;

  constructor(
    private readonly microgen: MicrogenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile = async () => {
    const { error, user } = await this.microgen.getOwnProfile();

    if (error) {
      console.log(error);
      return;
    }

    if (user) {
      this.user = user;
      this.profile = user.profile[0];
    }
  };

  handleChangeImage = async (event: any) => {
    this.loading = true;
    const file = event.target.files[0];
    const { data, error: uploadError } = await this.microgen.uploadImage(
      file
    );

    const { error: updateError } = await this.microgen.updateImage(
      this.profile._id,
      data?.url
    );

    if (uploadError || updateError) {
      alert('Failed to change image profile');
      return;
    }

    this.profile.image = data?.url;
    this.loading = false;
  };

  handleUpdate = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    company: string,
    location: string,
    position: string,
    website: string
  ) => {
    const { error: userError } = await this.microgen.updateUser(
      firstName,
      lastName,
      phoneNumber
    );

    const { error: profileError } = await this.microgen.updateProfile(
      this.profile._id,
      company,
      position,
      location,
      website
    );

    if (userError || profileError) {
      alert('Failed to update profile');
    } else {
      alert('Profile updated!');
    }
  };

  handleLogout = async () => {
    await this.microgen.logout();
    this.router.navigate(['/']);
  };
}

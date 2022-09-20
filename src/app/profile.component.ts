import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MicrogenService } from './microgen.service';

@Component({
  template: `
    <div class="profile-page">
      <div *ngIf="isOwnProfile" class="button-top">
        <a routerLink="/profile" class="button">Edit Profile</a>
        <button (click)="handleLogout()">Logout</button>
      </div>
      <div class="profile-wrapper">
        <div class="profile-header">
          <img
            class="image-avatar"
            width="90"
            height="90"
            [src]="profile.image || 'https://via.placeholder.com/90'"
            alt=""
          />
          <h3 class="profile-title">
            <span>{{ user.firstName }}</span> <span>{{ user.lastName }}</span>
          </h3>
          <p>{{ profile.position || 'position is null' }}</p>
        </div>
        <div class="card">
          <h3>Contact</h3>
          <div class="card-field">
            <span>Name</span>
            <p>{{ user.firstName }} {{ user.lastName }}</p>
          </div>
          <div class="card-field">
            <span>Mobile</span>
            <p>{{ profile.phoneNumber || 'phone number is null' }}</p>
          </div>
          <div class="card-field">
            <span>Email</span>
            <a class="link-email" :href="'mailto:' + email">
              {{ user.email || 'email is null' }}
            </a>
          </div>
          <div class="card-field">
            <span>Company</span>
            <p>{{ profile.company || 'company is null' }}</p>
          </div>
        </div>
        <div class="card">
          <h3>Location</h3>
          <p>{{ profile.location || 'location is null' }}</p>
        </div>
        <div class="card">
          <h3>Web Links</h3>
          <a class="website-link" href="{{ profile.website || '' }}">
            Website
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  username: string | undefined;
  user: any;
  profile: any;
  isOwnProfile = false;

  constructor(
    private readonly microgen: MicrogenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || undefined;
    this.getProfile();
  }

  getProfile = async () => {
    const { data: userProfile, error } =
      await this.microgen.getProfileByUsername(this.username);

    if (error) {
      console.log(error);
      return;
    }

    const { user: authUser } = await this.microgen.getOwnProfile();

    if (userProfile) {
      this.user = userProfile[0];
      this.profile = userProfile[0].profile[0];

      this.isOwnProfile = this.user.username === authUser.username;
    }
  };

  handleLogout = async () => {
    await this.microgen.logout();
    this.router.navigate(['/']);
  };
}

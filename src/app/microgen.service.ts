import { Injectable } from '@angular/core';
import { createClient } from 'microgen-v3-sdk';
import { environment } from '../environments/environment';

interface Profile {
  company: string;
  location: string;
  position: string;
  website?: string;
}

@Injectable({ providedIn: 'root' })
export class MicrogenService {
  private microgen;

  constructor() {
    this.microgen = createClient({
      apiKey: environment.microgenApiKey,
    });
  }

  get user() {
    return this.microgen.auth.user();
  }

  login(username: string, password: string) {
    return this.microgen.auth.login({
      // @ts-ignore
      username,
      password,
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) {
    return this.microgen.auth.register({
      firstName,
      lastName,
      email,
      // @ts-ignore
      username,
      password,
    });
  }

  createProfile(userId: string) {
    return this.microgen.service('profile').create({
      Users: [userId],
    });
  }

  getOwnProfile() {
    return this.microgen.auth.user({
      lookup: '*',
    });
  }
  updateUser(firstName: string, lastName: string, phoneNumber: string) {
    return this.microgen.auth.update({ firstName, lastName, phoneNumber });
  }

  uploadImage(file: string) {
    return this.microgen.storage.upload(file);
  }

  updateImage(profileId: string, image: string | undefined) {
    return this.microgen.service('profile').updateById(profileId, {
      image,
    });
  }

  updateProfile(
    id: string,
    company: string,
    location: string,
    position: string,
    website: string
  ) {
    let profileData: Profile = {
      company: '',
      location: '',
      position: '',
    };
    profileData.company = company;
    profileData.location = location;
    profileData.position = position;

    if (website !== '') {
      profileData.website = website;
    }

    return this.microgen.service('profile').updateById(id, profileData);
  }

  getProfileByUsername(username: string | undefined) {
    return this.microgen.service('Users').find({
      where: {
        username,
      },
      lookup: '*',
    });
  }

  logout() {
    return this.microgen.auth.logout();
  }
}

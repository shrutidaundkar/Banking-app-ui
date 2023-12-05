import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/userServices/profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.updateProfileForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

      dateofbirth: new FormControl('', [Validators.required]),
    });
  }

  get getUpdateProfileFormControls() {
    return this.updateProfileForm.controls;
  }

  ngOnInit(): void {
    var userId: number = Number(localStorage.getItem('userId'));
    this.profileService.getUserProfile(userId).subscribe(
      (response: any) => {
        this.user = response;
        this.setValues(this.user);
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  setValues(user: any) {
    this.updateProfileForm.controls['firstname'].setValue(user.firstname);
    this.updateProfileForm.controls['lastname'].setValue(user.lastname);
    this.updateProfileForm.controls['gender'].setValue(user.gender);
    this.updateProfileForm.controls['age'].setValue(user.age);
    this.updateProfileForm.controls['mobile'].setValue(user.mobile);
    this.updateProfileForm.controls['email'].setValue(user.email);
    this.updateProfileForm.controls['password'].setValue(user.password);
    this.updateProfileForm.controls['dateofbirth'].setValue(user.dateofbirth);
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return value + 'yr';
    }
    return value;
  }

  submitForm() {
    var userId: number = Number(localStorage.getItem('userId'));

    const userProfileData = {
      userId: userId,
      firstname: this.updateProfileForm.get('firstname')?.value,
      lastname: this.updateProfileForm.get('lastname')?.value,
      mobile: this.updateProfileForm.get('mobile')?.value,
      gender: this.updateProfileForm.get('gender')?.value,
      age: this.updateProfileForm.get('age')?.value,
      email: this.updateProfileForm.get('email')?.value,
      password: this.updateProfileForm.get('password')?.value,
      dateofbirth: this.updateProfileForm.get('dateofbirth')?.value,
    };

    console.log(userProfileData);

    this.profileService.updateUserProfile(userProfileData).subscribe(
      (response) => {
        if (response != null) {
          this.notificationService.createNotification(
            'success',
            'Success',
            'Profile Updated Successfully'
          );
          this.router.navigate(['/dashboard/profile']);
        } else if (response == null) {
          this.notificationService.createNotification(
            'error',
            'Error',
            'Profile Update Unsuccessful'
          );
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelForm() {
    this.updateProfileForm.reset();
  }
}

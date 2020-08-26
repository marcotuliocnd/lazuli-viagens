import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../interfaces/User';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: IUser;
  formGroup: FormGroup;
  passwordForm: FormGroup;
  message = '';
  loading: boolean;
  isSavingPhoto: boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UsersService, private router: Router) {
    this.user = this.authService.getUser();
    this.formGroup = this.formBuilder.group({
      name: this.user.name,
      email: this.user.email,
      cpf: this.user.cpf,
      rg: this.user.rg,
      cellphone: this.user.cellphone,
      phone: this.user.phone,
      birthdate_at: moment(this.user.birthdate_at).startOf('day').format('YYYY-MM-DD'),
      passport_number: this.user.passport_number,
    });

    this.passwordForm = this.formBuilder.group({
      lastPassword: '',
      password: '',
      passwordConfirm: '',
    })
  }

  ngOnInit(): void {
  }

  saveInfo() {
    this.loading = true;
    this.userService.updateMe(this.formGroup.value).subscribe(
      (res) => {
        this.loading = false;
        this.authService.setToken(res.token);
        this.authService.setUser(res.user);
      },
      (err) => {
        this.loading = false;
        this.message = 'Erro interno de servidor';
      },
    );
  }

  savePassword() {
    this.loading = true;
    this.userService.updatePass(this.passwordForm.value).subscribe(
      (res) => {
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.message = 'Erro interno de servidor';
      },
    );
  }

  async onAvatarUpload(event) {
    const avatar = event.target.files[0] || null;

    if (avatar) {
      this.isSavingPhoto = true;

      const formData = new FormData();
      formData.append('avatar', avatar);

      this.userService.photo(formData).subscribe(
        async (res) => {
          const { avatar_url } = res;
          this.isSavingPhoto = false;

          this.authService.setAvatar(avatar_url);
          this.router.navigate(['/panel']);
        },
        async () => {
          this.isSavingPhoto = false;
        },
      );
    }
  }

}

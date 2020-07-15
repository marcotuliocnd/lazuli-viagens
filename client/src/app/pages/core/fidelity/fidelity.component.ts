import { UsersService } from './../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { IUser } from './../../../interfaces/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fidelity',
  templateUrl: './fidelity.component.html',
  styleUrls: ['./fidelity.component.scss']
})
export class FidelityComponent implements OnInit {

  user: IUser;
  isSavingPhoto: boolean;

  constructor(private authService: AuthService, private userService: UsersService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
  }

  async onPhotoUpload(event) {
    const avatar = event.target.files[0] || null;

    if (avatar) {
      this.isSavingPhoto = true;

      const formData = new FormData();
      formData.append('avatar', avatar);

      this.userService.comprovante(formData).subscribe(
        async (res) => {
          this.isSavingPhoto = false;
        },
        async () => {
          this.isSavingPhoto = false;
        },
      );
    }
  }

}

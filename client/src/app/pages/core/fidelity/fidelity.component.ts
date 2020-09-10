import { UsersService } from './../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { IUser } from './../../../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fidelity',
  templateUrl: './fidelity.component.html',
  styleUrls: ['./fidelity.component.scss']
})
export class FidelityComponent implements OnInit {

  user: IUser;
  isSavingPhoto: boolean;

  constructor(private authService: AuthService, private userService: UsersService, private toastr: ToastrService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
  }

  async onPhotoUpload(event) {
    const avatar = event.target.files[0] || null;

    if (avatar) {
      this.isSavingPhoto = true;

      const formData = new FormData();
      formData.append('comprovante', avatar);

      this.toastr.warning('Enviando comprovante...');

      this.userService.comprovante(formData).subscribe(
        async (res) => {
          this.isSavingPhoto = false;
          this.toastr.success('Comprovante enviado com sucesso');
        },
        async () => {
          this.isSavingPhoto = false;
          this.toastr.error('Erro ao enviar comprovante, tente novamente mais tarde!');
        },
      );
    }
  }

}

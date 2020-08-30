import { FidelityService, Data as IFidelity } from './../services/fidelity.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './../../../services/auth.service';
import { IUser, Fidelity } from './../../../interfaces/User';

import { Data, UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Data[] = [];
  user: IUser;
  edit: boolean;
  loading: boolean;
  formGroup: FormGroup;
  message = '';
  fidelities: IFidelity[] = [];
  aniversariantes: Data[] = [];
  nextPage: boolean;

  page = 1;
  paginating: boolean = false;
  disablePaginate: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fidelityService: FidelityService,
  ) {
    this.user = this.authService.getUser();
    this.formGroup = this.formBuilder.group({
      id: '',
      name: '',
      email: '',
      cpf: '',
      rg: '',
      cellphone: '',
      phone: '',
      birthdate_at: '',
      passport_number: '',
      fidelity: '',
      value: '',
    });
  }

  ngOnInit(): void {
    this.fidelityService.list().subscribe(
      (res) => {
        this.fidelities = res.data;
      },
    ) 
    this.usersService.list().subscribe(
      (res) => {
        this.users = res.data;
        this.nextPage = res.nextPage !== 0;
      },
    );
    this.usersService.listBirthday().subscribe(
      (res) => {
        this.aniversariantes = res.data;
      },
    );
  }

  getDate(datetime: string): string {
    return moment(datetime).format('DD/MM/YYYY');
  }

  openModal(content, mode: string = 'create', user = null) {
    if (mode === 'create') {
      this.formGroup.setValue({
        id: '',
        name: '',
        email: '',
        cpf: '',
        rg: '',
        cellphone: '',
        phone: '',
        birthdate_at: '',
        passport_number: '',
        fidelity: null,
        value: '',
      });
      this.edit = false;
    } else if (mode === 'edit' && user) {
      this.formGroup.setValue({
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        rg: user.rg || '',
        cellphone: user.cellphone,
        phone: user.phone || '',
        birthdate_at: moment(user.birthdate_at).startOf('day').format('YYYY-MM-DD'),
        passport_number: user.passport_number || '',
        fidelity: user?.fidelity?._id || null,
        value: user?.value || '',
      });

      this.edit = true;
    }
    this.modalService.open(content, { ariaLabelledBy: 'Modal Viagens' });
  }

  save(mode: string = 'create'): void {
    const { value } = this.formGroup;
    if (!value.name || !value.name || !value.cpf || !value.rg || !value.cellphone || !value.birthdate_at) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    this.loading = true;
    if (mode === 'create') {
      this.usersService.store(this.formGroup.value).subscribe(
        (res) => {
          this.usersService.list().subscribe(
            (res) => {
              this.users = res.data;
              this.loading = false;
              this.toastr.success('Usuário criado com sucesso!');
              this.modalService.dismissAll();
            },
          );
        },
        (err) => {
          this.loading = false;
          this.toastr.error(`Houve um erro no servidor, contate um administrador para lhe auxiliar!`);
        }
      );

    } else if (mode === 'save') {
      this.usersService.update(this.formGroup.value, this.formGroup.value.id).subscribe(
        (res) => {
          this.usersService.list().subscribe(
            (res) => {
              this.users = res.data;
              this.loading = false;
              this.toastr.success('Modificações feitas com sucesso!');
              this.modalService.dismissAll();
            },
          );
        },
        (err) => {
          this.loading = false;
          this.toastr.error(`Houve um erro no servidor, contate um administrador para lhe auxiliar!`);
        }
      );
    }
  }


  paginate() {
    this.page++;

    this.usersService.list(this.page).subscribe(
      (res) => {
        if (!res.data) {
          this.disablePaginate = true;
        }
        res.data.forEach((el) => {
          this.users.push(el);
        });
      },
      (err) => {
        this.disablePaginate = true;
      }
    );
  }

}

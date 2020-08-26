import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './../../../services/auth.service';
import { IUser } from './../../../interfaces/User';
import { TripService, Data } from './../services/trips.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trips: Data[] = [];
  user: IUser;
  edit: boolean;
  loading: boolean;
  formGroup: FormGroup;

  page = 1;
  paginating: boolean = false;
  disablePaginate: boolean = false;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.user = this.authService.getUser();
    console.log(this.user?.role?.slug !== 'admin')
    this.formGroup = this.formBuilder.group({
      id: '',
      from: '',
      to: '',
      started_at: '',
      finished_at: '',
      payment_at: '',
      payment_method: '',
      value: 1000.0,
      cpf: '',
      more: '',
    });
  }

  ngOnInit(): void {
    this.tripService.list().subscribe(
      (res) => {
        this.trips = res.data;
      },
    );
  }

  getDate(datetime: string): string {
    return moment(datetime).format('DD/MM/YYYY');
  }

  openModal(content, mode: string = 'create', trip = null) {
    if (mode === 'create') {
      this.formGroup.setValue({
        id: '',
        from: '',
        to: '',
        started_at: '',
        finished_at: '',
        payment_at: '',
        payment_method: '',
        value: 1000.0,
        cpf: '',
        more: '',
      });
      this.edit = false;
    } else if (mode === 'edit' && trip) {
      this.formGroup.setValue({
        id: trip._id,
        from: trip.from,
        to: trip.to,
        started_at: moment(trip.started_at).startOf('day').format('YYYY-MM-DD'),
        finished_at: moment(trip.finished_at).startOf('day').format('YYYY-MM-DD'),
        payment_at: moment(trip.payment_at).startOf('day').format('YYYY-MM-DD'),
        payment_method: trip.payment_method,
        value: trip.value,
        cpf: trip.user_id.cpf,
        more: trip.more || '',
      });
      this.edit = true;
    }
    this.modalService.open(content, { ariaLabelledBy: 'Modal Viagens' });
  }

  save(mode: string = 'create'): void {
    this.loading = true;
    if (mode === 'create') {
      this.tripService.store(this.formGroup.value).subscribe(
        (res) => {
          this.tripService.list().subscribe(
            (res) => {
              this.trips = res.data;
              this.loading = false;
              this.modalService.dismissAll();
            },
          );
        },
      );

    } else if (mode === 'save') {
      this.tripService.update(this.formGroup.value, this.formGroup.value.id).subscribe(
        (res) => {
          this.tripService.list().subscribe(
            (res) => {
              this.trips = res.data;
              this.loading = false;
              this.modalService.dismissAll();
            },
          );
        },
      );
    }
  }


  paginate() {
    this.page++;

    this.tripService.list(this.page).subscribe(
      (res) => {
        if (!res.data) {
          this.disablePaginate = true;
        }
        res.data.forEach((el) => {
          this.trips.push(el);
        });
      },
      (err) => {
        this.disablePaginate = true;
      }
    );
  }

}

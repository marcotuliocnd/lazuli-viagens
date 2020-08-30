import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './../../../services/auth.service';
import { IUser } from './../../../interfaces/User';
import { TestimonialService, Data } from './../services/testimonials.service';


@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  testimonials: Data[] = [];
  user: IUser;
  edit: boolean;
  loading: boolean;
  formGroup: FormGroup;
  nextPage: boolean;
  formData: FormData = new FormData();

  page = 1;
  paginating: boolean = false;
  disablePaginate: boolean = false;

  constructor(
    private testimonialService: TestimonialService,
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.user = this.authService.getUser();
    console.log(this.user?.role?.slug !== 'admin')
    this.formGroup = this.formBuilder.group({
      id: '',
      title: '',
      description: '',
    });
  }

  ngOnInit(): void {
    this.testimonialService.list().subscribe(
      (res) => {
        this.testimonials = res.data;
      },
    );
  }

  getDate(datetime: string): string {
    return moment(datetime).format('DD/MM/YYYY');
  }

  openModal(content, mode: string = 'create', testimonial: Data = null) {
    this.formData.delete('photo');
    this.formData.delete('title');
    this.formData.delete('description');

    if (mode === 'create') {
      this.formGroup.setValue({
        id: '',
        title: '',
        description: '',
      });
      this.edit = false;
    } else if (mode === 'edit' && testimonial) {
      this.formGroup.setValue({
        id: testimonial._id,
        title: testimonial.title,
        description: testimonial.description,
      });
      this.edit = true;
    }
    this.modalService.open(content, { ariaLabelledBy: 'Modal Viagens' });
  }

  save(mode: string = 'create', id = null): void {
    this.loading = true;
    this.formData.append('title', this.formGroup.value.title);
    this.formData.append('description', this.formGroup.value.description);
    if (mode === 'create') {
      this.testimonialService.store(this.formData).subscribe(
        (res) => {
          this.testimonialService.list().subscribe(
            (res) => {
              this.testimonials = res.data;
              this.loading = false;
              this.modalService.dismissAll();
            },
          );
        },
      );

    } else if (mode === 'save') {
      this.testimonialService.update(this.formGroup.value.id, this.formData).subscribe(
        (res) => {
          this.testimonialService.list().subscribe(
            (res) => {
              this.testimonials = res.data;
              this.loading = false;
              this.modalService.dismissAll();
            },
          );
        },
      );
    }
  }

  delete(): void {
    this.loading = true;
    this.testimonialService.delete(this.formGroup.value.id).subscribe(
      (res) => {
        this.testimonialService.list().subscribe(
          (res) => {
            this.testimonials = res.data;
            this.loading = false;
            this.modalService.dismissAll();
          },
        );
      }
    )
  }

  onPhotoUpload(event) {
    const photo = event.target.files[0] || null;
    this.formData.append('photo', photo);
  }

}

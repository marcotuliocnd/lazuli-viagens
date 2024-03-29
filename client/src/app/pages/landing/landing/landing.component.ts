import { TestimonialService, Data } from './../../core/services/testimonials.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  contactForm: FormGroup;
  testmonials: Data[];

  constructor(private formBuilder: FormBuilder, public router: Router, private contact: ContactService, private toastr: ToastrService, private testimonialService: TestimonialService) {
    this.contactForm = this.formBuilder.group({
      name: '',
      email: '',
      phone: '',
      city: '',
      destine: '',
      referer: '',
      adults: '',
      kids: '',
      babys: '',
      mode: '1',
      goDate: '',
      backDate: '',
      message: '',
    });
  }

  ngOnInit(): void {
    this.testimonialService.list().subscribe(
      (res) => {
        this.testmonials = res.data;
      }
    )
  }

  onDateSelect(event, mode: string) {
    if (mode === 'go') {
      this.contactForm.patchValue({ goDate: moment(event).toISOString() });
    } else if (mode === 'back') {
      this.contactForm.patchValue({ backDate: moment(event).toISOString() });
    }
  }

  sendForm() {
    this.contact.send(this.contactForm.value).subscribe(
      (res) => {
        this.contactForm.reset()
        this.toastr.success('E-mail enviado com sucesso');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao enviar o e-mail');
      }
    );
    console.log(this.contactForm.value);
  }

}

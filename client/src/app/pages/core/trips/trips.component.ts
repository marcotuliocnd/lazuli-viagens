import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getDate(): string {
    return moment().format('DD/MM/YYYY');
  }

}

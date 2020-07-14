import { TripService, Data } from './../services/trips.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trips: Data[] = [];

  constructor(private tripService: TripService) { }

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

}

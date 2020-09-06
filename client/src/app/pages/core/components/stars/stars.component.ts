import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input() starNumbers: string = '1';

  filledStars: number[] = [];
  blankStars: number[] = [];

  constructor() { }

  ngOnInit(): void {
    
    if (this.starNumbers) {
      const stars = parseInt(this.starNumbers, 10);

      for (let i = 0; i < stars; i++) {
        this.filledStars.push(i);
      }

      const blank = 5 - stars;


      for (let i = 0; i < blank; i++) {
        this.blankStars.push(i);
      }
    }
  }

}

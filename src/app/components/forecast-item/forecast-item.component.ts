import { Component, Input, OnInit } from '@angular/core';
import { ForeCastItem } from 'app/models/fore-cast-item.model';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.css']
})
export class ForecastItemComponent implements OnInit {

  constructor() { }

  @Input() data: ForeCastItem

  ngOnInit(): void {
  }

}

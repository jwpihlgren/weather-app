import { CurrentItem } from 'app/models/current-item.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-item',
  templateUrl: './current-item.component.html',
  styleUrls: ['./current-item.component.css']
})
export class CurrentItemComponent implements OnInit {

  constructor() { }

  @Input() data: CurrentItem

  ngOnInit(): void {
  }

}

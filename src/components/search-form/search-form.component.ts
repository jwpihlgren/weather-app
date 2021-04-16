import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor() { }

  @Input() loading: boolean = false;
  locationList$: Observable<any[]> = new Observable<any[]>();


  ngOnInit(): void {
  }

}

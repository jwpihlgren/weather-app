import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor() { }

  @Input() hasFocus: boolean = false;
  @Output() focusRequest$: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() locationList: any[] = [];
  @Output() locationRequest$: EventEmitter<string> = new EventEmitter<string>();

  searchControl: FormControl = new FormControl('');
  @Output() weatherRequest$: EventEmitter<Event> = new EventEmitter<Event>();

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.searchControl.valueChanges.pipe(filter(value => value.length >= 3), 
    debounceTime(100), 
    distinctUntilChanged())
    .subscribe(value => {
      this.locationRequest$.emit(value);
    });
  }

   onFocus(event: Event): void {
    if(event.type === 'focus') this.hasFocus = true;
    if(event.type === 'blur') this.hasFocus = false;
    /* this.focusRequest$.emit(this.hasFocus); */
  }

  onWeatherRequest(event: any): void {
    console.log(event.type)
    event.preventDefault();
    this.weatherRequest$.emit(event);
    this.searchControl.setValue(event.target.id);
    this.hasFocus = false;

  }

 

}

import { Component, Input, OnInit } from '@angular/core'
import { ForecastModel } from 'app/models/forecast.model'


@Component({
    selector: 'app-forecast-item',
    templateUrl: './forecast-item.component.html',
    styleUrls: ['./forecast-item.component.css'],
})
export class ForecastItemComponent implements OnInit {
    constructor() {}

    @Input() data: ForecastModel
    @Input() units: any
    @Input() loading: boolean = false;

    ngOnInit(): void {}
}

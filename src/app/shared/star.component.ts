import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

    static readonly INITIAL_RATING = 0;
    static readonly INITIAL_CROP_WIDTH = 75;

    @Input() rating = StarComponent.INITIAL_RATING;
    @Output() ratingClicked = new EventEmitter<string>();

    cropWidth = StarComponent.INITIAL_CROP_WIDTH;

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75 / 5;
    }

    notify(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}
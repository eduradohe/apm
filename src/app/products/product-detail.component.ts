import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private static readonly PAGE_TITLE = 'Product Details'

  private readonly _pageTitle: string;

  constructor() {
    this._pageTitle = ProductDetailComponent.PAGE_TITLE;
  }

  get pageTitle(): string {
    return this._pageTitle;
  }

  ngOnInit(): void {
  }

}

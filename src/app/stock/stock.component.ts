//Importing components necessary for stock page
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Stock } from '../models/stock';
import { StockPrice } from '../models/stock-price';

import { StockService } from '../services/stock.service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService, Ng4LoadingSpinnerService]
})

//Creating class for stock page
export class StockComponent implements OnInit {
  //Variable declaration
  sub: any;
  userId: number;
  stocks: Stock[] = [];
  stockPrice: StockPrice[] = [];
  stocksToDisplay: StockPrice[] = [];
  successMessage: string = "Whoa, your stock details are safe with us!";
  errorMessage: string = "Err, there has been an issue. But don't worry, we are working on it.";
  existsMessage: string = "Looks like we are already tracking this stock!";
  showSuccess: boolean = false;
  showError: boolean = false;
  showExists: boolean = false;
  page: number = 1;
  totalLength: number;

  //Constructor initialization
  constructor(private route: ActivatedRoute, private stockService: StockService, private loadingSpinner: Ng4LoadingSpinnerService, private elementRef: ElementRef) { }

  //Helper method to construct stock object
  constructStock(symbol: string): Stock {
    let stock = new Stock();
    stock.stockSymbol = symbol;
    stock.userId = this.userId;
    return stock;
  }

  //Add new stock 
  addStockForUser(form: NgForm) {
    let stock: Stock = form.value;
    stock.userId = this.userId;
    this.stockService.addStock(stock)
      .subscribe((response) => {
        this.resetMessages();
        if (response.json() === "Already Exists") {
          this.showExists = true;
          this.loadingSpinner.hide();
        } else {
          this.showSuccess = true;
          form.reset();
          this.loadingSpinner.hide();
        }

      }, (error) => {
        this.showError = true;
        this.loadingSpinner.hide();
      });
  }

  //Get stock for users
  getStocksForUser() {
    this.loadingSpinner.show();
    this.stockService.getStockForUser(this.userId)
      .subscribe((response) => {
        this.stocks = [];
        this.stocks = response.json();
        console.log(this.stocks);
        if(this.stocks.length > 0)
          this.getStockPrice();
          else{
            this.loadingSpinner.hide();
          }
        //this.formatDate();
      }, (error) => {

      });
  }

//Format date for pretty display
  formatDate(): string {
    let date = new Date();
    let year = date.getFullYear().toString();
    console.log(year);
    let month = (date.getMonth() + 1).toString();;
    if ((date.getMonth() + 1) < 10)
      month = "0" + month;
    console.log(month);
    let day = date.getDate().toString();
    console.log(day);
    let formattedDate = year + "-" + month + "-" + day;
    console.log(formattedDate);
    return formattedDate;
  }

//Delete stock on the go
  deleteStockDynamically(stockMappingId: number) {
    this.stockService.deleteStock(stockMappingId)
      .subscribe((response) => {

      }, (error) => {

      });
  }

//Delete stock
  deleteStock(stockMappingId: number) {
    this.stockService.deleteStock(stockMappingId)
      .subscribe((Response) => {
        this.stocks = this.stocks.filter(stock => stock.stockMappingId !== stockMappingId);
        this.stocksToDisplay = this.stocksToDisplay.filter(stock => stock.stockMappingId !== stockMappingId);
      }, (error) => {
      });
  }

//Get stock price
  getStockPrice() {
    this.stockPrice = [];
    this.stocks.forEach((stock) => {
      this.stockService.getStockPrice(stock.stockSymbol)
        .subscribe((response) => {

          let responseObj: StockPrice = response.json();
          let errorMessage = responseObj["Error Message"];
          if (errorMessage !== undefined) {
            this.deleteStock(stock.stockMappingId);
          }
          else {
            let stockPrices = responseObj["Time Series (Daily)"];
            if (stockPrices !== undefined) {
              let lastPrice = stockPrices[this.formatDate()];
              if(lastPrice === undefined){
                lastPrice = stockPrices["2018-04-20"];
              }
              if (lastPrice !== undefined) {
                let parsedStockObj = new StockPrice();
                parsedStockObj.currentPrice = lastPrice["1. open"];
                parsedStockObj.highPrice = lastPrice["2. high"];
                parsedStockObj.lowPrice = lastPrice["3. low"];
                parsedStockObj.stockMappingId = stock.stockMappingId;
                parsedStockObj.symbol = stock.stockSymbol;
                this.stockPrice.push(parsedStockObj);
                this.changePage(1);
              }
            }
          }
        }, (error) => {
        });
    });
  }

//Reset messages
  resetMessages() {
    this.showError = false;
    this.showSuccess = false;
    this.showExists = false;
  }

//Pagination
  changePage(pageNumber) {
    let start = pageNumber * 10 - 9 - 1;
    let end = pageNumber * 10;
    this.stocksToDisplay = this.stockPrice.slice(start, end);
    this.totalLength = this.stocksToDisplay.length;
    console.log(this.stocksToDisplay);
    this.loadingSpinner.hide();
  }

//Close pop-up
  closeModal() {
    this.resetMessages();
    this.getStocksForUser();
  }

  refresh() {
    this.getStocksForUser();
  }

//Initializing page
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getStocksForUser();
    });
  }

   ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.minHeight = "100vh";
    this.elementRef.nativeElement.ownerDocument.body.style.background = "linear-gradient(#fff,#ccf5ff)";
  }

}

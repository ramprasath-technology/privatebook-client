import { Component, OnInit } from '@angular/core';
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
export class StockComponent implements OnInit {
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
  constructor(private route: ActivatedRoute, private stockService: StockService, private loadingSpinner: Ng4LoadingSpinnerService) { }


  constructStock(symbol: string): Stock {
    let stock = new Stock();
    stock.stockSymbol = symbol;
    stock.userId = this.userId;
    return stock;
  }

  addStockForUser(form: NgForm) {
    let stock: Stock = form.value;
    stock.userId = this.userId;
    this.stockService.addStock(stock)
      .subscribe((response) => {
        this.resetMessages();
        if (response.json() === "Already Exists") {

          this.showExists = true;
        } else {
          this.showSuccess = true;
          form.reset();
        }

      }, (error) => {
        this.showError = true;
      });
  }

  getStocksForUser() {
    this.loadingSpinner.show();
    this.stockService.getStockForUser(this.userId)
      .subscribe((response) => {
        this.stocks = [];
        this.stocks = response.json();
        this.getStockPrice();
        //this.formatDate();
      }, (error) => {

      });
  }

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

  deleteStockDynamically(stockMappingId: number) {
    this.stockService.deleteStock(stockMappingId)
      .subscribe((response) => {

      }, (error) => {

      });
  }

  deleteStock(stockMappingId: number) {
    this.stockService.deleteStock(stockMappingId)
      .subscribe((Response) => {
        this.stocks = this.stocks.filter(stock => stock.stockMappingId !== stockMappingId);
        this.stocksToDisplay = this.stocksToDisplay.filter(stock => stock.stockMappingId !== stockMappingId);
      }, (error) => {
      });
  }

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
              //let lastPrice = stockPrices[this.formatDate()];
              let lastPrice = stockPrices["2018-04-13"];
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

  resetMessages() {
    this.showError = false;
    this.showSuccess = false;
    this.showExists = false;
  }

  changePage(pageNumber) {
    let start = pageNumber * 10 - 9 - 1;
    let end = pageNumber * 10;
    this.stocksToDisplay = this.stockPrice.slice(start, end);
    this.totalLength = this.stocksToDisplay.length;
    this.loadingSpinner.hide();
  }

  closeModal() {
    this.resetMessages();
    this.getStocksForUser();
  }

  refresh() {
    this.getStocksForUser();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getStocksForUser();
    });
  }

}

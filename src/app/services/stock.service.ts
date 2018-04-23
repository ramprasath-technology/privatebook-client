import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Common } from '../models/common';
import { Stock } from '../models/stock';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  //Get stocks for user
  getStockForUser(userId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks/StocksForUser/${userId}`;
    return this.http.get(completeUrl);
  }

  //Get stock price
  getStockPrice(symbol: string){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks/StockValue/${symbol}`;
    return this.http.get(completeUrl);
  }

  //Add stock for user
  addStock(stock: Stock){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks`;
    return this.http.post(completeUrl, stock);
  }

  //Delete particular stock
  deleteStock(stockId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks/${stockId}`;
    return this.http.delete(completeUrl);
  }
}

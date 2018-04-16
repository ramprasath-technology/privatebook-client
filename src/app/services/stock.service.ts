import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Common } from '../models/common';
import { Stock } from '../models/stock';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getStockForUser(userId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks/StocksForUser/${userId}`;
    return this.http.get(completeUrl);
  }

  getStockPrice(symbol: string){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks/StockValue/${symbol}`;
    return this.http.get(completeUrl);
  }

  addStock(stock: Stock){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks`;

    return this.http.post(completeUrl, stock);
  }

  deleteStock(stockId: number){
    let url = Common.BASE_API_URL;
    let completeUrl = `${url}api/stocks/${stockId}`;
    return this.http.delete(completeUrl);
  }
}

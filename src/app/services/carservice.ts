import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Car } from '../domain/car';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import  { Page } from '../domain/page';
import { Responses } from '../domain/responses';

@Injectable()
export class CarService {
    actionUrl = "http://localhost:8080/api/cars";
    pageactionUrl = "http://localhost:8080/api/paginatedcar";
    
    constructor(private http: HttpClient) {}
    
    getCarsSmall() {
        return this.http.get<any>('assets/data/cars-small.json')
            .toPromise()
            .then(res => <Car[]> res.data)
            .then(data => data);
    }

    getAllCars(): Observable<any[]> {
        return this.http.get<any[]>(this.pageactionUrl);
    }

    getAllPageCars(data: Page): Observable<Responses[]> {
        return this.http.get<Responses[]>(this.pageactionUrl+"?page="+data.RowNumber+"&size="
        +data.PageSize+"&sort="+data.OrderColumn);
    }
}

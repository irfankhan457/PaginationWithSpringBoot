import {Component, OnInit} from '@angular/core';
import { Car } from './domain/car';
import { CarService} from './services/carservice';
import { Response } from './domain/jsonResponse';
import  { Page } from './domain/page';
import { Responses } from './domain/responses';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CarService]
})
export class AppComponent implements OnInit{
    
    displayDialog: boolean;
    
    car: Car = new PrimeCar();
    
    selectedCar: Car;
    
    newCar: boolean;
    
    cars: Car[];

    cols: any[];
    
    totalRecords: number;

    datasource: Car[];

    loading: boolean;

    constructor(private carService: CarService) { }
    
    ngOnInit() {
        this.carService.getAllCars().subscribe(value => {
            this.datasource = value; 
        });

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
    
    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }
    
    save() {
        const cars = [...this.cars];
        if (this.newCar) {
            cars.push(this.car);
        } else {
            cars[this.findSelectedCarIndex()] = this.car;
        }
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }
    
    delete() {
        const index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val, i) => i != index);
        this.car = null;
        this.displayDialog = false;
    }
    
    onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }
    
    cloneCar(c: Car): Car {
        const car = new PrimeCar();
        for (const prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }
    
    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }

    paginate(event) {
       // event.first = this.cars.
      //  event.rows = this.totalRecords;
       // event.page = this.cars;
       // event.pageCount = this.cars;
    }


    loadCarsLazy(event) {
        this.loading = true;

        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            if (this.datasource) {
              //  this.cars = this.datasource.slice(event.first, (event.first + event.rows));
                this.loading = false;
            }
        }, 1000);
    }






    patientFilterModel: Page = {PageSize: 0, RowNumber: 0, OrderColumn: '', OrderBy: ''};
    patientModel : Responses = {content: [], total: 0};
    paitientListing
loadPatientListing(event) {
    console.log(event);
    this.patientFilterModel.PageSize = event.rows;
    this.patientFilterModel.RowNumber = event.first/20;
    this.patientFilterModel.OrderColumn = event.sortField;

    if (event.sortOrder == 1) {
        this.patientFilterModel.OrderBy = "asc";
    }
    else {
        this.patientFilterModel.OrderBy = "desc";
    }
    this.carService.getAllPageCars(this.patientFilterModel).subscribe(
        data => {
            console.log(data);
            this.patientModel.content = data;
           // this.cars = data;
           //this.paitientListing = this.patientModel._ListPatientListing;
            this.totalRecords = data.length;
        },
        error => {
            this.loading = false;
        }
    );
}




}

export class PrimeCar implements Car {
    
    constructor(public vin?, public year?, public brand?, public color?) {}
}

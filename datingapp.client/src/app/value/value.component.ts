import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Value {
  id: number;
  name: string;
}

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  //fetch some data from server and display on the webpage
  //values: Value[] = [];
  values : any;

  //we need http module so we need to inject it here
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  //get values from the api
  getValues(){
    //this.http.get<Value[]>("https://localhost:7088/api/values/").subscribe(response => {

    this.http.get("https://localhost:7088/api/values/").subscribe(response => {
      
      this.values = response;
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   *
   */
  constructor(private _http: HttpClient) {


  }
  title = 'client';

  public result :any;
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this._http.get("https://localhost:44352/api/Users")
      .subscribe(
        res => { this.result = res ; },
        err => { console.log(err) }
        )
  }
}

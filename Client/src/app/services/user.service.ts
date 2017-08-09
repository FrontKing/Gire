import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  private url = "https://gire.herokuapp.com";
  private headers = new Headers({ 'content-type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  public _isLoggedIn = false;

  constructor(private http: Http) { }

  private post(payload, url: string) {
    return this.http.post(url, payload, this.options)
      .map(res => res.json())
      .catch(this.handleErrorObservable)
  }
  public register(payload) {
    return this.post(payload, `${this.url}/register`);
  }

  public login(payload) {
    return this.post(payload, `${this.url}/login`)
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn;
  }





  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleErrorObservable(error: Response | any) {
    console.error(JSON.parse(error._body) || error);
    return Observable.throw(error.message || error);
  }
}

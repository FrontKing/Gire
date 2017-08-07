import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  
  private url = "https://gire.herokuapp.com/register";
  private headers = new Headers({ 'content-type': 'text/plain' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }
  
  public Register (payload) {
    return this.http.post(this.url, payload, this.options)
               .map(res => res.json())
               .catch(this.handleErrorObservable)
  }

  private extractData(res: Response) {
	  return res.json() || {};
  }

  private handleErrorObservable (error: Response | any) {
  	console.error(error.message || error);
  	return Observable.throw(error.message || error);
  }
}

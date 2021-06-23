import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isData = false;

login() {
  this.isData = true;
}

logout(){
  this.isData = false;
}
  isAuthenticated(): Promise<boolean>{
  return new Promise( resolve => {
    setTimeout( () => {
      resolve(this.isData)
    }, 1000)
})
}


  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get('assets/mock.json');
  }

}

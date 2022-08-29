import{HttpClient, HttpParams}from '@angular/common/http';
import {Injectable}from '@angular/core';
import {Observable} from 'rxjs';
import {ArduinoVarijable} from './ArduinoVarijable';
import { UpdateVar}from './UpdateVar';

@Injectable({
providedIn: 'root'
})
export class ArduinoVarijableService {

constructor(private http: HttpClient) { }
  private apiServerUrl='http://localhost:8080/ArduinoVarijable';


  public getArduinoVarijable(docName: string) : Observable<ArduinoVarijable>{
    return this.http.get<ArduinoVarijable>(`${this.apiServerUrl}/get/${docName}`);
  }

  public updateArduinoVarijable(updatevar: UpdateVar) : Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/update`,updatevar, { responseType: 'text' as 'json',});
  }


}

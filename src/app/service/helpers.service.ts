import { Injectable ,Type} from '@angular/core';
import { Observable, of, Subject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  public modalToDisplay = new Subject<any>();
  public subscriber =  this.modalToDisplay.asObservable();
  constructor() { }

  setModalDom = (data:any) =>{
    this.modalToDisplay.next(data);
  }
  // getModalDom(): Observable<any> {
  //   return this.modalToDisplay.asObservable();
  // }
}

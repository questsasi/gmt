import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class DataSharedService {
    private selectedDataSub = new BehaviorSubject<object>({}); 

    setDate(selectedDate: any) {
        console.log(selectedDate);
        this.selectedDataSub.next(selectedDate);
    }
    
    getDate(): Observable<any> {
        console.log(this.selectedDataSub);
        return this.selectedDataSub.asObservable();
    }
}
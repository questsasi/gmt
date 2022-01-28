import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class DataSharedService {
    private selectedDataSub = new BehaviorSubject<object>({});

    setDate(selectedDate: any) {
        this.selectedDataSub.next(selectedDate);
    }

    getDate(): Observable<any> {
        return this.selectedDataSub.asObservable();
    }
}
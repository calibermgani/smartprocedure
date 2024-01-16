import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';
import { environment_new } from 'src/environments/environment';
import { ColDef } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public apiUrls:any = environment_new.apiUrl;

    public currentMenu = new BehaviorSubject('sidemenu');
    currentSideMenu = this.currentMenu.asObservable();

    public columnDef = new BehaviorSubject<ColDef[]>([]);
    // public columnDef: BehaviorSubject<ColDef[]> = new BehaviorSubject<ColDef[]>([]);
    UpdatedColumnDef = this.columnDef.asObservable();

    public materialSummaryType = new BehaviorSubject<any>('');
    UpdatedMaterialValue = this.materialSummaryType.asObservable();

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.apiUrls}/users/authenticate`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    changeSideMenu(data:any){
      this.currentMenu.next(data);
    }

    UpdatingColumnDeffn(data:any)
    {
      this.columnDef.next(data);
    }

    UpdatingMaterialfn(data:any)
    {
      this.materialSummaryType.next(data);
    }


}

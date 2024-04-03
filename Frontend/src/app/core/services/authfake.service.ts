import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';
import { environment_new } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public apiUrls:any = environment_new.apiUrl;

    public currentMenu = new BehaviorSubject('sidemenu');
    currentSideMenu = this.currentMenu.asObservable();

    public showGridDetailedView = new BehaviorSubject(true);
    GridDetailedView_value = this.showGridDetailedView.asObservable();

    public selectedTabTypeSubject = new BehaviorSubject<String>('All Items');
    selectedTabTypeValue = this.selectedTabTypeSubject.asObservable();

    public AllItemsGridPayload = new BehaviorSubject<any>('');
    AllItemsPayload = this.AllItemsGridPayload.asObservable();

    public ReloadAllItemsGridData = new BehaviorSubject<any>('');
    ReloadGrid = this.ReloadAllItemsGridData.asObservable();

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { email, password })
            .pipe(map(user => {
              console.log(user);

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
    passingemail(data:any)
    {
      this.currentUserSubject.next(data);
    }

    changeViewType(data:any){
      this.showGridDetailedView.next(data);
    }

    changeTabView_AllItems(data:any){
      this.selectedTabTypeSubject.next(data);
    }

    PassAllItemsGridPayload(data:any){
      this.AllItemsGridPayload.next(data);
    }

    ReloadAllItemsGrid(data:boolean){
      this.ReloadAllItemsGridData.next(data);
    }
}

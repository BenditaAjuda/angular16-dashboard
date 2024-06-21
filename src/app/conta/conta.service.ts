import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { ReplaySubject, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Registro } from '../shared/models/registro';
import { Login } from '../shared/models/login';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private http: HttpClient,
    private router: Router) { }

    refreshUser(jwt: string | null){
      if(jwt === null){
        this.userSource.next(null);
        return of(undefined);
      }

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + jwt);

      return this.http.get<User>(`${environment.baseUrl}conta/refresh-user-token`, {headers}).pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      )
    }

      registro(registro: Registro) {
        return this.http.post(`${environment.baseUrl}conta/register`, registro);
      }

      login(login: Login) {
        return this.http.post<User>(`${environment.baseUrl}conta/login`, login).pipe(
          map((user: User) => {
            if(user) {
              this.setUser(user);
            }
          })
        );
      }

      logout() {
        localStorage.removeItem(environment.userKey);
        this.userSource.next(null);
        this.router.navigateByUrl('/');
      }

      getJWT() {
        if (this.isLocalStorageAvailable) {
          const key = localStorage.getItem(environment.userKey);
          if(key){
            const user: User = JSON.parse(key);
            return user.jwt;
          }
            else{
              return null;
            }
        }
        else{
          return null;
        }
    }

      private setUser(user: User) {
        localStorage.setItem(environment.userKey, JSON.stringify(user));
        this.userSource.next(user);
      }

}
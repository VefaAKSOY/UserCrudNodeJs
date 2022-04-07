import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
const baseUrl = 'http://localhost:3000/api/users/';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(filters:any): Observable<User[]> {
    if(Object.keys(filters).length!=0){
    filters.query = (filters.query)? filters.query:"";
    filters.limit = (filters.limit)? filters.limit:"";
    filters.skip = (filters.skip)? filters.skip:"";
    filters.sort = (filters.sort)? filters.sort:"";
    filters.order = (filters.order)? filters.order:"";
  }
  console.log(filters);
    return this.http.get<User[]>(baseUrl, {params:filters
    });
  }
  createUser(data: any): Observable<any>{
    return this.http.post(baseUrl, data)
  }
}

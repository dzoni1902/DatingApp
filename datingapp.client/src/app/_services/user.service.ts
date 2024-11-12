import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getUsers(page?: number, itemsPerPage?: number, userParams?: any, likesParam?: any): Observable<PaginatedResult<User[]>> {

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();
  
    if (page != null) {
      params = params.append('pageNumber', page.toString());
    }
    if (itemsPerPage != null) {
      params = params.append('pageSize', itemsPerPage.toString());
    }
    if (userParams != null) {
      params = params.append('minAge', userParams.minAge.toString());
      params = params.append('maxAge', userParams.maxAge.toString());
      params = params.append('gender', userParams.gender.toString());
      params = params.append('orderBy', userParams.orderBy.toString());
    }

    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }
  
    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(    //this method allows access to rxjs operators, we want users from the response body and pagination info from headers
        map(response => {
          paginatedResult.result = response.body ?? []; // default to an empty array if body is null
          const paginationHeader = response.headers.get('Pagination');
          if (paginationHeader) {
            paginatedResult.pagination = JSON.parse(paginationHeader);
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: number): Observable<User> {

    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {

    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, photoId: number) {
                                                            //since post req, we are sending empty object in body
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + photoId + '/setMain', {});
  }

  deletePhoto(userId: number, photoId: number) {

    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId);
  }

  sendLike(userId: number, recipientId: number) {

    return this.http.post(this.baseUrl + 'users/' + userId + '/like/' + recipientId, {});
  }
}

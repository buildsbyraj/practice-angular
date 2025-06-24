import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  api_url = 'http://localhost:4100/'
  constructor(private http:HttpClient) { }

  getData(apiName?:any):Observable<any> {
    return this.http.get(`${this.api_url}${apiName ? apiName : ''}`).pipe();
  }

   get(apiName: any, params?: { searchText: string; page: number; limit: number; sortBy: string; sortOrder: string; filter: { [key: string]: any }; }): Observable<any> {
      
      console.log(params?.page,'fsadafdasasdf');
      let queryParams = `?search=${params?.searchText || ''}&page=${params?.page}&limit=${params?.limit}&sortBy=${params?.sortBy}&sortOrder=${params?.sortOrder}`;
  
  
  
      if (params?.filter) {
  
        const filterArray: string[] = [];
  
        Object.entries(params.filter).forEach(([key, value]) => {
          if (value !== '' && value !== null && value !== undefined) {
            filterArray.push(`${key}:${encodeURIComponent(value)}`);
          }
        });
  
        if (filterArray.length > 0) {
          queryParams += `&filter=${filterArray.join(',')}`;
        }
  
      }
      return this.http.get(`${this.api_url}${apiName}${queryParams}`);
    }

    addData(apiName:any,data?:any):Observable<any>{
      return this.http.post(`${this.api_url}${apiName}`,data)
    }

    updateData(apiName:any,id?:any,data?:any):Observable<any>{
      return this.http.post(`${this.api_url}${apiName}/${id}`,data)
    }
}

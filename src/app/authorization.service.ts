import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }
 intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
   //get token from localstorage
   let signedToken=localStorage.getItem("signedJwtToken");

   //if token is available add token to header of req object and forward it
   if(signedToken!=undefined){

    //attach jwt token to header of req obj
    let clonedReqObj=req.clone({
      setHeaders:{"authorization":"Bearer "+signedToken}
    })

    //forward req obj to next interceptor or backend
    return next.handle(clonedReqObj);
   }
   // if token is not available forward req object as it is
   else{
     return next.handle(req);
   }
 }
}

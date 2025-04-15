import { Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }

  // Get current user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/api/v1/auth/current-user`);
  }

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/api/v1/auth/login`, loginData);
  }

  // Login user and set token in localStorage
  public loginUser(token: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
    return true;
  }

  // Check if user is logged in
  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      let tokenStr = localStorage.getItem('token');
      return tokenStr !== undefined && tokenStr !== '' && tokenStr !== null;
    }
    return false;  // If running on the server, assume user is not logged in
  }

  // Get token
  public gettoken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Set user details
  public setUser(user: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  // Logout user
  public logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
    return true;
  }

  // Get user details
  public getUser() {
    if (isPlatformBrowser(this.platformId)) {
      let userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  // Set user role
  public setUSerRole(role: any) {
    if (isPlatformBrowser(this.platformId) && role) {
      localStorage.setItem("role", role);
    }
    return true;
  }

  // Get user role
  public getUSerRole() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role');
    }
    return null;
  }
}

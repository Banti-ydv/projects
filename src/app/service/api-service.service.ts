import { Injectable } from '@angular/core';
import { KeysServiceService } from './keys-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  token: any = localStorage.getItem('token');
  userId: any = localStorage.getItem('userId')
  // token: any = "Abc";
  headersWithOutAuth = new HttpHeaders({
    'Content-Type': 'application/json',
    'project_secret_key': this.keys.project_secret_key
  });
  headerWithAuth = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'project_secret_key': this.keys.project_secret_key,
    'request_by': this.userId,
    'Authorization' : `Bearer ${this.token}`
  });

    constructor(private keys: KeysServiceService, private http: HttpClient,private router: Router) {}


  signUp(userData: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.signUp, userData, { headers });
  }

  signIn(userData: any) {
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.signIn, userData, { headers });
  }
//project code start
  saveProject(project:any){
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveProject, project, { headers });
  }

  getProject(){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getProject, { headers });
  }

  getProjectById(project:any){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getProjectById, { headers });
  }

  updateProjectById(project:any){
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updateProjectById,project, { headers });
  }

  deleteProjectById(project:any){
    const headers = this.headerWithAuth;
    return this.http.delete(this.keys.deleteProjectById, { headers });
  }

  get_client_id(id:any){
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.get_client_id}`, { headers });
  }
  get_handel_by(id:any){
    const headers = this.headerWithAuth;
    return this.http.get(`${this.keys.get_handel_by}`, { headers });
  }
  updatedProjectStatus(project:any){
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updatedProjectStatus,project, { headers });
  }
  //project code end


  //task code start
  saveTask(task:any){
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveTask, task, { headers });
  }

  getTask(){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTask, { headers });
  }

  getTaskById(task:any){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTaskById, { headers });
  }

  updateTaskById(task: any){
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updateTaskById,task, { headers });
  }

  deleteTaskById(task:any){
    const headers = this.headerWithAuth;
    return this.http.delete(this.keys.deleteTaskById, { headers });
  }
  //task code end
  
  
  
  //TeamMember code start
  saveTeamMember(teamMember:any){
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveTeamMember, teamMember, { headers });
  }

  getTeamMember(){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTeamMember, { headers });
  }

  getTeamMemberById(teamMember:any){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getTeamMemberById, { headers });
  }

  updateTeamMemberById(teamMember:any){
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updateTeamMemberById,teamMember, { headers });
  }

  deleteTeamMemberById(teamMember:any){
    const headers = this.headerWithAuth;
    return this.http.delete(this.keys.deleteTeamMemberById, { headers });
  }
  //TeamMember code end



  //workStatus code start
  saveWorkStatus(workStatus:any){
    const headers = this.headerWithAuth;
    return this.http.post(this.keys.saveWorkStatus, workStatus, { headers });
  }

  getWorkStatus(){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getWorkStatus, { headers });
  }

  getWorkStatusById(workStatus:any){
    const headers = this.headerWithAuth;
    return this.http.get(this.keys.getWorkStatusById, { headers });
  }

  updateWorkStatusById(workStatus: any){
    const headers = this.headerWithAuth;
    return this.http.put(this.keys.updateWorkStatusById,workStatus, { headers });
  }

  deleteWorkStatusById(workStatus:any){
    const headers = this.headerWithAuth;
    return this.http.delete(this.keys.deleteWorkStatusById, { headers });
  }
  //workStatus code end


  //User Logged In code start
  getRole = localStorage.getItem('role')
  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === '' || token == null) {
      return false;
    }
    else {
      return true;
    }
  }
  //User Logged In code end
  

  saveCientRequirement(data:any){
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.saveCientRequirement, data, { headers });
  }
  bookTimeForMeeting(data:any){
    const headers = this.headersWithOutAuth;
    return this.http.post(this.keys.bookTimeForMeeting, data, { headers });
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/log-in']);
    window.location.reload();
  }
}
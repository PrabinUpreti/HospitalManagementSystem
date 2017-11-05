import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import  { ENV } from "../../env";

@Injectable()
export class ModifyService {

  constructor(private department:Http, private TestType:Http, private Test:Http, private router:Router) { }


  //THIS IS FOR DEPARTMENT 


  pushDepartment(departmentData){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.post(ENV.Request_URL+"/api/modify", departmentData, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }
  getDepartment(){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.get(ENV.Request_URL+"/api/modify", options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  updateDepartment(finalData){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let id = finalData.id;
    let url = ENV.Request_URL+"/api/modify/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.put(url, finalData, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }
  
  deleteDepartment(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/modify/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
  }


//THIS IS FOR TEST TYPE



  pushTestType(TestTypeData){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.TestType.post(ENV.Request_URL+"/api/testtype", TestTypeData, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }
  getTestType(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/testtype/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.TestType.get(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  updateTestType(finalData){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let id = finalData.id;
    console.log(id);
    let url = ENV.Request_URL+"/api/testtype/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.TestType.put(url, finalData, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }
  
  deleteTestType(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/testtype/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.TestType.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
  }




  //THIS IS FOR Test 


  pushTest(TestData){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.post(ENV.Request_URL+"/api/test", TestData, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }
  getTest(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log("This is Id" + id);
    let url = ENV.Request_URL+"/api/test/"+id;   
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.get(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  updateTest(finalData){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let id = finalData.id;
    let url = ENV.Request_URL+"/api/test/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.put(url, finalData, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }
  
  deleteTest(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/test/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
  }


  testDetails(testDetails){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/testdetails";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.post(url,testDetails,options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }
  getTestDetails(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log(id);
    let url = ENV.Request_URL+"/api/testdetails/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.get(url,options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);    
  }

  testDetailsEdit(testDetails){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log(testDetails)
    let url = ENV.Request_URL+"/api/testdetails/"+testDetails.id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.put(url,testDetails,options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);    
  }

  deleteTestDetials(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/testdetails/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.TestType.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);
  }

  getDoctorList(){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: false});
    return this.department.get(ENV.Request_URL+"/api/doctor", options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);    
  }

  putDoctor(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.post(ENV.Request_URL+"/api/doctor",id, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);     
  }


  commoncodes(){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/commoncodes";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.get(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }



  //THIS IS TO GET PATIENT DATA

  getPatient(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/getPatientData/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.get(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  getAllPatient(){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/getPatientData";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.get(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  getpatientFromDate(param){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/getpatientFromDate";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.post(url, param, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  deletePatient(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let url = ENV.Request_URL+"/api/getPatientData/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  updatePatient(param){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log(param)
    let id = param.id;
    let url = ENV.Request_URL+"/api/getPatientData/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.put(url, param, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  editDoctor(param){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log(param)
    let id = param.editableId;
    let url = ENV.Request_URL+"/api/doctor/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.put(url, param, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(10);
  }

  deleteDoctor(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    console.log(id)
    let url = ENV.Request_URL+"/api/doctor/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError)
    .retry(3);    
  }
  searchpatientbyName(id){
          let checkSection = ENV.setSection()
          if(checkSection == "sessionExpired"){
            this.router.navigate(['/']);            
          }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.department.get(ENV.Request_URL+"/api/search-by-name/"+id, options)
      .map(this.extractData)
      .catch(this.handleError);    
  }





  private extractData(res: Response) {
    let response = res.json();
    return response || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}

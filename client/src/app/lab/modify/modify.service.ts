import { Injectable } from '@angular/core';

import {Http, Response ,Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ModifyService {

  constructor(private department:Http, private TestType:Http, private Test:Http) { }


  //THIS IS FOR DEPARTMENT 


  pushDepartment(departmentData){
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.post("http://server.hms.com/api/modify", departmentData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  getDepartment(){
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.get("http://server.hms.com/api/modify", options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  updateDepartment(finalData){
    let id = finalData.id;
    let url = "http://server.hms.com/api/modify/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.put(url, finalData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  deleteDepartment(id){
    let url = "http://server.hms.com/api/modify/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError);
  }


//THIS IS FOR TEST TYPE



  pushTestType(TestTypeData){
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, withCredentials: true});
    return this.TestType.post("http://server.hms.com/api/testtype", TestTypeData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  getTestType(id){
    let url = "http://server.hms.com/api/testtype/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.TestType.get(url, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  updateTestType(finalData){
    let id = finalData.id;
    console.log(id);
    let url = "http://server.hms.com/api/testtype/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.TestType.put(url, finalData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  deleteTestType(id){
    let url = "http://server.hms.com/api/testtype/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.TestType.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError);
  }




  //THIS IS FOR Test 


  pushTest(TestData){
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.post("http://server.hms.com/api/test", TestData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  getTest(id){
    console.log("This is Id" + id);
    let url = "http://server.hms.com/api/test/"+id;   
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.get(url, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  updateTest(finalData){
    let id = finalData.id;
    let url = "http://server.hms.com/api/test/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.put(url, finalData, options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  deleteTest(id){
    let url = "http://server.hms.com/api/test/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.delete(url, options)
    .map(this.extractData)
    .catch(this.handleError);
  }


  testDetails(testDetails){
    let url = "http://server.hms.com/api/testdetails";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.post(url,testDetails,options)
    .map(this.extractData)
    .catch(this.handleError);
  }
  getTestDetails(id){
    console.log(id);
    let url = "http://server.hms.com/api/testdetails/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.Test.get(url,options)
    .map(this.extractData)
    .catch(this.handleError);    
  }

  getDoctorList(){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: false});
    return this.department.get("http://server.hms.com/api/doctor", options)
    .map(this.extractData)
    .catch(this.handleError);    
  }

  putDoctor(id){
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.post("http://server.hms.com/api/doctor",id, options)
    .map(this.extractData)
    .catch(this.handleError);     
  }


  commoncodes(){
    let url = "http://server.hms.com/api/commoncodes";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.get(url, options)
    .map(this.extractData)
    .catch(this.handleError);     
  }



  //THIS IS TO GET PATIENT DATA

  getPatient(id){
    let url = "http://server.hms.com/api/getPatientData/"+id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers,withCredentials: true});
    return this.department.get(url, options)
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

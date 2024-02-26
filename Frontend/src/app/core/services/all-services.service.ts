import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment_new } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  public payload:Object = {
    "token":"1a32e71a46317b9cc6feb7388238c95d",
  };
  public apiUrl: any = environment_new.apiUrl;
  constructor(private http : HttpClient,private toastr : ToastrService) { }

  AddTag(data:any){
    this.payload["tag_name"]=data;
    this.payload["created_by"]='1';
    console.log(this.payload);
    return this.http.post(`${this.apiUrl}/tags`,this.payload);
  }

  AddVendor(data:any){
    this.payload["VendorName"] = data.value.VendorName;
    this.payload["VendorEmail"] = data.value.VendorEmail;
    this.payload["VendorContactNo"] = data.value.VendorContactNo;
    this.payload["VendorAddress"] = data.value.VendorAddress;
    this.payload["status"] = data.value.Status;
    this.payload["ContactPerson"] = "";
    this.payload["Added_by"]="";
    console.log(this.payload);
    return this.http.post(`${this.apiUrl}/vendors`,this.payload);
  }

  AddCategoryfn(data:any){
    this.payload["name"] = data.value.CategoryName;
    this.payload["category_shortcode"] = data.value.CategorySubCode;
    this.payload["status"] = data.value.Status;
    this.payload["Added_by"]="1";
    return this.http.post(`${this.apiUrl}/categories`,this.payload);
  }

  AddSubCategoryfn(data:any){
    this.payload["sub_category_name"] = data.value.SubCategoryName;
    this.payload["category_id"] = "9";
    this.payload["status"] = data.value.status;
    this.payload["created_by"]="1";
    return this.http.post(`${this.apiUrl}/sub_categories`,this.payload);
  }

  Additemfn(data:any ){

  }
}

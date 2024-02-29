import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  constructor(private http : HttpClient,private toastr : ToastrService,private datePipe: DatePipe) {
    this.payload["token"]="1a32e71a46317b9cc6feb7388238c95d";
   }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  AddTag(data:any){
    this.payload["tag_name"]=data;
    this.payload["created_by"]='1';
    console.log(this.payload);
    return this.http.post(`${this.apiUrl}/tags/store`,this.payload);
  }

  AddVendor(data:any){
    this.payload["VendorName"] = data.value.VendorName;
    this.payload["VendorEmail"] = data.value.VendorEmail;
    this.payload["VendorContactNo"] = data.value.VendorContactNo;
    this.payload["VendorAddress"] = data.value.VendorAddress;
    this.payload["status"] = data.value.Status.label;
    this.payload["ContactPerson"] = "";
    this.payload["Added_by"]="";
    console.log(this.payload);

    return this.http.post(`${this.apiUrl}/vendors/store`,this.payload);
  }

  AddCategoryfn(data:any){
    this.payload["name"] = data.value.CategoryName;
    this.payload["category_shortcode"] = data.value.CategorySubCode;
    this.payload["status"] = data.value.Status;
    this.payload["Added_by"]="1";
    return this.http.post(`${this.apiUrl}/categories/store`,this.payload);
  }

  AddSubCategoryfn(data:any,index:any){
    this.payload["sub_category_name"] = data.value.SubCategoryName;
    this.payload["category_id"] = index;
    this.payload["status"] = data.value.status;
    this.payload["created_by"]="1";
    return this.http.post(`${this.apiUrl}/sub_categories/store`,this.payload);
  }

  Additemfn(data:any ){
    this.payload["item_number"] = data.value.ItemNumber;
    this.payload["item_name"] = data.value.ItemName;;
    this.payload["item_category_id"] = data.value.ItemCategory;
    this.payload["item_sub_category_id"] = data.value.subcategory;
    this.payload["item_barcode"] = data.value.Barcodes;
    this.payload["item_procedure_id"] = data.value.procedure;;
    this.payload["item_status"] = data.value.ItemStatus;
    this.payload["vendor_id"] = data.value.Vendor;
    this.payload["price"] = data.value.price;
    this.payload["size"] = data.value.size;
    this.payload["size_type"] = data.value.sizetype;
    this.payload["unit"] = data.value.Unit;
    this.payload["store_qty"] = data.value.storeqty;
    this.payload["cabinet_qty"] = data.value.CabinetQty;
    this.payload["expired_date"] = this.formatDate(data.value.ExpiryDate);
    // this.payload["expired_date"] = data.value.ExpiryDate;
    this.payload["min_level"] = data.value.MinStoreQty;
    this.payload["cat_no"] = data.value.CatNo;
    this.payload["lot_no"] = data.value.LotNo;
    this.payload["item_description"] = data.value.Itemdescription;
    this.payload["item_notes"] = data.value.Itemnotes;
    this.payload["tag"] = data.value.Tags;
    this.payload["image_url"] = '';
    this.payload["created_by"]='1'; data.value.ItemNumber;
    return this.http.post(`${this.apiUrl}/items/store`,this.payload);
  }

  UpdateItemfn(data:any){
    this.payload["item_number"] = data.value.ItemNumber;
    this.payload["item_name"] = data.value.ItemName;;
    this.payload["item_category_id"] = data.value.ItemCategory;
    this.payload["item_sub_category_id"] = data.value.subcategory;
    this.payload["item_barcode"] = data.value.Barcodes;
    this.payload["item_procedure_id"] = data.value.procedure;
    this.payload["item_status"] = data.value.ItemStatus;
    this.payload["vendor_id"] = data.value.Vendor;
    this.payload["price"] = data.value.price;
    this.payload["size"] = data.value.size;
    this.payload["size_type"] = data.value.sizetype;
    this.payload["unit"] = data.value.Unit;
    this.payload["store_qty"] = data.value.storeqty;
    this.payload["cabinet_qty"] = data.value.CabinetQty;
    this.payload["expired_date"] = this.formatDate(data.value.ExpiryDate);
    // this.payload["expired_date"] = data.value.ExpiryDate;
    this.payload["min_level"] = data.value.MinStoreQty;
    this.payload["cat_no"] = data.value.CatNo;
    this.payload["lot_no"] = data.value.LotNo;
    this.payload["item_description"] = data.value.Itemdescription;
    this.payload["item_notes"] = data.value.Itemnotes;
    this.payload["tag"] = data.value.Tag;
    this.payload["image_url"] = '';
    this.payload["created_by"]='1'; data.value.ItemNumber;
    return this.http.post(`${this.apiUrl}/items/update`,this.payload);
  }

  ViewItem(data:any){
    this.payload["item_id"] = data;
    return this.http.post(`${this.apiUrl}/items/show`,this.payload);
  }

  ViewVendor(data:any){
    this.payload["vendor_id"] = data.id;
    return this.http.post(`${this.apiUrl}/vendors/show`,this.payload);
  }

  DeleteItem(data:any){
    this.payload["item_id"] = [data];
    this.payload["deleted_by"] = "1";
    return this.http.post(`${this.apiUrl}/items/destroy`,this.payload);
  }

  GetCategory(data:any){
    this.payload["category_id"] = data.id;
    return this.http.post(`${this.apiUrl}/categories/show`,this.payload);
  }

  GetSubCategory(data:any){
    this.payload["sub_category_id"] = data;
    return this.http.post(`${this.apiUrl}/sub_categories/show`,this.payload);
  }

  GetAllSubCategory(){
    return this.http.post(`${this.apiUrl}/sub_categories/index`,this.payload)
  }

  EditCategory(data:any,category_id:any){
    console.log(data);
    console.log(category_id);
    this.payload["category_id"] = category_id;
    this.payload["name"] = data.value.CategoryName;
    this.payload["category_shortcode"] = data.value.CategorySubCode;
    this.payload["status"] = data.value.Status;
    this.payload["added_by"] = "1";
    return this.http.post(`${this.apiUrl}/categories/update`,this.payload)
  }

  EditSubCategory(data:any,category_id:any,sub_category_index:any){
    this.payload["sub_category_id"] = sub_category_index;
    this.payload["sub_category_name"] = data.value.SubCategoryName;
    this.payload["category_id"] = category_id;
    this.payload["status"] = data.value.status;
    this.payload["updated_by"] = "1";
    return this.http.post(`${this.apiUrl}/sub_categories/update`,this.payload);
  }

  EditVendor(data:any,vendor_id:any){
    console.log(data);
    this.payload["vendor_id"] = vendor_id;
    this.payload["VendorName"] = data.value.VendorName;
    this.payload["VendorEmail"] = data.value.VendorEmail;
    this.payload["VendorContactNo"] = data.value.VendorContactNo;
    this.payload["VendorAddress"] = data.value.VendorAddress;
    this.payload["status"] = data.value.Status;
    this.payload["ContactPerson"] = "";
    return this.http.post(`${this.apiUrl}/vendors/update`,this.payload);
  }

  DeleteCategory(data:any){
    this.payload["category_id"] = data;
    return this.http.post(`${this.apiUrl}/categories/destroy`,this.payload);
  }

  DeleteVendor(data:any){
    this.payload["vendor_id"] = data;
    return this.http.post(`${this.apiUrl}/vendors/destroy`,this.payload);
  }

  DeleteSubCategory(data:any){
    this.payload["sub_category_id"] = data;
    this.payload["deleted_by"] = "1";
    return this.http.post(`${this.apiUrl}/sub_categories/destroy`,this.payload);
  }

  ItemCategoryOptions(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/categories/item_category`,payload);
  }

  ItemSubCategoryOptions(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_category_id"] = data;
    return this.http.post(`${this.apiUrl}/categories/item_sub_category`,payload);
  }

  VendorOptions(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/vendors/item_vendor`,payload);
  }

  TagsOptions(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/tags/item_tags`,payload);
  }

  ProcedureOptions(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/procedures/index`,payload);
  }

  GetOverAllList(){
    return this.http.post(`${this.apiUrl}/categories/index`,this.payload);
  }

  GetAllItemsGrid(){
    return this.http.post(`${this.apiUrl}/items/index`,this.payload);
  }

  GetVendorList(){
    return this.http.post(`${this.apiUrl}/vendors/index`,this.payload);
  }

}

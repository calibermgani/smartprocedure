import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment_new } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {
  private checkboxStates: boolean[] = [];
  getStateLength: any;
  private patientData: any;
  private patientDataKey = 'patientData';

  public payload:Object = {
    "token":"1a32e71a46317b9cc6feb7388238c95d",
  };
  public apiUrl: any = environment_new.apiUrl;
  public checkLists: any = environment_new.getCheckListData;
  public checkBoxesKizin: any = environment_new.kiziCheckBoxesData;
  public kiziCheckBoxesTimeLine: any = environment_new.kiziCheckBoxesTimeLine;
  public materialdashboard : any = environment_new.materialdashboard;
  public clinicalDiagnosis : any = environment_new.clinicalDiagnosis;
  public clinicalHistoryIndication : any = environment_new.clinicalHistoryIndication;
  public saveData1 : any = environment_new.saveData;
  public saveDataIndication1 : any = environment_new.saveDataIndication;
  public clinicalPostDiagnosis : any = environment_new.clinicalPostDiagnosis;
  public saveDataPostDiagnosis1 : any = environment_new.saveDatapostDiagnosis;
  public getLabDetails1 : any = environment_new.getLabDetails;
  public saveDataLab1 : any = environment_new.saveDataLab;
  public getMediationDetails : any = environment_new.getMediationDetails;
  public saveMediationData1 : any = environment_new.saveMediationData;
  public saveVitalDetails1 : any = environment_new.saveVitalDetails;
  public editVitals1 : any = environment_new.editVitals;
  public savePrecautions1 : any = environment_new.savePrecautions;
  public editPrecautions1 : any = environment_new.editPrecautions;
  constructor(private http : HttpClient,private toastr : ToastrService,private datePipe: DatePipe) {
   }

   checklist : any ;
   updateCheckboxState(index: number, state: boolean, length:number): void {
    this.checklist = length;
    if (this.checkboxStates.length !== length) {
      this.checkboxStates = new Array(length).fill(false);
    }
    this.checkboxStates[index] = state;
  }

  areAllChecked(): boolean {
    return this.checkboxStates.every(state => state) && this.checkboxStates.length == this.checklist;
  }

  clearCheckBoxes(){
    this.checkboxStates = [];
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  AddTag(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["tag_name"]=data;
    payload["created_by"]='1';
    return this.http.post(`${this.apiUrl}/tags/store`,payload);
  }

  UpdateTags(item_id:any,data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"] = item_id;
    payload["tags"] = data.value.Tags;
    return this.http.post(`${this.apiUrl}/items/item_tags_update`,payload);
  }

  AddVendor(data:any,reasonValue:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["VendorName"] = data.value.VendorName;
    payload["VendorEmail"] = data.value.VendorEmail;
    payload["VendorContactNo"] = data.value.VendorContactNo;
    payload["VendorAddress"] = data.value.VendorAddress;
    // payload["status"] = data.value.Status.label;
    if(data.value.Status){
      payload["status"] = data.value.Status;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["ContactPerson"] = "";
    payload["Added_by"]="1";
    payload["inactive_by"]="1";
    payload["inactive_reason"]=reasonValue.reason2;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/vendors/store`,payload);
  }

  AddCategoryfn(data:any,reasonValue:any){
    let payload:Object = {};
    console.log(reasonValue);

    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["name"] = data.value.CategoryName;
    payload["category_shortcode"] = data.value.CategorySubCode;
    if(data.value.Status){
      payload["status"] = data.value.Status;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["added_by"]="1";
    payload["inactive_by"]="1";
    payload["inactive_reason"]=reasonValue.reason2;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/categories/store`,payload);
  }

  AddSubCategoryfn(data:any,index:any,reasonValue:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["sub_category_name"] = data.value.SubCategoryName;
    payload["category_id"] = index;
    // payload["status"] = data.value.status;
    if(data.value.Status){
      payload["status"] = data.value.status;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["created_by"]="1";
    payload["inactive_by"]="1";
    payload["inactive_reason"]=reasonValue.reason2;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/sub_categories/store`,payload);
  }

  Additemfn(data:any,image:any,reasonValue:any){
    let formData = new FormData;
    let payload:any = {};
    console.log(data.value);
    console.log(image);
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_number"] = data.value.ItemNumber ? data.value.ItemNumber : '';
    payload["item_name"] = data.value.ItemName ? data.value.ItemName : '';
    payload["item_category_id"] = data.value.ItemCategory ? data.value.ItemCategory : '';
    payload["item_sub_category_id"] = data.value.subcategory ? data.value.subcategory : '';
    payload["item_barcode"] = data.value.Barcodes ? data.value.Barcodes : '';
    payload["item_procedure_id"] = data.value.procedure;
    payload["vendor_id"] = data.value.Vendor;
    payload["price"] = data.value.price;
    payload["size"] = data.value.size;
    payload["size_type"] = data.value.sizetype;
    payload["unit"] = data.value.Unit;
    payload["store_qty"] = data.value.storeqty;
    payload["cabinet_qty"] = data.value.CabinetQty;
    payload["expired_date"] = this.formatDate(data.value.ExpiryDate);
    payload["min_level"] = data.value.MinStoreQty;
    payload["cat_no"] = data.value.CatNo;
    payload["lot_no"] = data.value.LotNo;
    payload["item_description"] = data.value.Itemdescription;
    payload["item_notes"] = data.value.Itemnotes;
    payload["tag"] = data.value.Tags;
    // let x = data.value.item_image;
    // console.log(x);
    formData.append("token","1a32e71a46317b9cc6feb7388238c95d");
    formData.append("item_number",data.value.ItemNumber ? data.value.ItemNumber : '');
    formData.append("item_name",data.value.ItemName ? data.value.ItemName : '');
    formData.append("item_category_id",data.value.ItemCategory ? data.value.ItemCategory : '');

    formData.append("item_sub_category_id",data.value.subcategory ? data.value.subcategory : '');
    formData.append("item_barcode",data.value.Barcodes ? data.value.Barcodes : '');
    let procedure = data.value.procedure;
    console.log('Procedure',procedure);
    console.log('TYpe of Procedure',typeof(procedure));
    if(procedure !=null){
      procedure.forEach((item:any) => formData.append("item_procedure_id[]", item))
    }
    else{
      formData.append("item_procedure_id","")
    }
    // formData.append("item_procedure_id", stringArray);


    // payload["item_status"] = data.value.ItemStatus;
    if(data.value.ItemStatus){
      payload["item_status"] = data.value.ItemStatus;
      formData.append("item_status",data.value.ItemStatus ? data.value.ItemStatus : '' );
    }
    else{
      payload["item_status"] = 1;
      formData.append("item_status","1");
    }

    formData.append("vendor_id",data.value.Vendor ? data.value.Vendor : '');
    formData.append("price",data.value.price ? data.value.price : '');
    formData.append("size",data.value.size ? data.value.size : '');
    formData.append("size_type",data.value.sizetype ?  data.value.sizetype : '');
    formData.append("unit",data.value.Unit ? data.value.Unit : '');
    formData.append("store_qty",data.value.storeqty ? data.value.storeqty : '');
    formData.append("cabinet_qty",data.value.CabinetQty ? data.value.CabinetQty : '');
    formData.append("expired_date",data.value.ExpiryDate ? this.formatDate(data.value.ExpiryDate) :  '');
    // formData.append("cabinet_qty",data.value.CabinetQty);
    formData.append("min_level",data.value.MinStoreQty ? data.value.MinStoreQty : '');
    formData.append("cat_no",data.value.CatNo ? data.value.CatNo : '');
    formData.append("lot_no",data.value.LotNo ? data.value.LotNo : '');
    formData.append("item_description",data.value.Itemdescription ? data.value.Itemdescription : '');
    formData.append("item_notes",data.value.Itemnotes ? data.value.Itemnotes : '');
    console.log('sub id',data.value.Tags);
    let tags = data.value.Tags;
    if(tags != null){
      tags.forEach(element => {
        formData.append("tag[]", element);
      });
    }
    else{
      formData.append("tag", '');
    }

    formData.append("created_by","1")
    formData.append("inactive_by","1")
    formData.append("inactive_reason",reasonValue.reason2);
    // payload["expired_date"] = data.value.ExpiryDate;




    if(image){
      formData.append("item_image", image, image.name);
    }
    else{
      formData.append("item_image", '');
    }
    // formData.append('item_image', x);
    payload["item_image"] = "";
    payload["created_by"]='1';
    payload["image"] = formData;

    // console.log(payload);
    console.log(formData.get('item_image'));
    formData.forEach((value, key) => {
      const values = formData.getAll(key);
      console.log(`${key}: ${values}`);
      console.log('KEY',typeof(key));
      console.log('VALUES',typeof(values));
    });

    // return null;
    return this.http.post(`${this.apiUrl}/items/store`,formData);
  }

  UpdateItemfn(item_id:any,data:any,image:any,reasonValue:any){
    let formData = new FormData();
    let payload:Object = {};
    console.log("image",image);

    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_number"] = data.value.ItemNumber;
    payload["item_name"] = data.value.ItemName;
    payload["item_id"] = item_id.id;
    payload["item_category_id"] = data.value.ItemCategory;
    payload["item_sub_category_id"] = data.value.subcategory;
    payload["item_barcode"] = data.value.Barcodes;
    payload["item_procedure_id"] = data.value.procedure;
    // payload["item_status"] = data.value.ItemStatus;
    if(data.value.ItemStatus){
      payload["item_status"] = data.value.ItemStatus;
    }
    else{
      payload["item_status"] = 1;
    }
    payload["vendor_id"] = data.value.Vendor;
    payload["price"] = data.value.price;
    payload["size"] = data.value.size;
    payload["size_type"] = data.value.sizetype;
    payload["unit"] = data.value.Unit;
    payload["store_qty"] = data.value.storeqty;
    payload["cabinet_qty"] = data.value.CabinetQty;
    payload["expired_date"] = this.formatDate(data.value.ExpiryDate);
    // payload["expired_date"] = data.value.ExpiryDate;
    payload["min_level"] = data.value.MinStoreQty;
    payload["cat_no"] = data.value.CatNo;
    payload["lot_no"] = data.value.LotNo;
    payload["item_description"] = data.value.Itemdescription;
    payload["item_notes"] = data.value.Itemnotes;
    payload["tag"] = data.value.Tag;
    payload["image_url"] = '';
    payload["updated_by"]='1';


    formData.append('token','1a32e71a46317b9cc6feb7388238c95d');
    formData.append('item_number',data.value.ItemNumber?data.value.ItemNumber : '');
    formData.append('item_name',data.value.ItemName?data.value.ItemName : '');
    formData.append('item_id',item_id.id?item_id.id : '');
    formData.append('item_category_id',data.value.ItemCategory?data.value.ItemCategory : '');
    formData.append('item_sub_category_id',data.value.subcategory?data.value.subcategory : '');
    formData.append('item_barcode',data.value.Barcodes?data.value.Barcodes : '');
    let procedure = data.value.procedure;
    console.log('Procedure',procedure);
    console.log('TYpe of Procedure',typeof(procedure));
    if(procedure !=null){
      procedure.forEach((item:any) => formData.append("item_procedure_id[]", item))
    }
    else{
      formData.append("item_procedure_id","")
    }

    if(data.value.ItemStatus){
      formData.append('item_status',data.value.ItemStatus?data.value.ItemStatus : '');
    }
    else{
      formData.append('item_status', '1');
    }

    formData.append('vendor_id', data.value.Vendor ? data.value.Vendor : '');
    formData.append('price', data.value.price ? data.value.price : '');
    formData.append('size', data.value.size ? data.value.size : '');
    formData.append('size_type', data.value.size_type ? data.value.size_type : '');
    formData.append('unit', data.value.Unit ? data.value.Unit : '');
    formData.append('store_qty', data.value.storeqty ? data.value.storeqty : '');
    formData.append('cabinet_qty', data.value.CabinetQty ? data.value.CabinetQty : '');
    formData.append('expired_date', data.value.ExpiryDate ? this.formatDate(data.value.ExpiryDate) : '');
    formData.append('min_level', data.value.MinStoreQty ? data.value.MinStoreQty : '');
    formData.append('cat_no', data.value.CatNo ? data.value.CatNo : '');
    formData.append('lot_no', data.value.LotNo ? data.value.LotNo : '');
    formData.append('item_description', data.value.Itemdescription ? data.value.Itemdescription : '');
    formData.append('item_notes', data.value.Itemnotes ? data.value.Itemnotes : '');
    let tags = data.value.Tags;
    console.log("Tags",tags);

    if(tags != null){
      tags.forEach(element => {
        formData.append("tag[]", element);
      });
    }
    else{
      formData.append("tag", '');
    }

    if(image && image !== null){
      if(image.name){
        formData.append("item_image", image, image.name);
      }
      else{
        formData.append("item_image", image);
      }
    }
    else{
      // if(image){
      //   formData.append("item_image", image);
      // }
      // else{
      //   formData.append("item_image", '');
      // }
      formData.append("item_image", '');
    }

    formData.append('updated_by',"1");
    formData.append("inactive_by","1")
    formData.append("inactive_reason",reasonValue.reason2);
    formData.forEach((value, key) => {
      const values = formData.getAll(key);
      console.log(`${key}: ${values}`);
      console.log('KEY',typeof(key));
      console.log('VALUES',typeof(values));
    });

    // return null;
    return this.http.post(`${this.apiUrl}/items/update`,formData);
  }

  BulkUpdate(Item_id:any,data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"] = Item_id;
    payload["item_procedure_id"] = data.value.procedure;
    payload["tags"] = data.value.tags;
    payload["price"] = data.value.price;
    payload["store_qty"] = data.value.storeQuantity;
    payload["min_level"] = data.value.minLevel;
    payload["item_notes"] = data.value.notes;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/items/item_bulk_edit`,payload);
  }

  ViewItem(data:any){
        let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"] = data;
    return this.http.post(`${this.apiUrl}/items/show`,payload);
  }

  ViewVendor(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["vendor_id"] = data.id;
    return this.http.post(`${this.apiUrl}/vendors/show`,payload);
  }

  DeleteMultipleItem(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    console.log(data);
    let indexArray:any = [];
     Object.keys(data).forEach(index =>{
      console.log(data[index]);

       indexArray.push(data[index].id);
    });
    payload["item_id"] = indexArray;
    payload["deleted_by"] = "1";
    console.log(payload);
    return this.http.post(`${this.apiUrl}/items/destroy`,payload);
  }

  DeleteSingleItem(data:any,formData:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"] = [data];
    payload["deleted_by"] = "1";
    payload["deleted_reason"] = formData.value.reason2;
    return this.http.post(`${this.apiUrl}/items/destroy`,payload);
  }

  GetCategory(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["category_id"] = data.id;
    return this.http.post(`${this.apiUrl}/categories/show`,payload);
  }

  GetSubCategory(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["sub_category_id"] = data;
    return this.http.post(`${this.apiUrl}/sub_categories/show`,payload);
  }

  GetAllSubCategory(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/sub_categories/index`,payload)
  }

  EditCategory(data:any,category_id:any,reasonValue:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    console.log(data);
    console.log(category_id);
    payload["category_id"] = category_id;
    payload["name"] = data.value.CategoryName;
    payload["category_shortcode"] = data.value.CategorySubCode;
    // payload["status"] = data.value.Status;
    let Status = data.value.Status
    if(Status.length>0){
      payload["status"] = data.value.Status;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["updated_by"] = "1";
    payload["inactive_by"] = "1";
    payload["inactive_reason"] = reasonValue.reason2;
    // return null;
    return this.http.post(`${this.apiUrl}/categories/update`,payload)
  }

  EditSubCategory(data:any,category_id:any,sub_category_index:any,reasonValue:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["sub_category_id"] = sub_category_index;
    payload["sub_category_name"] = data.value.SubCategoryName;
    payload["category_id"] = category_id;
    payload["status"] = data.value.status;
    console.log('Statats',data.value.status);
    let Status = data.value.status
    if(Status.length>0){
      payload["status"] = data.value.status;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["updated_by"] = "1";
    payload["inactive_by"] = "1";
    payload["inactive_reason"] = reasonValue.reason2;
    return this.http.post(`${this.apiUrl}/sub_categories/update`,payload);
  }

  EditVendor(data:any,vendor_id:any,reasonValue:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    console.log(data);
    payload["vendor_id"] = vendor_id;
    payload["VendorName"] = data.value.VendorName;
    payload["VendorEmail"] = data.value.VendorEmail;
    payload["VendorContactNo"] = data.value.VendorContactNo;
    payload["VendorAddress"] = data.value.VendorAddress;
    // payload["status"] = data.value.Status.label;
    if(data.value.Status){
      payload["status"] = data.value.Status;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["ContactPerson"] = "";
    payload["updated_by"] = "1";
    payload["inactive_by"] = "";
    payload["inactive_reason"] = reasonValue.reason2;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/vendors/update`,payload);
  }

  DeleteCategory(data:any,formData:any){
    let payload:Object = {};
    console.log(formData);
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["category_id"] = data;
    payload["deleted_by"] = "1";
    payload["deleted_reason"] = formData.value.reason2;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/categories/destroy`,payload);
  }

  DeleteVendor(data:any,formData:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["vendor_id"] = data;
    payload["deleted_by"] = "1";
    payload["deleted_reason"] = formData.value.reason2;
    return this.http.post(`${this.apiUrl}/vendors/destroy`,payload);
  }

  DeleteSubCategory(data:any,formData:any){
    let payload:Object = {};
    console.log(formData);
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["sub_category_id"] = data;
    payload["deleted_by"] = "1";
    payload["deleted_reason"] = formData.value.reason2;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/sub_categories/destroy`,payload);
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
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/categories/index`,payload);
  }

  GetSearchOverAllList(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["category_search"] = data;
    return this.http.post(`${this.apiUrl}/categories/index`,payload);
  }

  GetAllItemsGrid(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/items/index`,payload);
  }

  GetItemUniqueList(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/procedures/item_unique_list`,payload);
  }

  GetVendorList(){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/vendors/index`,payload);
  }

  SearchAllItemsGrid(data){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_category_id"]=data.value.category;
    payload["item_name"]=data.value.ItemName;
    payload["item_procedure_id"]=data.value.ProcedureSearch;
    payload["cabinet_qty"]=data.value.CabinetQty;
    payload["price"]=data.value.Price;
    payload["min_level"]=data.value.MinLevel;
    payload["store_qty"]=data.value.StoreQty;
    // payload[""] = data.value.QuantityAlert;
    payload["tag"]=data.value.Tags;
    payload["item_barcode"]=data.value.Barcode;
    payload["item_notes"]=data.value.Notes;
    return this.http.post(`${this.apiUrl}/items/index`,payload);
  }

  CloneItem(data:any){
    let payload:Object = {};
    console.log(data);
    let Itemid :any = [];
    data.forEach((element:any) => {
      Itemid.push(element.id);
    });
    const itemIdAsString = Itemid.map(String);
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"] = itemIdAsString;
    return this.http.post(`${this.apiUrl}/items/item_clone`,payload);
  }

  MoveItem(Item_id:any,category_id:any,subCategory_id:any){
    let payload:Object = {};
    const itemIdAsString = Item_id.map(String);
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"] = itemIdAsString;
    payload["item_category_id"] = category_id;
    payload["item_sub_category_id"] = subCategory_id;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/items/item_move`,payload);
  }

  SetItemAlert(Item_id:any,data:any){
    let payload:Object = {};
    const itemIdAsString = Item_id.map(String);
    payload["token"]="1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"]=itemIdAsString;
    payload["vendor_id"] = null;
    payload["set_alert_type_id"] = data.value.set_alert_type;
    payload["min_level"] = data.value.min_level;
    payload["created_by"] = "1";
    console.log(payload);
    return this.http.post(`${this.apiUrl}/items/item_set_alert`,payload);
  }

  getItemsRecall(){
    let payload:Object = {};
    payload["token"]="1a32e71a46317b9cc6feb7388238c95d";
    return this.http.post(`${this.apiUrl}/items/item_recall`,payload);
  }

  getTrashItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/items/trashed_items`,payload);
  }

  RestoreItems(items:any,vendor:any,category:any,subcategory:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_id"] = items;
    payload["vendor_id"] = vendor;
    payload["category_id"] = category;
    payload["subcategory_id"] = subcategory;
    payload["procedure_id"] = null;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/items/restored_items`,payload);
  }

  GetNearExpiredItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/items/near_expired_items`,payload);
  }

  GetBackToCabinet(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/back_to_cabinet`,payload);
  }

  GetRefilltoCabinet(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/items/item_refill_to_cabinet`,payload);
  }

  SearchNearItemsByDate(data:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["expired_date"]=data;
    return this.http.post(`${this.apiUrl}/items/near_expired_items`,payload);

  }

  SearchItemByCategory(Category_id:any,SubCategory_id:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_category_id"] = Category_id;
    payload["item_sub_category_id"] = SubCategory_id;
    return this.http.post(`${this.apiUrl}/items/items_category_search`,payload);
  }

  GetInactiveItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/items/inactive_items`,payload);
  }

  ActivateAllItems(items:any,category:any,subcategory:any,vendor:any,procedure:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_id"] = items;
    payload["category_id"] = category;
    payload["sub_category_id"] = subcategory;
    payload["vendor_id"] = vendor;
    payload["procedure_id"] = null;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/items/restored_inactive_items`,payload);
  }

  GetDamagedItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/item_damaged`,payload);
  }

  GetWastedItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/item_wasted`,payload);
  }

  GetLowStockItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/items/item_low_stock`,payload);
  }

  GetAllHistroyItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/item_history`,payload);
  }

  BulkUpdateQuantity(itemid:any,quantity:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_id"] = itemid;
    payload["quantity"] = quantity;
    return this.http.post(`${this.apiUrl}/items/item_quantity_update`,payload);
  }

  GetAllProcedureList(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/patient_list`,payload);
  }

  GetSpecificPatientDetails(data:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"] = data;
    return this.http.post(`${this.apiUrl}/procedures/patient_details`,payload);
  }

  GetAllPatientProcedureList(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/patient_procedure_list`,payload);
  }


  GetSpecificPatientProcedureDetails(data:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"] = data;
    return this.http.post(`${this.apiUrl}/procedures/patient_procedure_details`,payload);
  }



  SendPatientRequest(data:any,type:any,reason:any){
    console.log('patient Details',data);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["mrn_number"]=data.mrn_no;
    payload["patient_id"]=data.id;
    payload["procedure"]=data.procedure;
    payload["status"]=type;
    payload["accept_by"]="1";
    payload["created_by"]="1";
    payload["reason_note"]=reason.reason2;
    payload["reason_type"]=reason.reason1;
    return this.http.post(`${this.apiUrl}/procedures/patient_request`,payload);
  }

  GetVettingTypes(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/vetting_types`,payload);
  }

  GetProtocolTypes(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/protocol_types`,payload);
  }

  GetAddProtocolList(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/add_your_protocol`,payload);
  }


  SendVettingRequest(PatientDetails:any,vettingnotes:any,vetttingid:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["mrn_number"] = PatientDetails.mrn_no;
    payload["patient_id"] = PatientDetails.id;
    payload["vetting_type_id"] = vetttingid;
    payload["vetting_notes"] = vettingnotes.VettingNotes;
    payload["vetting_by"] = "1";
    payload["created_by"] = "1";
    return this.http.post(`${this.apiUrl}/procedures/store_vetting_request`,payload);
  }

  SendProtocolRequest(PatientDetails:any,protocoleNotes:any,protocoleId:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["mrn_number"] = PatientDetails.mrn_no;
    payload["patient_id"] = PatientDetails.id;
    payload["protocol_type_id"] = protocoleId;
    payload["protocol_details"] = protocoleNotes.ProtocolDetails;
    payload["add_your_protocol"] = protocoleNotes.AddedProtocol;
    payload["protocol_notes"] = protocoleNotes.ProtocolNotes;
    payload["protocolling_by"] = "1";
    payload["created_by"] = "1";
    return this.http.post(`${this.apiUrl}/procedures/store_protocol_request`,payload);
  }

  GetMyCartDetails(data:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["procedure"]=data;
    return this.http.post(`${this.apiUrl}/procedures/material_my_cart`,payload);
  }

  StoreShoppingCartSchedulling(PatientID:any,MRNNO:any,ProcedureName:any,itemID:any,Quantity:any,stage_type:string){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["mrn_number"]=MRNNO;
    payload["item_id"]=itemID;
    payload["patient_id"]=PatientID;
    payload["quantity"]=Quantity;
    payload["stage_type"]=stage_type;
    payload["created_by"]='1';
    payload["purchased_by"]='1';
    payload["procedure"] = ProcedureName;
    // return null;
    return this.http.post(`${this.apiUrl}/procedures/store_shopping_cart`,payload);
  }

  GetAllCheckList(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/check_list_index`,payload);
  }

  GetSpecificItemHistory(data:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_id"]=data;
    return this.http.post(`${this.apiUrl}/items/item_history_details`,payload);
  }

  GetIntraProcedureList(data:any,mrnno:any,procedure:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=data;
    payload["mrn_number"]=mrnno;
    payload["procedure"]=procedure;
    console.log(payload);
    return this.http.post(`${this.apiUrl}/procedures/intra_procedure_index`,payload);
  }

  ImportPatientExcel(data:any){
    let formData = new FormData;
    formData.append("token","1a32e71a46317b9cc6feb7388238c95d");
    formData.append("attachment", data);
    formData.forEach((value, key) => {
      const values = formData.getAll(key);
      console.log(`${key}: ${values}`);
      console.log('KEY',typeof(key));
      console.log('VALUES',typeof(values));
    });
    // return null;
    return this.http.post(`${this.apiUrl}/procedures/patient_import`,formData);
  }


  Registerpatient(PersonalDetails:any,ContactDetails:any,healthDetails:any,Otherdetails:any,image:any,documents:any){
    let formData = new FormData;
    formData.append("token","1a32e71a46317b9cc6feb7388238c95d");

    if(image && image !== null){
      if(image.name){
        formData.append("patient_image", image, image.name);
      }
      else{
        formData.append("patient_image", image);
      }
    }
    else{
      formData.append("patient_image", '');
    }

    //Personal Details
    formData.append('first_name',PersonalDetails.first_name);
    formData.append('middle_name',PersonalDetails.middle_name);
    formData.append('surname',PersonalDetails.last_name);
    formData.append('title',PersonalDetails.title);
    formData.append('name_of_partner',PersonalDetails.partner_name);
    formData.append('name_of_children ',PersonalDetails.children_name);
    formData.append('referred_by',PersonalDetails.referred_by);
    formData.append('gender',PersonalDetails.gender);
    formData.append('dob',this.formatDate(PersonalDetails.dob) );
    formData.append('age',PersonalDetails.age);
    formData.append('marital_status',PersonalDetails.martial_status);
    formData.append('language',PersonalDetails.language);

    //Contact Details
    formData.append('telephone',ContactDetails.telephone_number);
    formData.append('primary_email',ContactDetails.email);
    // formData.append('address_type',Address.addresstype);
    formData.append('flat_unit_no',ContactDetails.flatNo);
    formData.append('street_no',ContactDetails.StreetNo);
    formData.append('street_name',ContactDetails.StreetName);
    formData.append('suburb',ContactDetails.suburb);
    formData.append('town_city',ContactDetails.town);
    formData.append('state',ContactDetails.state);
    formData.append('post_code',ContactDetails.postcode);

    //health Details
    formData.append('blood_group',healthDetails.bloodgroup);
    formData.append('weight',healthDetails.weight);
    formData.append('height',healthDetails.height);
    formData.append('blood_pressure',healthDetails.bloodPressure);
    formData.append('heart_beat',healthDetails.heartBeat);
    formData.append('spo2',healthDetails.spo2);
    formData.append('respiratory_rate',healthDetails.respiratoryRate);
    formData.append('temperature',healthDetails.temperature);
    formData.append('priority',healthDetails.Priority);
    formData.append('specialty',healthDetails.Speciality);
    formData.append('patient_type',healthDetails.Patient_type);
    formData.append('procedure','Procedure 1');

    //Other Details
    formData.append('critical_information',Otherdetails.clientInformation);
    formData.append('notes',Otherdetails.notes);

    for (let i = 0; i < documents.length; i++) {
      let file: File = documents[i];
      console.log(file);
      formData.append("documents[]", file, file.name); // the filed name is `files` because the server side declares a `Files` property
    }
    formData.append('created_by',"1");

    formData.forEach((value, key) => {
      const values = formData.getAll(key);
      console.log(`${key}: ${values}`);
    });
    // return null;
    return this.http.post(`${this.apiUrl}/procedures/store_patient_details`,formData);
  }

  UpdateRegisteredPatient(PersonalDetails:any,ContactDetails:any,healthDetails:any,Otherdetails:any,image:any,Patient_ID:any,documents:any){
    let formData = new FormData;
    formData.append("token","1a32e71a46317b9cc6feb7388238c95d");

    if(image && image !== null){
      if(image.name){
        formData.append("patient_image", image, image.name);
      }
      else{
        formData.append("patient_image", image);
      }
    }
    else{
      formData.append("patient_image", '');
    }

    //Personal Details
    formData.append('first_name',PersonalDetails.first_name);
    formData.append('middle_name',PersonalDetails.middle_name);
    formData.append('surname',PersonalDetails.last_name);
    formData.append('title',PersonalDetails.title);
    formData.append('name_of_partner',PersonalDetails.partner_name);
    formData.append('name_of_children ',PersonalDetails.children_name);
    formData.append('referred_by',PersonalDetails.referred_by);
    formData.append('gender',PersonalDetails.gender);
    formData.append('dob',this.formatDate(PersonalDetails.dob) );
    formData.append('age',PersonalDetails.age);
    formData.append('marital_status',PersonalDetails.martial_status);
    formData.append('language',PersonalDetails.language);

     //Contact Details
     formData.append('telephone',ContactDetails.telephone_number);
     formData.append('primary_email',ContactDetails.email);
     // formData.append('address_type',Address.addresstype);
     formData.append('flat_unit_no',ContactDetails.flatNo);
     formData.append('street_no',ContactDetails.StreetNo);
     formData.append('street_name',ContactDetails.StreetName);
     formData.append('suburb',ContactDetails.suburb);
     formData.append('town_city',ContactDetails.town);
     formData.append('state',ContactDetails.state);
     formData.append('post_code',ContactDetails.postcode);

     //health Details
     formData.append('blood_group',healthDetails.bloodgroup);
     formData.append('weight',healthDetails.weight);
     formData.append('height',healthDetails.height);
     formData.append('blood_pressure',healthDetails.bloodPressure);
     formData.append('heart_beat',healthDetails.heartBeat);
     formData.append('spo2',healthDetails.spo2);
     formData.append('respiratory_rate',healthDetails.respiratoryRate);
     formData.append('temperature',healthDetails.temperature);
     formData.append('priority',healthDetails.Priority);
     formData.append('specialty',healthDetails.Speciality);
     formData.append('patient_type',healthDetails.Patient_type);
     formData.append('procedure','Procedure 1');
    //Other Details
    formData.append('critical_information',Otherdetails.clientInformation);
    formData.append('notes',Otherdetails.notes);
    formData.append('updated_by',"1");
    formData.append('patient_id',Patient_ID);
    for (let i = 0; i < documents.length; i++) {
      let file: File = documents[i];
      if(file.name){
        formData.append("documents[]", file, file.name);
      }
      else{
        formData.append("documents[]", file);
      }
  }

    formData.forEach((value, key) => {
      const values = formData.getAll(key);
      console.log(`${key}: ${values}`);
    });
    // return null;
    return this.http.post(`${this.apiUrl}/procedures/patient_details_update`,formData);
  }

  GetPatientList(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/procedures/patient_registration_list`,payload);
  }

  SendPatientProcedureRequest(ID:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=ID;
    return this.http.post(`${this.apiUrl}/procedures/patient_procedure_request`,payload);
  }

  GetVettingRequestData(patientID:any,mrn_no:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=patientID;
    payload["mrn_number"]=mrn_no;
    return this.http.post(`${this.apiUrl}/procedures/show_vetting_request`,payload);
  }

  GetProtocolingRequestData(patientID:any,mrn_no:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=patientID;
    payload["mrn_number"]=mrn_no;
    return this.http.post(`${this.apiUrl}/procedures/show_protocol_request`,payload);
  }

  GetVettingandProtocolingData(patientID:any,mrn_no:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=patientID;
    payload["mrn_number"]=mrn_no;
    return this.http.post(`${this.apiUrl}/procedures/show_vetting_protocol_request`,payload);
  }

  StoreIntraProcedure(ItemId:any,Qty:any,Type:any,Notes:any,Patientid:any,Procedurename:string,NRN_No:string,Accession_No:string){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_id"]=ItemId;
    payload["patient_id"]=Patientid;
    payload["mrn_no"]=NRN_No;
    payload["procedure"]=Procedurename;
    payload["accession_no"]=Accession_No;
    payload["type"]=Type;
    payload["no_of_qty"]=Qty.length>0 ? Qty : [null,null];
    payload["notes"]=Notes.length>0 ? Notes : [null,null];
    payload["created_by"]=1;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/procedures/store_intra_procedure`,payload);
  }

  GetPreProcedureUsedGridData(PatientId:any,ProcedureName:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=PatientId;
    payload["procedure"]=ProcedureName;
    return this.http.post(`${this.apiUrl}/procedures/used_data`,payload);
  }

  GetProcedureDamagedGridData(PatientId:any,ProcedureName:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=PatientId;
    payload["procedure"]=ProcedureName;
    return this.http.post(`${this.apiUrl}/procedures/damaged_data`,payload);
  }

  GetProcedureReturnedGridData(PatientId:any,ProcedureName:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=PatientId;
    payload["procedure"]=ProcedureName;
    return this.http.post(`${this.apiUrl}/procedures/returned_data`,payload);
  }

  GetProcedureWastedGridData(PatientId:any,ProcedureName:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]=PatientId;
    payload["procedure"]=ProcedureName;
    return this.http.post(`${this.apiUrl}/procedures/wasted_data`,payload);
  }

  GetCheckListData(stageType: string){
    let payloads:Object = {};
    payloads["token"] = '1a32e71a46317b9cc6feb7388238c95d';
    payloads["stage_type"] = stageType;
    return this.http.post<any>(`${this.apiUrl}${this.checkLists}`, payloads);
  }

  kizinCheckBoxesData(stageType: string, patientId: any, MRN_NO: string, checked: boolean, procedure: any, check_list_id: number, added_by: number, created_by: number){
    let payLoads = {};
    payLoads["token"] = '1a32e71a46317b9cc6feb7388238c95d';
    payLoads["patient_id"] = patientId;
    payLoads["mrn_no"] = MRN_NO;
    payLoads["procedure"] = procedure;
    payLoads["stage_type"] = stageType;
    payLoads["checked"] = checked;
    payLoads["checklist_id"] = check_list_id;
    payLoads["added_by"] = added_by;
    payLoads["created_by"] = created_by;
    return this.http.post<any>(`${this.apiUrl}${this.checkBoxesKizin}`, payLoads);
  }

  kizinTimeLineData(){
    let payLoads = {};
    payLoads["token"] = '1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post<any>(`${this.apiUrl}${this.kiziCheckBoxesTimeLine}`, payLoads);
  }

  formattedDate(date: Date): string {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  MaterialDashboard(){
    let payLoads = {};
    payLoads["token"] = '1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post<any>(`${this.apiUrl}${this.materialdashboard}`, payLoads);
  }


  setPatientData(data: any) {
    this.patientData = data;
    localStorage.setItem(this.patientDataKey, JSON.stringify(data));

  }

  getPatientData() {
    if (!this.patientData) {
      this.loadPatientData();
    }
    return this.patientData;
  }

  private loadPatientData() {
    const data = localStorage.getItem(this.patientDataKey);
    this.patientData = data ? JSON.parse(data) : null;
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  //clinical_history pre-diagnosis, indication and post_diagnosis
  Get_Clinical_history() {
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    payload["mrn_number"]=patientDataJson.mrn_no;
    // payload["patient_id"]=patientDataJson.id;
    payload["procedure"]= 'Procedure 1';
    return this.http.post(`${this.apiUrl}${this.clinicalDiagnosis}`,payload);
  }

  save_Clinical_Data(rowData: any) {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]= patientDataJson.mrn_no;
    // payload["patient_id"]= patientDataJson.id;
    payload['diagones_data'] = rowData;
    payload['created_by'] = 1;
    payload['added_by'] = 1;
    payload["procedure"]= 'Procedure 1';
    return this.http.post(`${this.apiUrl}${this.saveData1}`, payload);
  }

  Get_Indication_History() {
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    payload["stage_type"]='Requesting';
    payload["mrn_number"]=patientDataJson.mrn_no;
    // payload["patient_id"]=patientDataJson.patient_id;
    payload["procedure"]= 'Procedure 1';
    return this.http.post(`${this.apiUrl}${this.clinicalHistoryIndication}`,payload);
  }

  save_Indication_Data(rowData : any) {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]=patientDataJson.mrn_no;
    // payload["patient_id"]=patientDataJson.id;
    payload["procedure"]= 'Procedure 1';
    payload['indication_data'] = rowData;
    payload['created_by'] = 1;
    payload['added_by'] = 1;
    return this.http.post(`${this.apiUrl}${this.saveDataIndication1}`, payload);
  }

  Get_Post_Diagnosis_History() {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]=patientDataJson.mrn_no;
    // payload["patient_id"]=patientDataJson.id;
    payload["procedure"]= 'Procedure 1';
    return this.http.post(`${this.apiUrl}${this.clinicalPostDiagnosis}`,payload);
  }

  save_PostDiagnosis_Data(rowData : any) {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]=patientDataJson.mrn_no;
    // payload["patient_id"]=patientDataJson.id;
    payload['post_diagnosis_data'] = rowData;
    payload['created_by'] = 1;
    payload['added_by'] = 1;
    payload["procedure"]= 'Procedure 1';
    return this.http.post(`${this.apiUrl}${this.saveDataPostDiagnosis1}`, payload);
  }

  //Labs details
  GetLabDetails() {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]=patientDataJson.mrn_no;
    payload["patient_id"]=patientDataJson.id;
    payload['procedure'] = 'Procedure 1';
    return this.http.post(`${this.apiUrl}${this.getLabDetails1}`,payload);
  }

  saveDataLab(rowData : any) {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]= patientDataJson.mrn_no;
    payload["patient_id"]= patientDataJson.id;
    payload['patient_lab_data'] = rowData;
    payload['created_by'] = 1;
    payload['added_by'] = 1;
    payload['procedure'] = 'Procedure 1';
  
    return this.http.post(`${this.apiUrl}${this.saveDataLab1}`, payload);
  }

  //Medication Details
  GetMedicationDetails() {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]=patientDataJson.mrn_no;
    payload["patient_id"]=patientDataJson.id;
    payload['procedure'] = 'Procedure 1';
    return this.http.post(`${this.apiUrl}${this.getMediationDetails}`,payload);
  }

  saveDataMedication(rowData : any) {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]= patientDataJson.mrn_no;
    payload["patient_id"]= patientDataJson.id;
    payload['patient_mediation_data'] = rowData;
    payload['created_by'] = 1;
    payload['added_by'] = 1;
    payload['procedure'] = 'Procedure 1';
  
    return this.http.post(`${this.apiUrl}${this.saveMediationData1}`, payload);
  }

  saveVitalDetails(blood_pressure: string, respiratory_rate: string, temperature: string, heart_beat: string, spO2: string) {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["mrn_number"]= patientDataJson.mrn_no;
    payload["patient_id"]= patientDataJson.id;
    payload['created_by'] = 1;
    payload['added_by'] = 1;
    payload['procedure'] = 'Procedure 1';
    payload['accession_no'] = patientDataJson.accession_no;
    payload['blood_pressure'] = blood_pressure;
    payload['respiratory_rate'] = respiratory_rate;
    payload['temperature'] = temperature;
    payload['heart_beat'] = heart_beat;
    payload['spO2'] = spO2;
    
    return this.http.post(`${this.apiUrl}${this.saveVitalDetails1}`, payload);
  }

  editVitals(){
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]= patientDataJson.id;

    return this.http.post(`${this.apiUrl}${this.editVitals1}`, payload);
  }

  savePrecautions(fall: string, allergy: string, isolation: string, covid: string, gcs: string, pregnant: string, diabetic: string, contrast_reaction: string, gcs_eye_opening: any, gcs_verbal_response: any, gcs_motor_response: any, contrast_reaction_values: any) {
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]= patientDataJson.id;
    payload['procedure'] = 'Procedure 1';
    payload['accession_no'] = patientDataJson.accession_no;
    payload['fall'] = fall;
    payload['allergy'] = allergy;
    payload['isolation'] = isolation;
    payload['covid'] = covid;
    payload['gcs'] = gcs;
    payload['pregnant'] = pregnant;
    payload['diabetic'] = diabetic;
    payload['contrast_reaction'] = contrast_reaction;
    payload['gcs_eye_opening'] = gcs_eye_opening;
    payload['gcs_verbal_response'] = gcs_verbal_response;
    payload['gcs_motor_response'] = gcs_motor_response;
    payload['contrast_reaction_values'] = contrast_reaction_values;

    return this.http.post(`${this.apiUrl}${this.savePrecautions1}`, payload);
  }

  editPrecautions(){
    let patientData = localStorage.getItem('patientData');
    let patientDataJson = JSON.parse(patientData);
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["patient_id"]= patientDataJson.id;

    return this.http.post(`${this.apiUrl}${this.editPrecautions1}`, payload);
  }
}

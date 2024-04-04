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

  AddVendor(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["VendorName"] = data.value.VendorName;
    payload["VendorEmail"] = data.value.VendorEmail;
    payload["VendorContactNo"] = data.value.VendorContactNo;
    payload["VendorAddress"] = data.value.VendorAddress;
    // payload["status"] = data.value.Status.label;
    if(data.value.Status){
      payload["status"] = data.value.Status.label;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["ContactPerson"] = "";
    payload["Added_by"]="Admin";
    console.log(payload);

    return this.http.post(`${this.apiUrl}/vendors/store`,payload);
  }

  AddCategoryfn(data:any){
    let payload:Object = {};
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
    return this.http.post(`${this.apiUrl}/categories/store`,payload);
  }

  AddSubCategoryfn(data:any,index:any){
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
    return this.http.post(`${this.apiUrl}/sub_categories/store`,payload);
  }

  Additemfn(data:any,image:any){
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

  UpdateItemfn(item_id:any,data:any,image:any){
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
    if(image){
      formData.append("item_image", image, image.name);
    }
    else{
      formData.append("item_image", '');
    }
    formData.append('updated_by',"1");
    formData.forEach((value, key) => {
      const values = formData.getAll(key);
      console.log(`${key}: ${values}`);
      console.log('KEY',typeof(key));
      console.log('VALUES',typeof(values));
    });

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
    return null;
    // return this.http.post(`${this.apiUrl}/items/item_bulk_edit`,payload);
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

  DeleteSingleItem(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["item_id"] = [data];
    payload["deleted_by"] = "1";
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

  EditCategory(data:any,category_id:any){
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
    payload["added_by"] = "1";
    return this.http.post(`${this.apiUrl}/categories/update`,payload)
  }

  EditSubCategory(data:any,category_id:any,sub_category_index:any){
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
    return this.http.post(`${this.apiUrl}/sub_categories/update`,payload);
  }

  EditVendor(data:any,vendor_id:any){
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
      payload["status"] = data.value.Status.label;
    }
    else{
      payload["status"] = 'Active';
    }
    payload["ContactPerson"] = "";
    return this.http.post(`${this.apiUrl}/vendors/update`,payload);
  }

  DeleteCategory(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["category_id"] = data;
    return this.http.post(`${this.apiUrl}/categories/destroy`,payload);
  }

  DeleteVendor(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["vendor_id"] = data;
    return this.http.post(`${this.apiUrl}/vendors/destroy`,payload);
  }

  DeleteSubCategory(data:any){
    let payload:Object = {};
    payload["token"] = "1a32e71a46317b9cc6feb7388238c95d";
    payload["sub_category_id"] = data;
    payload["deleted_by"] = "1";
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

  RestoreItems(data:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_id"] = data;
    console.log(payload);
    // return null;
    return this.http.post(`${this.apiUrl}/items/restored_items`,payload);
  }

  GetNearExpiredItems(){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    return this.http.post(`${this.apiUrl}/items/near_expired_items`,payload);
  }

  SearchItemByCategory(Category_id:any,SubCategory_id:any){
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["item_category_id"] = Category_id;
    payload["item_sub_category_id"] = SubCategory_id;
    return this.http.post(`${this.apiUrl}/items/items_category_search`,payload);
  }
}

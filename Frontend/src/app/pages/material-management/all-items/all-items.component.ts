import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AuthfakeauthenticationService } from './../../../core/services/authfake.service';
import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment_new } from 'src/environments/environment';

interface AllItems{
  id:number,
  item_no:string,
  item_name:string,
  item_category:string,
  item_description:string,
  procedure:string,
  cat_no:string,
  lot_no:string,
  size:string,
  vendor:string,
  price:string,
  unit:string,
  expiry_date:string,
  on_hand_qty:string,
  min_level:string,
  tags:string,
  notes:string,
  images:string,
  barcodes:string,
  action:string
}

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

  category: string[];
  procedure: string[];
  format_value:string[];
  folder_structure_value:any[];
  hide_Overall_list:boolean = false;
  all_items_dropbtn:boolean = true;
  vendor_list_dropbtn:boolean = false;
  low_stock_dropbtn:boolean = false;
  overallview:boolean = true;
  selectedTab_To_View:string;
  files: File[] = [];
  imageURL: any;
  @ViewChild('additem', { static: false }) additem?: ModalDirective;
  @ViewChild('addcategory', { static: false }) addcategory?: ModalDirective;
  @ViewChild('addvendor', { static: false }) addvendor?: ModalDirective;
  @ViewChild('addtag', { static: false }) addtag?: ModalDirective;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;
  @ViewChild('notify', { static: false }) notify?: ModalDirective;
  @ViewChild('export', { static: false }) export?: ModalDirective;
  @ViewChild('subcategory', { static: false }) subcategory?: ModalDirective;

  AddtagForm:UntypedFormGroup;
  AddVendorForm:UntypedFormGroup;
  AddSubCategoryForm:UntypedFormGroup;
  AddCategoryForm:UntypedFormGroup;
  AddItemForm : UntypedFormGroup;
  cartData: any[];
  subtotal: any = 0;
  discount: any;
  discountRate = 0.15;
  shipping: any;
  shippingRate: any = '65.00';
  tax: any;
  taxRate = 0.125;
  totalprice: any;
  selectedExportType:string;
  selectedView:any = 'table';
  qty: number = 0;
  textcontent:any;
  resize:boolean = false;
  enableTab:any = '';
  StoreQty:number = 0;
  CabinetQty:number = 0;
  public payload:Object = {
    "token":"1a32e71a46317b9cc6feb7388238c95d",
  };
  public apiUrl: any = environment_new.apiUrl;


  options: Options = {
    floor: 0,
    ceil: 250
  };
  QuantityminValue: number = 10;
  QuantitymaxValue: number = 20;
  PriceminValue:number = 10;
  PricemaxValue:number = 40;
  StoreQtyminValue:number = 10;
  StoreQtymaxValue:number = 40;
  MinlevelMinimumValue:number = 40;
  MinlevelMaximumValue:number = 30;
  ItemStatus:any;


  constructor(private authfakeauthenticationService: AuthfakeauthenticationService,private http : HttpClient,private formbuilder : UntypedFormBuilder,private allServices : AllServicesService,private toastr: ToastrService) {
    this.category = []; this.procedure = [];this.format_value = ['KG'];

    this.authfakeauthenticationService.GridDetailedView_value.subscribe((res:any)=>{
      this.overallview = res;
    });

    this.ItemStatus= [
      { value: 1, label: "Active" },
      { value: 2, label: "Inactive" }
    ]

  }



  ngOnInit(): void {
    this.authfakeauthenticationService.changeSideMenu('material-management');
    this.http.get('assets/json/folder_name.json').subscribe((res:any)=>{
      this.folder_structure_value = res;
    });

    this.authfakeauthenticationService.selectedTabTypeValue.subscribe((res:any)=>{
      this.selectedTab_To_View = res;
      this.enableTab = res;
    });
    this.AddtagForm= this.formbuilder.group({
      TagName:['',Validators.required],
    });

    this.AddVendorForm  = this.formbuilder.group({
      VendorName:['',Validators.required],
      VendorEmail:['',[Validators.required,Validators.email]],
      VendorContactNo:['',[Validators.required,Validators.pattern("([0-9]{10}$)")]],
      VendorAddress:[],
      Status:[]
    });

    this.AddSubCategoryForm = this.formbuilder.group({
      SubCategoryName:['',[Validators.required]],
      category:[],
      status:[]
    });

    this.AddCategoryForm = this.formbuilder.group({
      CategoryName : ['',[Validators.required]],
      CategorySubCode : ['',[Validators.required]],
      Status :[]
    });

    this.AddItemForm = this.formbuilder.group({
      imageURL:[],
      ItemNumber:[,[Validators.required]],
      ItemName:[,[Validators.required]],
      ItemCategory:[,[Validators.required]],
      Barcodes:[,[Validators.required]],
      procedure:[],
      ItemStatus:[],
      Vendor:[],
      price:[,[Validators.required,Validators.pattern('^\\d*\\.?\\d*$'),Validators.min(0)]],
      size:[,[Validators.required,Validators.pattern('\\d*'),Validators.min(0)]],
      sizetype:[,Validators.required],
      subcategory:[],
      storeqty:[,[Validators.required,Validators.pattern('\\d*'),Validators.min(0)]],
      CabinetQty:[,[Validators.pattern('\\d*'),Validators.min(0)]],
      ExpiryDate:[,[Validators.required]],
      MinStoreQty:[,[Validators.required,Validators.pattern('\\d*'),Validators.min(0)]],
      CatNo:[],
      LotNo:[],
      Tags:[],
      Unit:[,[Validators.required,Validators.min(0),Validators.pattern('\\d*')]],
      Itemdescription:[],
      Itemnotes:[]
    })
  }
  get TagForm() { return this.AddtagForm.controls }

  imageUrl: string | ArrayBuffer | null = null;

  handleImageInput(input: HTMLInputElement): void {
    const file: File | null = input?.files?.[0];

    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  IncreaseStoreQty(data:any){
    let Numdata = parseInt(data);
    this.StoreQty = Numdata+1;
  }
  DecreaseStoreQty(data:any){
    let Numdata = parseInt(data);
    if(Numdata>0)
    {this.StoreQty = Numdata-1;}
  }

  IncreaseCabinetQty(data:any){
    let Numdata = parseInt(data);
    this.CabinetQty = Numdata+1;
  }

  DecreaseCabinetQty(data:any){
    let Numdata = parseInt(data);
    if(Numdata>0)
    {this.CabinetQty = Numdata-1;}
  }
  HideOverAllList(){
    this.hide_Overall_list =! this.hide_Overall_list;
  }

  SelectedTab(data:any)
  {
    switch(data){
      case 'All Items':{
        this.all_items_dropbtn = true;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Vendor list':{
        this.vendor_list_dropbtn = true;
        this.all_items_dropbtn=false;
        this.low_stock_dropbtn=false;
        break;
      }
      case 'Low Stock':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = true;
        break;
      }
      case 'Daily consumed':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Damaged':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Back to Cabinet':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = true;
        break;
      }
      case 'Wasted':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Near expired':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Refill to Cabinet':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Recall':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
    }
  }




  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    let file: File = event.addedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      setTimeout(() => {
        // this.profile.push(this.imageURL)
      }, 100);
    }
    reader.readAsDataURL(file)
  }

  select_folder(data:any){
    console.log('Selected Folder',data);
    this.textcontent = '';
    let elements = document.querySelector('.folder_img');
    console.log('elements',elements);
    this.textcontent = elements.nextSibling.textContent.trim();
    if(data == this.textcontent)
    {
      this.textcontent = data;
    }
    else
    {
      this.textcontent=''
    }
    console.log('clicked Folder',this.textcontent);
  }

  ngAfterViewInit(): void {

  }

  changeTab(tabs:any){
    switch(tabs)
    {
      case 'Vendor list':{
        this.enableTab = 'Vendor list';
        break;
      }
      case 'Daily consumed':{
        this.enableTab = 'Daily consumed';
        break;
      }
      case 'Damaged':{
        this.enableTab = 'Damaged';
        break;
      }
      case 'Back to Cabinet':{
        this.enableTab = 'Back to Cabinet';
        break;
      }
      case 'Wasted':{
        this.enableTab = 'Wasted';
        break;
      }
      case 'Near expired':{
        this.enableTab = 'Near expired';
        break;
      }
      case 'Low Stock':{
        this.enableTab = 'Low Stock';
        break;
      }
      case 'Refill to Cabinet':{
        this.enableTab = 'Refill to Cabinet';
        break;
      }
      case 'Recall':{
        this.enableTab = 'Recall';
        break;
      }
    }
  }


  hideAdvancedFilters(){
    this.resize =! this.resize;
  }


  calculateQty(id: any, qty: any, i: any) {
    this.subtotal = 0;
    if (id == '0' && qty > 1) {
      qty--;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }
    if (id == '1') {
      qty++;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }
    this.cartData.map((x: any) => {
      this.subtotal += parseFloat(x['total'])
    })
    this.subtotal = this.subtotal.toFixed(2)
    this.discount = (this.subtotal * this.discountRate).toFixed(2)
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalprice = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
  }

  ChangeView(view:any){
    switch(view){
      case 'grid':{
        this.selectedView = 'grid';
        break;
      }
      case 'list':{
        this.selectedView = 'list';
        break;
      }
      case 'table':{
        this.selectedView = 'table';
        break;
      }
    }
  }

  selectExportType(data:any){
    switch(data){
      case 'excel':{
        this.selectedExportType='excel';
        break;
      }
      case 'pdf':{
        this.selectedExportType='pdf';
        break;
      }
    }
  }

  Category:any=[];
  OpenModal(modalname:string){
    switch(modalname){
      case 'additem':{
        this.http.post(`${this.apiUrl}/categories/item_category`,this.payload).subscribe({
          next:((res:any)=>{
            const juiceValues = Object.values(res.categories)
            this.Category = juiceValues;
          }),
          error:((res:any)=>{
            this.toastr.error(`${res}`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          })
        })
        this.additem?.show();
        break;
      }
      case 'addtag':{
        this.addtag?.show();
        break;
      }
      case 'addvendor':{
        this.addvendor?.show();
        break;
      }
      case 'subcategory':{
        this.subcategory?.show();
        break;
      }
      case 'addcategory':{
        this.addcategory?.show();
        break;
      }
    }
  }
  CloseModal(modalname:string){
    switch(modalname){
      case 'addtag':{
        this.AddtagForm.reset();
        this.addtag?.hide();
        break;
      }
      case 'addvendor':{
        this.AddVendorForm.reset();
        this.addvendor?.hide();
        break;
      }
      case 'addvendor':{
        this.AddSubCategoryForm.reset();
        this.subcategory?.hide();
        break;
      }
      case 'addcategory':{
        this.AddCategoryForm.reset();
        this.addcategory?.hide();
        break;
      }
      case 'subcategory':{
        this.AddSubCategoryForm.reset();
        this.subcategory?.hide();
      }
      case 'additem':{
        this.AddItemForm.reset();
        this.additem?.hide();
      }
    }
  }

  Addtagfn(data:any){
    if(this.AddtagForm.valid){
      this.allServices.AddTag(data.controls.TagName.value).subscribe({
        next: (res: any) => {
          if (res.status == 'Success') {
            this.toastr.success(`${res.message}`, 'Successful', {
              positionClass: 'toast-top-center',
              timeOut: 2000,
            });
            this.CloseModal('addtag');
          }
        },
        error: (res: any) => {
          this.toastr.error(`${res}`, 'UnSuccessful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        }
      });
    }
  }

  AddVendorfn(data: any) {
    if (this.AddVendorForm.valid) {
      this.allServices.AddVendor(data).subscribe({
        next: (res: any) => {
          if (res.status == 'Success') {
            this.toastr.success(`${res.message}`, 'Successful', {
              positionClass: 'toast-top-center',
              timeOut: 2000,
            });
            this.CloseModal('addvendor');
          }
        },
        error: (res: any) => {
          this.toastr.error(`${res}`, 'UnSuccessful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        }
      });
    }
  }

  AddSubCategoryfn(data:any){
    if(this.AddSubCategoryForm.valid){
      this.allServices.AddSubCategoryfn(data).subscribe({
        next:(res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('subcategory');
          }
        },
        error:(res:any)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        }
      })
    }
  }

  AddCategoryfn(data:any){
    if(this.AddCategoryForm.valid){
      this.allServices.AddCategoryfn(data).subscribe({
        next:(res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('addcategory');
          }
        },
        error:(res)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        }
      })
    }
  }

  AddItemfn(data:any){
    if(data.valid){
      console.log(data.value);
      this.allServices.Additemfn(data).subscribe({
        next:(res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('additem');
          }
        },
        error:(res)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        }
      })
    }
  }
}

import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AuthfakeauthenticationService } from './../../../core/services/authfake.service';
import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment_new } from 'src/environments/environment';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

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
  Search_AllItemstablelist:any;
  @ViewChild('additem', { static: false }) additem?: ModalDirective;
  @ViewChild('addcategory', { static: false }) addcategory?: ModalDirective;
  @ViewChild('addvendor', { static: false }) addvendor?: ModalDirective;
  @ViewChild('addtag', { static: false }) addtag?: ModalDirective;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;
  @ViewChild('notify', { static: false }) notify?: ModalDirective;
  @ViewChild('export', { static: false }) export?: ModalDirective;
  @ViewChild('subcategory', { static: false }) subcategory?: ModalDirective;
  @ViewChild('editcategory', { static: false }) editcategory?: ModalDirective;
  @ViewChild('delete_modal', { static: false }) delete_modal?: ModalDirective;
  @ViewChild('editsubcategory', { static: false }) editsubcategory?: ModalDirective;


  AddtagForm:UntypedFormGroup;
  AddVendorForm:UntypedFormGroup;
  AddSubCategoryForm:UntypedFormGroup;
  AddCategoryForm:UntypedFormGroup;
  AddItemForm : UntypedFormGroup;
  AllItemsGridBaseFilterForm: UntypedFormGroup;
  AllItemsGridAdvanceFilterForm: UntypedFormGroup;
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
  StoreQty:number ;
  CabinetQty:number = null ;
  public payload:Object = {
    "token":"1a32e71a46317b9cc6feb7388238c95d",
  };
  public apiUrl: any = environment_new.apiUrl;


  options: Options = {
    floor: 0,
    ceil: 250
  };
  QuantityminValue: number = 0;
  QuantitymaxValue: number = 0;
  PriceminValue:number = 0;
  PricemaxValue:number = 0;
  StoreQtyminValue:number = 0;
  StoreQtymaxValue:number = 0;
  MinlevelMinimumValue:number = 0;
  MinlevelMaximumValue:number = 0;
  ItemStatus:any = [];
  ReloadAllItemsGrid:boolean;
  ReloadVendorListGrid:boolean;
  Search_OverAllList:any;

  constructor(private authfakeauthenticationService: AuthfakeauthenticationService,private http : HttpClient,private formbuilder : UntypedFormBuilder,private allServices : AllServicesService,private toastr: ToastrService,private cdr: ChangeDetectorRef) {
    this.format_value = ['KG'];

    this.authfakeauthenticationService.GridDetailedView_value.subscribe((res:any)=>{
      this.overallview = res;
    });

    this.ItemStatus= [
      { id: 1, label: "Active" },
      { id: 2, label: "Inactive" }
    ]

  }



  ngOnInit(): void {
    this.authfakeauthenticationService.changeSideMenu('material-management');
    this.GetOverAllList();

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
      VendorContactNo:['',[Validators.required,Validators.pattern('\\d*'),Validators.minLength(10)]],
      VendorAddress:[],
      Status:['Active']
    });

    this.AddSubCategoryForm = this.formbuilder.group({
      SubCategoryName:['',[Validators.required]],
      category:[],
      status:['Active']
    });

    this.AddCategoryForm = this.formbuilder.group({
      CategoryName : ['',[Validators.required]],
      CategorySubCode : ['',[Validators.required]],
      Status :['Active']
    });

    this.AddItemForm = this.formbuilder.group({
      // item_image:[],
      ItemNumber:[,[Validators.required]],
      ItemName:[,[Validators.required]],
      ItemCategory:[,[Validators.required]],
      Barcodes:[,[Validators.required]],
      procedure:[],
      ItemStatus:['Active'],
      Vendor:[],
      price:[,[Validators.required,Validators.pattern('^\\d*\\.?\\d*$'),Validators.min(0)]],
      size:[,[Validators.pattern('^\\d*\\.?\\d*$'),Validators.min(0)]],
      sizetype:[],
      subcategory:[],
      storeqty:[,[Validators.required,Validators.pattern('\\d*'),Validators.min(0)]],
      CabinetQty:[,[Validators.pattern('\\d*'),Validators.min(0)]],
      ExpiryDate:[],
      MinStoreQty:[,[Validators.required,Validators.pattern('\\d*'),Validators.min(0)]],
      CatNo:[],
      LotNo:[],
      Tags:[],
      Unit:[,[Validators.min(0),Validators.pattern('^\\d*\\.?\\d*$')]],
      Itemdescription:[,[Validators.maxLength(250)]],
      Itemnotes:[,[Validators.maxLength(250)]]
    });

    this.AllItemsGridBaseFilterForm = this.formbuilder.group({
      SearchFilter:[],
      BarCodeSearch:[]
    });

    this.AllItemsGridAdvanceFilterForm = this.formbuilder.group({
      category:[],
      ItemName:[],
      ProcedureSearch:[],
      StoreQty:[],
      CabinetQty:[],
      Price:[],
      MinLevel:[],
      QuantityAlert:[],
      Tags:[],
      Barcode:[],
      Notes:[]
    });

    this.getCategoryOptions();
    // this.getVendors();
    // this.getTags();
    // this.getProcedures();
  }
  get TagForm() { return this.AddtagForm.controls }

  imageUrl: any = null;
  showImage:boolean = false;
  result:any;

  handleImageInput(event:any): void {
    console.log(event.target.files[0]);
    this.result = event.target.files[0];
    // const file: File | null = event?.target?.[0];

    // if (file) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL = (e: any) => {
    //     this.imageUrl = e.target?.result;
    //   };
    //   this.showImage = true;
    //   console.log(this.imageUrl);

    //   reader.readAsDataURL(file);
    // }
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        this.imageUrl = reader.result;
      };
      this.showImage = true;
    }
  }

  IncreaseStoreQty(data:any){
    let Numdata:any = parseInt(data);
    if(Number.isNaN(Numdata)){
      console.log('in');
      Numdata = 0;
    }
      this.StoreQty = Numdata+1;
  }
  DecreaseStoreQty(data:any){
    let Numdata = parseInt(data);
    if(Numdata>0)
    {this.StoreQty = Numdata-1;}
  }

  IncreaseCabinetQty(data:any){
    let Numdata = parseInt(data);
    if(Number.isNaN(Numdata)){
      console.log('in');
      Numdata = 0;
    }
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
      case 'All Items':{
        this.enableTab = 'All Items';
        break;
      }
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


  ShowAdvancedFilters(){
    this.resize =! this.resize;
    if(this.resize != false){
      this.getCategoryOptions();
      this.getProcedures();
      this.getTags()
    }
    this.AllItemsGridAdvanceFilterForm.reset();
    this.StoreQtyminValue = 0;
    this.StoreQtymaxValue = 0;
    this.QuantityminValue = 0;
    this.QuantitymaxValue = 0;
    this.PricemaxValue = 0;
    this.PriceminValue = 0;
    this.MinlevelMaximumValue = 0;
    this.MinlevelMaximumValue = 0;
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


  OpenModal(modalname:string){
    switch(modalname){
      case 'additem':{
        this.getCategoryOptions();
        this.getTags();
        this.getVendors();
        this.getProcedures();
        this.additem?.show();
        this.AddItemForm.patchValue({
          ItemStatus:'Active'
        })
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
        this.getCategoryOptions();
        this.subcategory?.show();
        break;
      }
      case 'addcategory':{
        this.addcategory?.show();
        break;
      }
      case 'editcategory':{
        this.editcategory?.show();
        break;
      }
      case 'delete_modal':{
        this.delete_modal?.show();
        break;
      }
      case 'editsubcategory':{
        this.editsubcategory?.show();
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
        this.getCategoryOptions();
        this.getTags();
        this.getVendors();
        this.getProcedures();
        this.hideOpacity_Category = false;
        break;
      }
      // case 'addvendor':{
      //   this.AddSubCategoryForm.reset();
      //   this.subcategory?.hide();
      //   this.hideOpacity_Category = false;
      //   break;
      // }
      case 'addcategory':{
        this.AddCategoryForm.reset();
        this.addcategory?.hide();
        this.getCategoryOptions();
        this.getTags();
        this.getVendors();
        this.getProcedures();
        this.hideOpacity_Category = false;
        break;
      }
      case 'editcategory':{
        this.AddCategoryForm.reset();
        this.editcategory?.hide();
        break;
      }
      case 'subcategory':{
        this.AddSubCategoryForm.reset();
        this.subcategory?.hide();
        this.getCategoryOptions();
        this.getTags();
        this.getVendors();
        this.getProcedures();
        this.hideOpacity_Category = false;
        break;
      }
      case 'additem':{
        this.AddItemForm.reset();
        this.additem?.hide();
        this.imageUrl = '';
        break;
      }
      case 'delete_modal':{
        this.delete_modal?.hide();
        break;
      }
      case 'editsubcategory':{
        this.AddSubCategoryForm.reset();
        this.editsubcategory?.hide();
        break;
      }
    }
  }

  Category:any = [];
  CategoryOptions_Index:any = [];
  getCategoryOptions(){
    this.allServices.ItemCategoryOptions().subscribe({
      next:((res:any)=>{
        this.Category = [];
        this.CategoryOptions_Index = [];
        console.log(res);
        this.CategoryOptions_Index = res.categories;
      //   let values = Object.keys(res.categories).map(key => ({ key, value: res.categories[key] }));
      //   Object.keys(values).forEach(key => {
      //     this.CategoryOptions_Index.push(values[key]);
      //     this.Category.push(values[key].value);
      // });
      // console.log(this.CategoryOptions_Index);
      // console.log(this.Category);
      res.categories.forEach((element) => {
        this.Category.push(element.categories);
      });
          console.log(this.Category);
      }),
      error:((res:any)=>{
        this.toastr.error(`${res}`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    });
  }
  vendors:any = [];
  VendorsOption_Index:any = [];
  getVendors(){
    this.allServices.VendorOptions().subscribe({
      next:((res:any)=>{
        if(res.vendors.length>0){
          this.vendors= [];
          this.VendorsOption_Index= [];
          this.VendorsOption_Index = res.vendors;
          res.vendors.forEach((element:any) => {
            this.vendors.push(element.VendorName);
          });
          console.log('Vendors',this.vendors);
        }
        else{
          this.vendors = ['No Vendors to show'];
        }
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    });
  }

  Tags:any= [];
  TagsOption_Index:any = [];
  getTags(){
    this.allServices.TagsOptions().subscribe({
      next:((res:any)=>{
        if(res.tags.length>0){
          this.Tags = [];
          this.TagsOption_Index = [];
          this.TagsOption_Index = res.tags;
          res.tags.forEach((element:any) => {
            this.Tags.push(element.tag_name);
          });
          console.log('Vendors',this.Tags);
        }
        else{
          this.Tags = ['No Vendors to show'];
        }
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    });
  }

  Procedure:any = [];
  ProcedureOption_Index:any = [];
  getProcedures(){
    this.allServices.ProcedureOptions().subscribe({
      next:((res:any)=>{
        this.Procedure = [];
        this.ProcedureOption_Index = res.data;
        if(res.data.length>0){
          res.data.forEach((element:any) => {
            this.Procedure.push(element.procedure_name);
          });
        }
        else{
          this.Procedure=['No Procedures to show'];
        }

      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }

  SubCategories:any = [];
  SubcategoryOptions_Index:any = [];
  category_id:number;
  OnChangeItemCategory(data:any){
    this.category_id = null;
    console.log('Selected Category',data);
    // Object.keys(this.CategoryOptions_Index).forEach(index =>{
    //   if(this.CategoryOptions_Index[index].value == data)
    //   {
    //       category_id =  this.CategoryOptions_Index[index].key;
    //   }
    // });
    this.CategoryOptions_Index.forEach((element) => {
      if(data == element.categories){
        this.category_id = element.id;
      }
    });
    console.log('Category ID ',this.category_id);

    this.allServices.ItemSubCategoryOptions(this.category_id).subscribe(({
      next:((res:any)=>{
        this.SubCategories = [];
        this.SubcategoryOptions_Index = [];
        console.log(res);
        if(res.sub_categories.length>0){
          this.SubcategoryOptions_Index = res.sub_categories;
          // let values = Object.keys(res.sub_categories).map(key => ({ key, value: res.sub_categories[key] }));
          // Object.keys(values).forEach((index) => {
          //   this.SubcategoryOptions_Index.push(values[index]);
          //   this.SubCategories.push(values[index].value);
          // })
          // console.log(this.SubcategoryOptions_Index);
          // console.log(this.SubCategories);
          res.sub_categories.forEach(element => {
            this.SubCategories.push(element.sub_category_name);
          });
          console.log(this.SubCategories);

        }
        else{
          this.AddItemForm.patchValue({
            subcategory:''
          })
          this.SubCategories = ['No Sub Categories to show'];
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`${res}`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })

    }));
  }


//   DetailsSubCategories:any = [];
//   getSubCategoriesOptions(){
// this.allServices.GetAllSubCategory().subscribe({
//   next:((res:any)=>{
//     this.DetailsSubCategories = res.data;
//   }),
//   error:((res:any)=>{
//     this.toastr.error('Something went wrong', 'UnSuccessful', {
//       positionClass: 'toast-top-center',
//       timeOut: 2000,
//     });
//   })
// })
//   }

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
    this.ReloadVendorListGrid = false;
    if (this.AddVendorForm.valid) {
      console.log(this.AddVendorForm.value);

      this.allServices.AddVendor(data).subscribe({
        next: (res: any) => {
          console.log();

          if (res.status == 'Success') {
            this.toastr.success(`${res.message}`, 'Successful', {
              positionClass: 'toast-top-center',
              timeOut: 2000,
            });
            this.CloseModal('addvendor');
            this.ReloadVendorListGrid = true;
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

  SelectedCategory:number;
  AddSubCategoryfn(data:any){
    if(this.AddSubCategoryForm.valid){
      console.log(this.AddSubCategoryForm.value);
      console.log(this.AddSubCategoryForm.controls.category.value);

      this.CategoryOptions_Index.forEach((element:any) => {
        if(element.categories == this.AddSubCategoryForm.controls.category.value){
          this.SelectedCategory = element.id
        }
      });
      console.log(this.SelectedCategory);
      this.allServices.AddSubCategoryfn(data,this.SelectedCategory).subscribe({
        next:(res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('subcategory');
            this.GetOverAllList();
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
            this.GetOverAllList();
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


      // //   const byteCharacters = atob(this.imageUrl.split(',')[1]);
      // // const byteNumbers = new Array(byteCharacters.length);
      // // for (let i = 0; i < byteCharacters.length; i++) {
      // //   byteNumbers[i] = byteCharacters.charCodeAt(i);
      // // }
      // // const byteArray = new Uint8Array(byteNumbers);
      // // const blob = new Blob([byteArray], { type: 'image/png' });

      // // const imageUrl = URL.createObjectURL(blob);
      // this.AddItemForm.patchValue({
      //   item_image: this.result
      // })
      //   const byteCharacters = atob(this.imageUrl.split(',')[1]);
      //   const byteNumbers = new Array(byteCharacters.length);
      //   for (let i = 0; i < byteCharacters.length; i++) {
      //     byteNumbers[i] = byteCharacters.charCodeAt(i);
      //   }
      //   const byteArray = new Uint8Array(byteNumbers);
      //   console.log(byteNumbers);

      //   const blob = new Blob([byteArray], { type: 'image/jpeg' });
      //   console.log(blob);




      let category_value = data.value.ItemCategory;
      this.CategoryOptions_Index.forEach(element => {
        if(element.categories == category_value){
          this.AddItemForm.patchValue({
            ItemCategory:element.id
          })
        }
      });

      let subcategory_value = data.value.subcategory;
      if(this.SubcategoryOptions_Index){
        this.SubcategoryOptions_Index.forEach(element => {
          if(element.sub_category_name == subcategory_value){
            this.AddItemForm.patchValue({
              subcategory:element.id
            })
          }
        });
      }


      let vendor_value = data.value.Vendor;
      if(this.VendorsOption_Index){
        this.VendorsOption_Index.forEach(element => {
          if(element.VendorName == vendor_value){
            this.AddItemForm.patchValue({
              Vendor:element.id
            })
          }
        });
      }

      let procedure_value = data.value.procedure;
      let newArray:any = [];
      if(procedure_value){
        if(this.ProcedureOption_Index){
          this.ProcedureOption_Index.forEach(element => {
            procedure_value.forEach(ProcedurName => {
              if(ProcedurName == element.procedure_name)
              {
                newArray.push(element.id);
                let procedureStrings = newArray.map(num => num.toString());
                this.AddItemForm.patchValue({
                procedure:procedureStrings
                })
              }
            });
          });
        }
      }
      else
      {
        this.AddItemForm.patchValue({
          procedure:[]
          })
      }

      let item_status = data.value.ItemStatus;
      console.log(item_status);

      if(item_status == 'Active'){
        this.AddItemForm.patchValue({
          ItemStatus:"1"
        })
      }
      else if(item_status == 'Inactive'){
        this.AddItemForm.patchValue({
          ItemStatus:"2"
        })
      }

      let item_tag = data.value.Tags;
      if(!item_tag){
        this.AddItemForm.patchValue({
          Tags:[]
        })
      }
      console.log(data.value);
      // let formData = new FormData();
      // formData.append('token', '1a32e71a46317b9cc6feb7388238c95d');
      // formData.append('tag', '1');
      // formData.append('item_procedure_id', '2');
      // for(let i of formData.keys()){
      //   console.log(i);
      // }

      this.allServices.Additemfn(data,this.result).subscribe({
        next:(res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.ReloadAllItemsGrid = true;
            this.CloseModal('additem');
          }
        },
        error:(res)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:3000,
          });
          // this.AddItemForm.reset();
        }
      })
    }
  }

  EditCategoryfn(data:any){
    if(data.valid){
      this.allServices.EditCategory(data,this.Edit_Category_index.id).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('editcategory');
            this.GetOverAllList();
          }
        }),
        error:((res:any)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
      })
    }
  }

  selected_category_id:any;
  EditSubCategoryfn(data:any){
    if(data.valid){
      console.log(data.value);
      console.log(this.Edit_Category_index);
      this.selected_category_id = null;
      this.CategoryOptions_Index.forEach((element,index) => {
        if(element.categories == data.value.category){
          this.selected_category_id =element.id;
        }
      });

      this.allServices.EditSubCategory(data,this.selected_category_id,this.Edit_SubCategory_index).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('editsubcategory');
            this.GetOverAllList();
          }
        }),
        error:((res:any)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
      })
    }
  }

  deleteCategoryIndex:number;
  DeleteCategory(data:any){
    this.deleteCategoryIndex = data.id;
  }

  deleteSubCategoryIndex:number;
  DeleteSubCategory(data:any){
    this.deleteSubCategoryIndex = data.id;
  }

  DeleteTheCategory(){
    console.log(this.deleteCategoryIndex);
    console.log(this.deleteSubCategoryIndex);

    if(this.deleteCategoryIndex){
      this.allServices.DeleteCategory(this.deleteCategoryIndex).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.deleteCategoryIndex = null;
            this.delete_modal?.hide();
            this.GetOverAllList();
          }
        }),
        error:((res:any)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
      })
    }
    else{
      this.allServices.DeleteSubCategory(this.deleteSubCategoryIndex).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.deleteCategoryIndex = null;
            this.delete_modal?.hide();
            this.GetOverAllList();
          }
        }),
        error:((res:any)=>{
          this.toastr.error(`${res}`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
      })
    }

  }


  GetOverAllList(){
    this.allServices.GetOverAllList().subscribe({
      next:((res:any)=>{
        this.folder_structure_value = res.data;
        console.log(this.folder_structure_value);

      }),
      error:((res:any)=>{
        this.toastr.error(`${res}`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }


  currentview:string = 'all'
  GoToRespectiveView(data:any){
    switch(data){
      case 'histroy':{
        this.currentview = 'histroy';
        break;
      }
      case 'trash':{
        this.currentview = 'trash';
        break;
      }
      case 'all':{
        this.currentview = 'all';
        break;
      }
    }
  }

  ChangeOverAllViewHis(data:any){
    this.currentview = data;
  }
  ChangeOverAllViewTra(data:any){
    this.currentview = data;
  }

  Edit_Category_index:any
  EditCategory(index:any){
    console.log(index);
    this.Edit_Category_index = index;
    this.allServices.GetCategory(index).subscribe({
      next:((res:any)=>{
        this.AddCategoryForm.patchValue({
          CategoryName : res.data.name,
          CategorySubCode : res.data.category_shortcode,
          Status : res.data.status
        });
        this.OpenModal('editcategory')
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    });
  }


  Edit_SubCategory_index:any
  EditSubCategory(index:any,category_index:any){
    this.Edit_SubCategory_index = null;
    this.Edit_Category_index = category_index;
    console.log(this.Edit_Category_index);

    this.allServices.GetSubCategory(index).subscribe({
      next:((res:any)=>{
        this.Edit_SubCategory_index = res.data.id;
        this.AddSubCategoryForm.patchValue({
          SubCategoryName : res.data.sub_category_name,
          category : res.data.category.name,
          status : res.data.status
        });
        this.getCategoryOptions();
        this.OpenModal('editsubcategory')
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    });
  }

  ResetBaseFilters(){
    this.AllItemsGridBaseFilterForm.reset();
  }
  SearchBaseFilters(data:any){
    console.log(data.value);
  }

  SearchAdvancedGridFiltes(data:any){
    // Changing category Id
    let category_value = data.value.category;
      this.CategoryOptions_Index.forEach(element => {
        if(element.categories == category_value){
          this.AllItemsGridAdvanceFilterForm.patchValue({
            category:element.id
          })
        }
      });

      let procedure_value = data.value.ProcedureSearch;
      if(this.ProcedureOption_Index){
        this.ProcedureOption_Index.forEach(element => {
            if(procedure_value == element.procedure_name)
            {
              this.AllItemsGridAdvanceFilterForm.patchValue({
                ProcedureSearch:element.id
              })
            }
        });
      }
      this.authfakeauthenticationService.PassAllItemsGridPayload(data);
      this.ReserAdvancedGridFilters();
  }

  ReserAdvancedGridFilters(){
    this.AllItemsGridAdvanceFilterForm.patchValue({
      category:[],
      ItemName:[],
      ProcedureSearch:[],
      Price:[],
      Tags:[],
      Barcode:[],
      Notes:[]
    });
    this.ClearAdvancedFilterFields('StoreQty');
    this.ClearAdvancedFilterFields('CabinetQty');
    this.ClearAdvancedFilterFields('Price');
    this.ClearAdvancedFilterFields('MinLevel');
  }

  ClearAdvancedFilterFields(data:any){
    switch(data){
      case 'category':{
        this.AllItemsGridAdvanceFilterForm.patchValue({
          category:''
        })
        break;
      }
      case 'Search':{
        this.AllItemsGridAdvanceFilterForm.patchValue({
          Search:''
        })
        break;
      }
      case 'ProcedureSearch':{
        this.AllItemsGridAdvanceFilterForm.patchValue({
          ProcedureSearch:''
        })
        break;
      }
      case 'StoreQty':{
        this.StoreQtyminValue = 0;
        this.StoreQtymaxValue = 0;
        break;
      }
      case 'CabinetQty':{
        this.QuantityminValue = 0;
        this.QuantitymaxValue = 0;
        break;
      }
      case 'Price':{
        this.PricemaxValue = 0;
        this.PriceminValue = 0;
        break;
      }
      case 'MinLevel':{
        this.MinlevelMaximumValue = 0;
        this.MinlevelMaximumValue = 0;
        break;
      }
      case 'QuantityAlert':{
        this.AllItemsGridAdvanceFilterForm.patchValue({
          QuantityAlert:''
        })
        break;
      }
      case 'Tags':{
        this.AllItemsGridAdvanceFilterForm.patchValue({
          Tags:''
        })
        break;
      }
      case 'Barcode':{
        this.AllItemsGridAdvanceFilterForm.patchValue({
          Barcode:''
        })
        break;
      }
      case 'Notes':{
        this.AllItemsGridAdvanceFilterForm.patchValue({
          Notes:''
        })
        break;
      }
    }
  }

  hideOpacity_Category : boolean = false;
  OpenNestedCategory(){
    this.OpenModal("addcategory");
    this.hideOpacity_Category = true;
  }

  OpenNestedSubCategory(){
    this.OpenModal('subcategory');
    this.hideOpacity_Category = true;
  }

  OpenNestedAddVednor(){
    this.OpenModal('addvendor');
    this.hideOpacity_Category = true;
  }

  SearchOverAllList(data:any){
    this.allServices.GetSearchOverAllList(data).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success')
        {
          this.folder_structure_value = res.data;
          console.log(res);
        }
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }

  changefolder:any;
  changesubfolder:any;
  Selectfolder(data:any){
    if(this.changefolder == data){
      this.changefolder = '';
      this.changesubfolder = '';
    }
    else{
      this.changefolder = data;
      this.changesubfolder = '';
    }
  }
  SelectSubFolder(value:any,data:any){
    if(this.changesubfolder == data){
      this.changesubfolder = '';
      this.changefolder = '';
    }
    else{
      this.changesubfolder = data;
      this.changefolder = value.name;
    }
  }

  onSearchGrid(data:any){
    this.Search_AllItemstablelist = data;
  }
}

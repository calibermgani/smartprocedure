import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-allitems-table-view',
  templateUrl: './allitems-table-view.component.html',
  styleUrls: ['./allitems-table-view.component.scss']
})
export class AllItemsTableViewComponent {

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;
  @ViewChild('setalert', { static: false }) setalert?: ModalDirective;
  @ViewChild('bulkupdate', { static: false }) bulkupdate?: ModalDirective;
  @ViewChild('move', { static: false }) move?: ModalDirective;
  @ViewChild('clone_modal', { static: false }) clone_modal: ModalDirective;
  @ViewChild('add_tag', { static: false }) add_tag: ModalDirective;
  @ViewChild('delete_modal', { static: false }) delete_modal: ModalDirective;
  @ViewChild('editItem', { static: false }) editItem?: ModalDirective;

  all_Items_gridData:any = [];
  selected_row_data:any[];
  folder_structure_value:any = [];
  selected_row_data_length:any;
  showEditablefields:boolean = false;
  AddItemForm : UntypedFormGroup;
  files: File[] = [];
  imageURL: any;
  Procedure:any = [];
  ItemStatus:any = [];
  format_value:any = [];
  StoreQty:number;
  CabinetQty:number;


  constructor(private http : HttpClient,private allServices : AllServicesService,private toastr : ToastrService,private formbuilder : UntypedFormBuilder){

    this.AddItemForm = this.formbuilder.group({
      imageURL:[''],
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

  ngOnInit(): void {
    this.http.get('assets/json/folder_name.json').subscribe((res:any)=>{
      this.folder_structure_value = res;
      console.log('response',this.folder_structure_value);
    });
  }
  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    // floatingFilter: true,
  };
  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">Please Go back to Material Dashboard Page</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: true,
    suppressRowClickSelection:true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns Visibility',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: false,
          suppressColumnSelectAll: false,
        },
      } as ToolPanelDef,
    ],
    defaultToolPanel: null,
  };



  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10,
    },
    {
      field: 'item_no',
      headerName: 'Item No',
      cellRenderer: this.cellrendered.bind(this, 'item_no'),
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name'),
      onCellClicked: this.CellClicked.bind(this, 'item_name')
    },
    {
      field: 'item_category',
      headerName: 'Items Category',
      cellRenderer: this.cellrendered.bind(this, 'item_category')
    },
    {
      field: 'item_description',
      headerName: 'Item Description',
      cellRenderer: this.cellrendered.bind(this, 'item_description')
    },
    {
      field: 'procedure',
      headerName: 'Procedure',
      cellRenderer: this.cellrendered.bind(this, 'procedure')
    },
    {
      field: 'cat_no',
      headerName: 'Cat No',
      cellRenderer: this.cellrendered.bind(this, 'cat_no')
    },
    {
      field: 'lot_no',
      headerName: 'Lot No',
      cellRenderer: this.cellrendered.bind(this, 'lot_no')
    },
    {
      field: 'size',
      headerName: 'Size',
      cellRenderer: this.cellrendered.bind(this, 'size')
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      cellRenderer: this.cellrendered.bind(this, 'vendor')
    },
    {
      field: 'price',
      headerName: 'Price',
      cellRenderer: this.cellrendered.bind(this, 'price')
    },
    {
      field: 'unit',
      headerName: 'Unit',
      cellRenderer: this.cellrendered.bind(this, 'unit')
    },
    {
      field: 'expiry_date',
      headerName: 'Expiry Date',
      cellRenderer: this.cellrendered.bind(this, 'expiry_date')
    },
    {
      field: 'store',
      headerName: 'Store',
      cellRenderer: this.cellrendered.bind(this, 'store')
    },
    {
      field: 'cabinet',
      headerName: 'Cabinet',
      cellRenderer: this.cellrendered.bind(this, 'cabinet')
    },
    {
      field: 'min_level',
      headerName: 'Min Level',
      cellRenderer: this.cellrendered.bind(this, 'min_level')
    },
    {
      field: 'tags',
      headerName: 'Tags',
      cellRenderer: this.cellrendered.bind(this, 'tags')
    },
    {
      field: 'notes',
      headerName: 'Notes',
      cellRenderer: this.cellrendered.bind(this, 'notes')
    },
    {
      field: 'images',
      headerName: 'Images',
      cellRenderer: this.cellrendered.bind(this, 'images')
    },
    {
      field: 'barcodes',
      headerName: 'Barcodes',
      cellRenderer: this.cellrendered.bind(this, 'barcodes')
    },
    {
      field: 'view',
      width:10,
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'view'),
      onCellClicked: this.CellClicked.bind(this, 'view')
    },
    {
      field: 'edit',
      width:10,
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'edit'),
      onCellClicked: this.CellClicked.bind(this, 'edit')
    },
    {
      field: 'delete',
      width:20,
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'delete'),
      onCellClicked: this.CellClicked.bind(this, 'delete')
    },
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'item_no': {
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'item_category': {
        return params.value;
      }
      case 'item_description': {
        return params.value;
      }
      case 'procedure': {
        return params.value;
      }
      case 'cat_no': {
        return params.value;
      }
      case 'lot_no': {
        return params.value;
      }
      case 'size': {
        return params.value;
      }
      case 'vendor': {
        return params.value;
      }
      case 'price': {
        return params.value;
      }
      case 'unit': {
        return params.value;
      }
      case 'expiry_date': {
        return params.value;
      }
      case 'store': {
        return params.value;
      }
      case 'cabinet': {
        return params.value;
      }
      case 'min_level': {
        return params.value;
      }
      case 'tags': {
        return params.value;
      }
      case 'notes': {
        return params.value;
      }
      case 'images': {
        return `<img src="${params.value}" width="52px" height="16px">`
      }
      case 'barcodes': {
        return params.value;
      }
      case 'view':{
        return `<div class="d-flex">
        <div><i class="mdi mdi-eye-outline me-3" style="color:#855EDB;font-size:18px"></i></div></div>`
      }
      case 'edit':{
        return `<div class="d-flex"><div><i class="mdi mdi-pencil-outline me-3" style="color:#000;font-size:18px"></i></div></div>`
      }
      case 'delete':{
        return `<div class="d-flex"><div><i class="mdi mdi-trash-can-outline me-3" style="color:red;font-size:18px"></i></div></div>`
      }
    }
  }

  ViewItemData:any = [];
  Currently_Selected_row:any;
  CellClicked(headerName: any, params: any) {
    switch (headerName) {
      case 'item_name': {
        this.Currently_Selected_row = params.data;
        this.ViewItemData = [];
        this.allServices.ViewItem(params.data.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              this.ViewItemData = res.data;
            }
          },
          error:(res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          }
        })
        this.OpenModal('item_name');
        break;
      }
      case 'view': {
        this.Currently_Selected_row = params.data;
        this.ViewItemData = [];
        this.allServices.ViewItem(params.data.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              this.ViewItemData = res.data;
            }
          },
          error:(res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          }
        })
        this.OpenModal('item_name');
        break;
      }
      case 'edit': {
        this.getCategoryOptions();
        this.getVendors();
        this.getTags();
        console.log(params.data.id);
        this.allServices.ViewItem(params.data.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              this.AddItemForm.patchValue({
                imageURL:'',
                ItemNumber:res.data.item_number,
                ItemName:res.data.item_name,
                ItemCategory:res.data.item_category_id,
                Barcodes:res.data.item_barcode,
                procedure:res.data.item_procedure_id,
                ItemStatus:res.data.item_status,
                Vendor:res.data.vendor_id,
                price:res.data.price,
                size:res.data.size,
                sizetype:res.data.size_type,
                subcategory:res.data.item_sub_category_id,
                storeqty:res.data.store_qty,
                CabinetQty:res.data.cabinet_qty,
                ExpiryDate:res.data.expired_date,
                MinStoreQty:res.data.min_level,
                CatNo:res.data.cat_no,
                LotNo:res.data.lot_no,
                Tags:res.data.tag,
                Unit:res.data.unit,
                Itemdescription:res.data.item_description,
                Itemnotes:res.data.item_notes
              });
            }
          },
          error:(res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          }
        })
        this.editItem?.show();
        break;
      }
      case 'delete': {
        this.Currently_Selected_row = params.data;
        this.OpenModal('delete_modal');
        break;
      }
    }
  }

  onSelectionChanged(params:any){
    // console.log(params);
 }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;

    this.gridApi_1.addEventListener('selectionChanged', () => {
      this.selected_row_data = [];
      const selectedNodes = this.gridApi_1.getSelectedNodes();
      selectedNodes.forEach((element) => {
        this.selected_row_data.push(element.data);
      })
      console.log(this.selected_row_data);
      if (this.selected_row_data.length >= 0) {
        if (this.selected_row_data.length == 0) {
          this.showEditablefields = false;
        }
        else {
          this.selected_row_data_length = this.selected_row_data.length;
          this.showEditablefields = true;
        }
      }
    });
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

  OpenModal(modalname:string){
    switch(modalname){
      case 'editItem':{
        this.viewitem?.show();
        break;
      }
      case 'item_name':{
        this.viewitem?.show();
        break;
      }
      case 'delete_modal':{
        this.delete_modal?.show();
        break;
      }
    }
  }

  CloseModal(modalname:string){
    switch(modalname){
      case 'editItem':{
        this.AddItemForm.reset();
        this.editItem?.hide();
        break;
      }
      case 'item_name':{
        this.viewitem?.hide();
        break;
      }
      case 'delete_modal':{
        this.delete_modal?.hide();
        break;
      }
    }
  }

  OpenNestedModal(){
    this.viewitem?.hide();
    this.getCategoryOptions();
        this.getVendors();
        this.getTags();
        this.allServices.ViewItem(this.Currently_Selected_row.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              this.AddItemForm.patchValue({
                imageURL:'',
                ItemNumber:res.data.item_number,
                ItemName:res.data.item_name,
                ItemCategory:res.data.item_category_id,
                Barcodes:res.data.item_barcode,
                procedure:res.data.item_procedure_id,
                ItemStatus:res.data.item_status,
                Vendor:res.data.vendor_id,
                price:res.data.price,
                size:res.data.size,
                sizetype:res.data.size_type,
                subcategory:res.data.item_sub_category_id,
                storeqty:res.data.store_qty,
                CabinetQty:res.data.cabinet_qty,
                ExpiryDate:res.data.expired_date,
                MinStoreQty:res.data.min_level,
                CatNo:res.data.cat_no,
                LotNo:res.data.lot_no,
                Tags:res.data.tag,
                Unit:res.data.unit,
                Itemdescription:res.data.item_description,
                Itemnotes:res.data.item_notes
              });
            }
          },
          error:(res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          }
        })
        this.editItem?.show();
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

  SubCategories:any = [];
  SubcategoryOptions_Index:any = [];
  OnChangeItemCategory(data:any){
    console.log('Selected Category',data);

    let category_id:number;
    // Object.keys(this.CategoryOptions_Index).forEach(index =>{
    //   if(this.CategoryOptions_Index[index].value == data)
    //   {
    //       category_id =  this.CategoryOptions_Index[index].key;
    //   }
    // });
    this.CategoryOptions_Index.forEach((element) => {
      if(data == element.categories){
        category_id = element.id;
      }
    });
    console.log('Category ID ',category_id);

    this.allServices.ItemSubCategoryOptions(category_id).subscribe(({
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


  AddItemfn(data:any){
    if(data.valid){
      let category_value = data.value.ItemCategory;
      this.CategoryOptions_Index.forEach(element => {
        if(element.categories == category_value){
          this.AddItemForm.patchValue({
            ItemCategory:element.id
          })
        }
      });
      let subcategory_value = data.value.subcategory;
      this.SubcategoryOptions_Index.forEach(element => {
        if(element.sub_category_name == subcategory_value){
          this.AddItemForm.patchValue({
            subcategory:element.id
          })
        }
      });
      let vendor_value = data.value.Vendor;
      this.VendorsOption_Index.forEach(element => {
        if(element.VendorName == vendor_value){
          this.AddItemForm.patchValue({
            Vendor:element.id
          })
        }
      });

      let item_status = data.value.ItemStatus;
      if(item_status.label == 'Active'){
        this.AddItemForm.patchValue({
          ItemStatus:1
        })
      }
      else if(item_status.label == 'Inactive'){
        this.AddItemForm.patchValue({
          ItemStatus:2
        })
      }

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

  EditItemfn(data:any){

  }

  DeleteItemfn(){
    this.allServices.DeleteItem(this.Currently_Selected_row.id).subscribe({
      next:((res:any)=>{
        console.log(res);
      }),
      error:((res:any)=>{
        console.log(res);
      })
    })
  }




  ngAfterViewInit(): void {
    this.http.get('assets/json/all-items.json').subscribe((res:any)=>{
      this.all_Items_gridData = res;
      this.myGrid_1.api?.setRowData(this.all_Items_gridData);
    });
  }
}

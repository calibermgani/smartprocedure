import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GetRowIdFunc, GetRowIdParams, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, IsRowMaster, SelectionChangedEvent, SideBarDef, ToolPanelDef, ValueFormatterParams } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { environment_new } from 'src/environments/environment';
import 'ag-grid-enterprise';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

interface MainData {
  item_no:string,
  item_name:string,
  item_category:string,
  item_description:string,
  item_procedures:string,
  cat_no:string,
  lot_no:string,
  size:string,
  item_vendor:string,
  price:number,
  unit:number,
  expired_date:string,
  store_qty:string,
  cabinet_qty:string,
  min_level:string,
  tag:string,
  item_notes:string,
  image_url:string,
  item_barcode:string,
  view:string,
  edit:string,
  delete:string
  item_clones:SubData[]
}
interface SubData {
  "item_no":string,
  "item_name":string,
  "item_category":string,
  "item_description":string,
  "item_procedures":string,
  "cat_no":string,
  "lot_no":string,
  "size":string,
  "item_vendor":string,
  "price":number,
  "unit":number,
  "expired_date":string,
  "store_qty":string,
  "cabinet_qty":string,
  "min_level":string,
  "tag":string,
  "item_notes":string,
  "image_url":string,
  "item_barcode":string,
  "view":string,
  "edit":string,
  "delete":string
}


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
  @ViewChild('bulk_edit', { static: false }) bulk_edit?: ModalDirective;
  @Output() newItemEvent = new EventEmitter;

  @Input() Updategrid: boolean = false;
  @Input() SearchAllItemsGrid:any;
  all_Items_gridData:any = [];
  selected_row_data:any[] = [];
  folder_structure_value:any = [];
  selected_row_data_length:any;
  showEditablefields:boolean = false;
  AddItemForm : UntypedFormGroup;
  AddtagForm:UntypedFormGroup;
  dynamicForm:UntypedFormGroup;
  files: File[] = [];
  imageURL: any;
  ItemStatus:any = [
    { id: 1, label: "Active" },
    { id: 2, label: "Inactive" }
  ];
  format_value:any = [];
  StoreQty:number;
  CabinetQty:number;
  AllItemsChecked:any;
  ShowOverAlllist:boolean;
  hideEditColumn:boolean = false;
  DestinationValue;any;


  columnMainDefs: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10,
    },
    {
      field: 'item_number',
      headerName: 'Item No',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams:(params:any)=>{
        if(params.data.item_clones.length>0){
          return { innerRenderer: (params: any) => `<div class="d-flex justify-content-center align-items-center">
          <div class="me-2">${params.data.item_number}</div>
          <div style="padding: 2px 4px 2px 4px;
          background: #000;
          color: #fff;
          border-radius: 5px;
          height: 17px;
          line-height:12px !important;text-align:center;
          width: 50px;}">
          ${params.data.item_clones.length}&nbsp items</div>
          </div>` };
        }
      }
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name'),
      onCellClicked: this.CellClicked.bind(this, 'item_name')
    },
    {
      field: 'item_category.name',
      headerName: 'Items Category',
      cellRenderer: this.cellrendered.bind(this, 'item_category.name')
    },
    {
      field: 'item_description',
      headerName: 'Item Description',
      cellRenderer: this.cellrendered.bind(this, 'item_description')
    },
    {
      field: 'item_procedures',
      headerName: 'Procedure',
      cellRenderer: this.cellrendered.bind(this, 'item_procedures')
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
      field: 'item_vendor.VendorName',
      headerName: 'Vendor',
      cellRenderer: this.cellrendered.bind(this, 'item_vendor.VendorName')
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
      field: 'expired_date',
      headerName: 'Expiry Date',
      cellRenderer: this.cellrendered.bind(this, 'expired_date')
    },
    {
      field: 'store_qty',
      headerName: 'Store',
      cellRenderer: this.cellrendered.bind(this, 'store_qty')
    },
    {
      field: 'cabinet_qty',
      headerName: 'Cabinet',
      cellRenderer: this.cellrendered.bind(this, 'cabinet_qty')
    },
    {
      field: 'min_level',
      headerName: 'Min Level',
      cellRenderer: this.cellrendered.bind(this, 'min_level')
    },
    {
      field: 'tag',
      headerName: 'Tags',
      cellRenderer: this.cellrendered.bind(this, 'tag')
    },
    {
      field: 'item_notes',
      headerName: 'Notes',
      cellRenderer: this.cellrendered.bind(this, 'item_notes')
    },
    {
      field: 'image_url',
      headerName: 'Images',
      cellRenderer: this.cellrendered.bind(this, 'image_url')
    },
    {
      field: 'item_barcode',
      headerName: 'Barcodes',
      cellRenderer: this.cellrendered.bind(this, 'item_barcode')
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

  ChangeData(params: ValueFormatterParams):any{
    console.log(params);
    if(params.data.item_clones.length>0){
      return `<div style="background:red;">${params.data.item_number}</div>`
    }
  }

  public isRowMaster: IsRowMaster = (dataItem: any) => {
    return dataItem ? dataItem.item_clones.length > 0 : false;
  };

  // [getRowId]="getRowId"
  // public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
  //   console.log(params);
  //   // return null;
  //   return params.data.item_clones;
  // };

  public detailCellRendererParams: any = {
    detailGridOptions: {
      rowSelection: 'multiple',
      suppressRowClickSelection: true,
      enableRangeSelection: true,
      pagination: false,
      paginationAutoPageSize: false,

      columnDefs : [ {
          field: '',
          checkboxSelection: true,
          resizable:false,
          headerCheckboxSelection: true,
          width:10,
        },
        {
          field: 'item_number',
          headerName: 'Item No',
          cellRenderer: this.cellrendered.bind(this, 'item_number'),
        },
        {
          field: 'item_name',
          headerName: 'Item Name',
          cellRenderer: this.cellrendered.bind(this, 'item_name'),
          onCellClicked: this.CellClicked.bind(this, 'item_name')
        },
        {
          field: 'item_category.name',
          headerName: 'Items Category',
          cellRenderer: this.cellrendered.bind(this, 'item_category.name')
        },
        {
          field: 'item_description',
          headerName: 'Item Description',
          cellRenderer: this.cellrendered.bind(this, 'item_description')
        },
        {
          field: 'item_procedures',
          headerName: 'Procedure',
          cellRenderer: this.cellrendered.bind(this, 'item_procedures')
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
          field: 'item_vendor.VendorName',
          headerName: 'Vendor',
          cellRenderer: this.cellrendered.bind(this, 'item_vendor.VendorName')
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
          field: 'expired_date',
          headerName: 'Expiry Date',
          cellRenderer: this.cellrendered.bind(this, 'expired_date')
        },
        {
          field: 'store_qty',
          headerName: 'Store',
          cellRenderer: this.cellrendered.bind(this, 'store_qty')
        },
        {
          field: 'cabinet_qty',
          headerName: 'Cabinet',
          cellRenderer: this.cellrendered.bind(this, 'cabinet_qty')
        },
        {
          field: 'min_level',
          headerName: 'Min Level',
          cellRenderer: this.cellrendered.bind(this, 'min_level')
        },
        {
          field: 'tag',
          headerName: 'Tags',
          cellRenderer: this.cellrendered.bind(this, 'tag')
        },
        {
          field: 'item_notes',
          headerName: 'Notes',
          cellRenderer: this.cellrendered.bind(this, 'item_notes')
        },
        {
          field: 'image_url',
          headerName: 'Images',
          cellRenderer: this.cellrendered.bind(this, 'image_url')
        },
        {
          field: 'item_barcode',
          headerName: 'Barcodes',
          cellRenderer: this.cellrendered.bind(this, 'item_barcode')
        },
        {
          field: 'view',
          width:10,
          resizable:false,
          pinned:"right",
          headerName:'',
          cellRenderer: this.cellrendered.bind(this, 'view'),
          onCellClicked: this.CellClicked.bind(this, 'view')
        },
        // {
        //   field: 'edit',
        //   width:10,
        //   resizable:false,
        //   pinned:"right",
        //   headerName:'',
        //   cellRenderer: this.cellrendered.bind(this, 'edit'),
        //   onCellClicked: this.CellClicked.bind(this, 'edit')
        // },
        {
          field: 'delete',
          width:20,
          resizable:false,
          headerName:'',
          pinned:"right",
          cellRenderer: this.cellrendered.bind(this, 'delete'),
          onCellClicked: this.CellClicked.bind(this, 'delete')
        },
      ],
      defaultColDef: {
        resizable:true,
      },
      onSelectionChanged: this.onSelectionChangedMaster.bind(this),
      detailRowAutoHeight:false,
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.item_clones);
    },
  } as IDetailCellRendererParams<MainData, SubData>;


  onSelectionChangedMaster(event: SelectionChangedEvent){
    console.log(event);
  }

  constructor(private http : HttpClient,private allServices : AllServicesService,private toastr : ToastrService,private formbuilder : UntypedFormBuilder,private cdr: ChangeDetectorRef,private authfakeauthenticationService : AuthfakeauthenticationService){

    this.newItemEvent.next(this.myGrid_1);
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
      size:[,[Validators.required,Validators.pattern('^\\d*\\.?\\d*$'),Validators.min(0)]],
      sizetype:[,Validators.required],
      subcategory:[],
      storeqty:[,[Validators.required,Validators.pattern('\\d*'),Validators.min(0)]],
      CabinetQty:[,[Validators.pattern('\\d*'),Validators.min(0)]],
      ExpiryDate:[,[Validators.required]],
      MinStoreQty:[,[Validators.required,Validators.pattern('\\d*'),Validators.min(0)]],
      CatNo:[],
      LotNo:[],
      Tag:[],
      Unit:[,[Validators.required,Validators.min(0),Validators.pattern('\\d*')]],
      Itemdescription:[],
      Itemnotes:[]
    });

    this.AddtagForm= this.formbuilder.group({
      Tags:['',Validators.required],
    });

    // this.dynamicForm = this.createGroup();
  }

  ngOnInit(): void {
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
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">Please Add Some Items</span>',
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

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes

    // setTimeout(() => {
    //   params.api.getDisplayedRowAtIndex(0)!.setExpanded(true);
    //   params.api.sizeColumnsToFit()
    // }, 0);
  }

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'item_number': {
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'item_category.name': {
        return params.value;
      }
      case 'item_description': {
        return params.value;
      }
      case 'item_procedures': {
        let newArray :any = [];
        params.value.forEach(element => {
          newArray.push(element.procedure_name);
        });
        return `${newArray}`;
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
      case 'item_vendor.VendorName': {
        return params.value;
      }
      case 'price': {
        return params.value;
      }
      case 'unit': {
        return params.value;
      }
      case 'expired_date': {
        return params.value;
      }
      case 'store_qty': {
        return params.value;
      }
      case 'cabinet_qty': {
        return params.value;
      }
      case 'min_level': {
        return params.value;
      }
      case 'tag': {
        return params.value;
      }
      case 'item_notes': {
        return params.value;
      }
      case 'image_url': {
        if(params.value)
        {return `<img src="${params.value}" width="52px" height="16px">`}
        else{
          return null;
        }

      }
      case 'item_barcode': {
        return params.value;
      }
      case 'view':{
        return `<div class="d-flex justify-content-center">
        <div><i class="mdi mdi-eye-outline" style="color:#855EDB;font-size:18px"></i></div></div>`
      }
      case 'edit':{
        return `<div class="d-flex justify-content-center"><div><i class="mdi mdi-pencil-outline" style="color:#000;font-size:18px"></i></div></div>`
      }
      case 'delete':{
        return `<div class="d-flex justify-content-center"><div><i class="mdi mdi-trash-can-outline" style="color:red;font-size:18px"></i></div></div>`
      }
    }
  }

  ViewItemData:any = [];
  Currently_Selected_row:any;
  x:any
  y:any
  CellClicked(headerName: any, params: any) {
    switch (headerName) {
      case 'item_name': {
        this.Currently_Selected_row = params.data;
        this.ViewItemData = [];
        this.allServices.ViewItem(params.data.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              let procedure_values:any = [];
              if(res.data.item_procedures.length>0)
              {
                let x = res.data.item_procedures;
                x.forEach(element => {
                  procedure_values.push(element.procedure_name)
                });
              }
              this.ViewItemData = res.data;
              this.ViewItemData.item_procedures = procedure_values;
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
              let procedure_values:any = [];
              if(res.data.item_procedures.length>0)
              {
                let x = res.data.item_procedures;
                x.forEach(element => {
                  procedure_values.push(element.procedure_name)
                });
              }
              this.ViewItemData = res.data;
              this.x= res.data.image_url;
              console.log(this.x);
              const bytes = new TextEncoder().encode(this.x);
              // Convert the Uint8Array to a base64 string
              const base64String = btoa(String.fromCharCode(...bytes));
              console.log(base64String);
               let image = `data:image/jpeg;base64,${this.x}`
              // this.y = 'data:image/jpeg;base64,' + this.x
              console.log(image);
              this.ViewItemData.image_url = image;

              this.ViewItemData.item_procedures = procedure_values;
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
        this.getProcedures();
        this.Currently_Selected_row = params.data;
        console.log(params.data.id);
        this.allServices.ViewItem(params.data.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              let procedure_values:any = [];
              if(res.data.item_procedures.length>0)
              {
                let x = res.data.item_procedures;
                x.forEach(element => {
                  procedure_values.push(element.procedure_name)
                });
              }
              let tag_values:any = [];
              if(res.data.tag)
              {
                tag_values = res.data.tag.split(',');
              }
              else
              {
                tag_values = null;
              }
              this.AddItemForm.patchValue({
                imageURL:'',
                ItemNumber:res.data.item_number,
                ItemName:res.data.item_name,
                ItemCategory:res.data.item_category?.name,
                Barcodes:res.data.item_barcode,
                procedure: procedure_values ? procedure_values : '',
                ItemStatus:res.data.item_status == '1' ? 'Active' : 'Inactive',
                Vendor:res.data.item_vendor?.VendorName,
                price:res.data.price,
                size:res.data.size,
                sizetype:res.data.size_type,
                subcategory:res.data.item_sub_category?.sub_category_name,
                storeqty:res.data.store_qty,
                CabinetQty:res.data.cabinet_qty,
                ExpiryDate:res.data.expired_date,
                MinStoreQty:res.data.min_level,
                CatNo:res.data.cat_no,
                LotNo:res.data.lot_no,
                Tag:tag_values,
                Unit:res.data.unit,
                Itemdescription:res.data.item_description,
                Itemnotes:res.data.item_notes
              });
            }

            console.log(res.data.item_category?.id);

            this.allServices.ItemSubCategoryOptions(res.data.item_category?.id).subscribe(({
              next:((res:any)=>{
                this.SubCategories = [];
                this.SubcategoryOptions_Index = [];
                console.log(res);
                if(res.sub_categories.length>0){
                  this.SubcategoryOptions_Index = res.sub_categories;
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
            }))
          },
          error:(res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          }
        });
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
      console.log(this.selected_row_data.length);
      if (this.selected_row_data.length >= 0) {
        if (this.selected_row_data.length == 0) {
          this.showEditablefields = false;
          this.selected_row_data_length = 0;
          const newColumnDefs = this.columnMainDefs.map(colDef => {
            if (colDef.field === 'edit') {
              return { ...colDef, hide: false };
            }
            else if(colDef.field == 'delete'){
              return { ...colDef, hide: false };
            }
            return colDef;
          });
          this.gridOptions1.api.setColumnDefs(newColumnDefs);
        }
        else {
          this.AllItemsChecked = true
          this.selected_row_data_length = this.selected_row_data.length;
          // this.columnMainDefs = this.getEditColumnDef;
          const newColumnDefs = this.columnMainDefs.map(colDef => {
            if (colDef.field === 'edit') {
              return { ...colDef, hide: true };
            }
            else if(colDef.field == 'delete'){
              return { ...colDef, hide: true };
            }
            return colDef;
          });
          this.gridOptions1.api.setColumnDefs(newColumnDefs);
          this.showEditablefields = true;
        }
      }
    });
  }

  UnSelectAllItems(data:any){
    let value =!data;
    console.log(value);
    if(value == false){
      this.gridApi_1.deselectAll();
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

  guidelines:any = {};
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
      case 'add_tag':{
        this.add_tag?.show();
        this.getTags();
        break;
      }
      case 'bulkupdate':{
        this.bulkupdate?.show();
        this.guidelines = this.selected_row_data;
        console.log(this.guidelines);
        // this.createGroup();
        break;
      }
       case 'clone_modal':{
        this.clone_modal?.show();
        break;
      }
      case 'move':{
        this.getCategoryOptions();
        this.getOverAllList();
        this.changefolder = null;
        this.changesubfolder = null;
        this.SelectedMainFolderIndex = null;
        this.SelectedSubFolderIndex = null;
        this.move?.show();
        break;
      }
      case 'bulk_edit':{
        this.getProcedures();
        this.getTags();
        this.bulk_edit?.show();
        break;
      }
    }
  }

  CloseModal(modalname:string){
    switch(modalname){
      case 'editItem':{
        this.AddItemForm.reset();
        this.editItem?.hide();
        this.gridApi_1.deselectAll();
        break;
      }
      case 'item_name':{
        this.viewitem?.hide();
        this.gridApi_1.deselectAll();
        this.disableNextPatientButton = false;
        this.disablePrevoiusPatientButton = false;
        break;
      }
      case 'delete_modal':{
        this.delete_modal?.hide();
        this.gridApi_1.deselectAll();
        break;
      }
      case 'add_tag':{
        this.AddtagForm?.reset();
        this.add_tag?.hide();
        this.gridApi_1.deselectAll();
        break;
      }
      case 'bulkupdate':{
        this.bulkupdate?.hide();
        this.gridApi_1.deselectAll();
        break;
      }
      case 'clone_modal':{
        this.clone_modal?.hide();
        this.gridApi_1.deselectAll();
        // this.ngAfterViewInit();
        break;
      }
      case 'move':{
        this.ShowOverAlllist = true;
        this.DestinationValue = null;
        this.move?.hide();
        this.gridApi_1.deselectAll();
        break;
      }
      case 'bulk_edit':{
        this.bulk_edit?.hide();
        this.gridApi_1.deselectAll();
        break;
      }
    }
  }

  OpenNestedModal(){
    this.viewitem?.hide();
    this.getCategoryOptions();
        this.getVendors();
        this.getTags();
        this.getProcedures();
        this.allServices.ViewItem(this.Currently_Selected_row.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              let procedure_values:any = [];
              if(res.data.item_procedures.length>0)
              {
                let x = res.data.item_procedures;
                x.forEach(element => {
                  procedure_values.push(element.procedure_name)
                });
              }
              this.AddItemForm.patchValue({
                imageURL:'',
                ItemNumber:res.data.item_number,
                ItemName:res.data.item_name,
                ItemCategory:res.data.item_category?.name,
                Barcodes:res.data.item_barcode,
                procedure:procedure_values,
                ItemStatus:res.data.item_status == '1' ? 'Active' : 'Inactive',
                Vendor:res.data.item_vendor?.VendorName,
                price:res.data.price,
                size:res.data.size,
                sizetype:res.data.size_type,
                subcategory:res.data.item_sub_category?.sub_category_name,
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

            this.allServices.ItemSubCategoryOptions(res.data.item_category?.id).subscribe(({
              next:((res:any)=>{
                this.SubCategories = [];
                this.SubcategoryOptions_Index = [];
                console.log(res);
                if(res.sub_categories){
                  this.SubcategoryOptions_Index = res.sub_categories;
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
            }))
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

  quantity_bulkEdit:number = 0;
  IncreaseQuantityQty_bulkEdit(data:any){
    let Numdata = parseInt(data);
    this.quantity_bulkEdit = Numdata+1;
  }
  DecreaseQuantityQty_bulkEdit(data:any){
    let Numdata = parseInt(data);
    if(Numdata>0){
      this.quantity_bulkEdit = Numdata-1;
    }
  }

  minlevel_bulkEdit:number = 0;
  IncreaseMinlevelQty_bulkEdit(data:any){
    let Numdata = parseInt(data);
    this.minlevel_bulkEdit = Numdata+1;
  }
  DecreaseMinlevelQty_bulkEdit(data:any){
    let Numdata = parseInt(data);
    if(Numdata>0){
      this.minlevel_bulkEdit = Numdata-1;
    }
  }


  getOverAllList(){
    this.allServices.GetOverAllList().subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          this.ShowOverAlllist = true;
          console.log(res.data);
          this.folder_structure_value = res.data;
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Unable to get Category List`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
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
      res.categories.forEach((element) => {
        this.Category.push(element.categories);
      });
      this.AddItemForm.patchValue({
        subcategory:[]
      })
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
  OnChangeItemCategory(data:any){
    console.log('Selected Category',data);
    this.AddItemForm.patchValue({
      subcategory:[]
    })
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
        this.SubCategories= [];
        this.SubcategoryOptions_Index = [];
        console.log(res);
        if(res.sub_categories){
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

  UpdateItemfn(data:any){
    if(data.valid){
      console.log('formData',data);

      let category_value = data.value.ItemCategory;
      this.CategoryOptions_Index.forEach(element => {
        if(element.categories == category_value){
          this.AddItemForm.patchValue({
            ItemCategory:element.id
          })
        }
      });

      console.log(this.AddItemForm.controls.ItemCategory.value);

      let subcategory_value = data.value.subcategory;
      console.log(this.SubcategoryOptions_Index);

      this.SubcategoryOptions_Index.forEach(element => {
        console.log(element);
        if(element.sub_category_name == subcategory_value){
          this.AddItemForm.patchValue({
            subcategory:element.id
          })
        }
      });

      let vendor_value = data.value.Vendor;
      console.log(vendor_value);
      this.VendorsOption_Index.forEach(element => {
        if(element.VendorName == vendor_value){
          this.AddItemForm.patchValue({
            Vendor:element.id
          })
        }
      });

      let procedure_value = data.value.procedure;
      console.log(procedure_value);

      let newArray:any = [];
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

      let item_status = data.value.ItemStatus;
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

      console.log(data.value);

      this.allServices.UpdateItemfn(this.Currently_Selected_row,data).subscribe({
        next:(res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('editItem');
            // this.onGridReady_dailyconsumedgrid;
            this.ngAfterViewInit();
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

  DeleteItemfn(){
    if(this.Currently_Selected_row){
      this.allServices.DeleteSingleItem(this.Currently_Selected_row.id).subscribe({
        next:((res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('delete_modal');
            this.ngAfterViewInit();
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
      this.allServices.DeleteMultipleItem(this.selected_row_data).subscribe({
        next:((res:any)=>{
          if(res.status=='Success'){
            this.toastr.success(`${res.message}`,'Successful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
            this.CloseModal('delete_modal');
            this.selected_row_data = [];
            this.showEditablefields = false;
            this.ngAfterViewInit();
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

  BulkUpdate(){

  }

  CloneItem(){
    console.log(this.selected_row_data);

    this.allServices.CloneItem(this.selected_row_data).subscribe({
      next:((res:any)=>{
        if(res.status=='Success'){
        this.toastr.success(`${res.message}`,'Successful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
        this.CloseModal('clone_modal');
        this.showEditablefields = false;
        this.ngAfterViewInit();
      }
      }),
      error:((res:any) =>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }

  UpdateTagsfn(data:any){
    console.log(this.selected_row_data);
    let SelectedItemId:any = [];
    this.selected_row_data.forEach(index =>{
      SelectedItemId.push(index.id);
    });
    console.log(SelectedItemId);
    console.log(data);
    this.allServices.UpdateTags(SelectedItemId,data).subscribe({
      next:((res:any)=>{
        this.toastr.success(`${res.message}`,'Successful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
        this.CloseModal('add_tag');
        this.selected_row_data = [];
        this.showEditablefields = false;
        this.ngAfterViewInit();
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }

  MoveItemnf(){
    console.log(this.selected_row_data);
    let Selected_Index:any = [];
    this.selected_row_data.forEach((element:any)=>{
      Selected_Index.push(element.id);
    });
    console.log(Selected_Index);
    this.allServices.MoveItem(Selected_Index,this.SelectedMainFolderIndex,this.SelectedSubFolderIndex).subscribe({
      next:((res:any)=>{
        if(res.status=='Success'){
          this.toastr.success(`${res.message}`,'Successful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
          this.CloseModal('move');
          this.ngAfterViewInit();

          this.showEditablefields = false;
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

  disableNextPatientButton:boolean = false;
  disablePrevoiusPatientButton : boolean = false;
  GoToNextItem(data: any) {
    for (let i = 0; i < this.all_Items_gridData.length; i++) {
      if (data.id == this.all_Items_gridData[i].id) {
        if (this.all_Items_gridData[i + 1]) {
          let procedure_values: any = [];
          if (this.all_Items_gridData[i + 1].item_procedures.length > 0) {
            let x = this.all_Items_gridData[i + 1].item_procedures;
            x.forEach(element => {
              procedure_values.push(element.procedure_name)
            });
          }

          this.ViewItemData = this.all_Items_gridData[i + 1];
          this.ViewItemData.item_procedures = procedure_values;
          console.log(this.ViewItemData);

          break;
        }
        else {
          this.disableNextPatientButton = true;
        }
      }
    }
  }

  GoToPreviousItem(data: any) {
    for (let i = 0; i < this.all_Items_gridData.length; i++) {
      if (data.id == this.all_Items_gridData[i].id) {
        if (this.all_Items_gridData[i - 1]) {
          let procedure_values: any = [];
          if (this.all_Items_gridData[i - 1].item_procedures.length > 0) {
            let x = this.all_Items_gridData[i - 1].item_procedures;
            x.forEach(element => {
              procedure_values.push(element.procedure_name)
            });
          }
          this.ViewItemData = this.all_Items_gridData[i - 1];
          this.ViewItemData.item_procedures = procedure_values;
          break;
        }
        else {
          this.disablePrevoiusPatientButton = true;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.allServices.GetAllItemsGrid().subscribe({
      next:((res:any)=>{
        this.all_Items_gridData = res.data;
        this.myGrid_1.api?.setRowData(this.all_Items_gridData);
        console.log(this.all_Items_gridData);
        // this.myGrid_1.api?.sizeColumnsToFit();
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    });
    this.authfakeauthenticationService.AllItemsPayload.subscribe((res:any)=>{
      console.log(res.value);
      if(res.value){
        this.allServices.SearchAllItemsGrid(res).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success')
          {
            this.all_Items_gridData = res.data;
            this.myGrid_1.api?.setRowData(this.all_Items_gridData);
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
    })
  }
  public apiUrl: any = environment_new.apiUrl;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
      if(changes.Updategrid)
      {
        if(changes.Updategrid.currentValue){
          this.ngAfterViewInit();
        }
      }
      if(changes.SearchAllItemsGrid.currentValue){
        this.myGrid_1.api?.setQuickFilter(changes.SearchAllItemsGrid.currentValue);
      }

  }

  MainQuantity:number;
  MainQuantityInput:number;
  IncreaseQuantity(){
    if(this.MainQuantity == null)
    {
      this,this.MainQuantity = 0;
    }
      this.MainQuantity = this.MainQuantity+1;
  }

  DecreaseQuantity(){
      this.MainQuantity = this.MainQuantity-1;
  }

  // individualIncreasequantity(data){
  //   console.log(data);
  //   data = data+1;

  // }

  // individualDecreasequantity(data){
  //   console.log(data);
  // }


  ngOnDestroy() {
    // Remove any references to the grid API
    this.myGrid_1 = null;
  }

  OnChangeCategory(event:any){
    let category_id:number = null;
    if(event){
      console.log(this.CategoryOptions_Index);
      this.CategoryOptions_Index.forEach((element:any) => {
        if(event == element.categories){
          category_id = element;
        }
      });
      this.allServices.GetCategory(category_id).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            this.ShowOverAlllist = false;
            this.folder_structure_value = res.data;
            console.log(this.folder_structure_value);
          }
        }),
        error:((res:any)=>{
          this.toastr.error('Something went wrong', 'UnSuccessful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        })
      })
    }
  }

  changefolder:any;
  changesubfolder:any;
  SelectedSubFolderIndex:number;
  SelectedMainFolderIndex:number;
  Selectfolder(data:any,index:any){
    if(this.changefolder == data){
      this.changefolder = '';
      this.changesubfolder = '';
      this.SelectedMainFolderIndex = null;
    }
    else{
      this.changefolder = data;
      this.changesubfolder = '';
      this.SelectedMainFolderIndex = index.id;
      this.SelectedSubFolderIndex = null;
    }
    console.log('SelectedMainFolderIndex',this.SelectedMainFolderIndex);
    console.log('SelectedSubFolderIndex',this.SelectedSubFolderIndex)
  }

  SelectSubFolder(MainFolder:any,SubFolder:any,data:any){
    console.log('MainFolder',MainFolder);
    console.log('SubFolder',SubFolder);
    if(this.changesubfolder == data){
      this.changesubfolder = '';
      this.changefolder = '';
      this.SelectedMainFolderIndex = null;
      this.SelectedSubFolderIndex = null;
    }
    else{
      this.changesubfolder = data;
      this.changefolder = MainFolder.name;
      this.SelectedMainFolderIndex = MainFolder.id;
      this.SelectedSubFolderIndex = SubFolder.id;
    }

    console.log('SelectedMainFolderIndex',this.SelectedMainFolderIndex);
    console.log('SelectedSubFolderIndex',this.SelectedSubFolderIndex);
  }

//   createGroup() {
//     this.dynamicForm = this.formbuilder.group({});
//     this.selected_row_data.forEach(control => this.dynamicForm.addControl(control.item_name, this.formbuilder.control('')));
// console.log(this.dynamicForm.controls);
//     return this.dynamicForm;
//   }
}

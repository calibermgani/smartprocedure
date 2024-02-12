import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AuthfakeauthenticationService } from './../../../core/services/authfake.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';

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
  all_Items_gridData:any[];
  format_value:string[];
  folder_structure_value:any[];
  hide_Overall_list:boolean = false;
  all_items_dropbtn:boolean = true;
  vendor_list_dropbtn:boolean = false;
  low_stock_dropbtn:boolean = false;
  files: File[] = [];
  imageURL: any;
  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('additem', { static: false }) additem?: ModalDirective;
  @ViewChild('addcategory', { static: false }) addcategory?: ModalDirective;
  @ViewChild('addvendor', { static: false }) addvendor?: ModalDirective;
  @ViewChild('addtag', { static: false }) addtag?: ModalDirective;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;
  @ViewChild('notify', { static: false }) notify?: ModalDirective;

  options: Options = {
    floor: 0,
    ceil: 250
  };
  QuantityminValue: number = 10;
  QuantitymaxValue: number = 20;
  PriceminValue:number = 10;
  PricemaxValue:number = 40;

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

  constructor(private authfakeauthenticationService: AuthfakeauthenticationService,private http : HttpClient) {
    this.category = []; this.procedure = [];this.format_value = ['KG'];
  }

  ngOnInit(): void {
    this.authfakeauthenticationService.changeSideMenu('material-management');
    this.http.get('assets/json/folder_name.json').subscribe((res:any)=>{
      this.folder_structure_value = res;
      console.log('response',this.folder_structure_value);
    });

    setTimeout(() => {
      this.additem?.show()
    }, 1000);

  }


  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10
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
      field: 'on_hand_qty',
      headerName: 'On-Hand Qty',
      cellRenderer: this.cellrendered.bind(this, 'on_hand_qty')
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
      field: 'action',
      headerName: 'Action',
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'action')

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
      case 'on_hand_qty': {
        return params.value;
      }
      case 'min_level': {

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
      case 'action': {
        if(params.value)
        {
          return `<div class="d-flex flex-row">
          <i class="mdi mdi-eye-outline me-3" style="color:#855EDB;font-size:18px"></i>
          <i class="mdi mdi-pencil-outline me-3" style="color:#000;font-size:18px"></i>
          <i class="mdi mdi-trash-can-outline me-3" style="color:red;font-size:18px"></i>
          </div>`
        }
      }
    }
  }

  CellClicked(headerName: any, params: any) {
    switch(headerName){
      case 'item_name':{
        this.viewitem?.show();
      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
  }


  HideOverAllList(){
    this.hide_Overall_list =! this.hide_Overall_list;
  }

  SelectedTab(data:any)
  {
    switch(data){
      case 'allitems':{
        this.all_items_dropbtn = true;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'vendor_list':{
        this.vendor_list_dropbtn = true;
        this.all_items_dropbtn=false;
        this.low_stock_dropbtn=false;
        break;
      }
      case 'low_stock':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = true;
        break;
      }
      case 'daily_consumed':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'damaged':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'backtocabinet':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = true;
        break;
      }
      case 'near_expired':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'refilltocabinet':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'recall':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
    }
  }

  selected_row_data:any[];
  selected_row_data_length:any;
  showEditablefields:boolean = false;
  onSelectionChanged(params:any){
     this.selected_row_data = [];
    this.gridApi_1.getSelectedNodes().forEach(element => {
      this.selected_row_data.push(element.data);
    });
    if(this.selected_row_data.length == 0){
      this.showEditablefields = false;
    }
    else{
      this.selected_row_data_length = this.selected_row_data.length;
      this.showEditablefields = true;
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
  textcontent:any;
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

  openModal()
  {
    console.log('1');
  }
  ngAfterViewInit(): void {
    this.http.get('assets/json/all-items.json').subscribe((res:any)=>{
      this.all_Items_gridData = res;
      this.myGrid_1.api?.setRowData(this.all_Items_gridData);
    });
  }

  enableTab:any = '';
  changeTab(tabs:any){
    switch(tabs)
    {
      case 'vendor_list':{
        this.enableTab = 'vendor_list';
        break;
      }
      case 'daily_consumed':{
        this.enableTab = 'daily_consumed';
        break;
      }
      case 'damaged':{
        this.enableTab = 'damaged';
        break;
      }
      case 'backtocabinet':{
        this.enableTab = 'backtocabinet';
        break;
      }
      case 'near_expired':{
        this.enableTab = 'near_expired';
        break;
      }
      case 'low_stock':{
        this.enableTab = 'low_stock';
        break;
      }
      case 'refilltocabinet':{
        this.enableTab = 'refilltocabinet';
        break;
      }
      case 'recall':{
        this.enableTab = 'recall';
        break;
      }
    }
  }

  resize:boolean = false;
  hideAdvancedFilters(){
    this.resize =! this.resize;
  }
}

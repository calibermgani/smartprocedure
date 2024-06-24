import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormArray, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {
  tableLab: FormGroup;

  labDetails: any[] = [];

  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;

  constructor(private formBuilder: FormBuilder, private allService: AllServicesService, private http: HttpClient,private toastr : ToastrService) {

  }

  ngOnInit(){
    this.tableLab = this.formBuilder.group({
      labRows: this.formBuilder.array([this.createLabGroup()])
    });
    this.getLabDetails();
  }

  OpenModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
    this.tableLab = this.formBuilder.group({
      labRows: this.formBuilder.array([])
    });
    this.labDetails.forEach(()=>this.addLabRow());
    this.labDetails.forEach((values,index)=>{
      this.labRows.controls[index].patchValue({
        test_name : values.test_name,
        result : values.result,
        date : values.date
      })
    })
  }

  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }

  get labRows(): FormArray {
    return this.tableLab.get('labRows') as FormArray;
  }

  createLabGroup(): FormGroup {
    return this.formBuilder.group({
      test_name: [''],
      result: [''],
      date: ['']
    });
  }

  addLabRow(): void {
    this.labRows.push(this.createLabGroup());    
  }

  deleteLabRow(index: number) {
    if(this.labRows.length > 1){
      (this.tableLab.get('labRows') as FormArray).removeAt(index);
    }
  }

  resetFormAndAddEmptyRow() {
    this.tableLab.reset();
    (this.tableLab.get('labRows') as FormArray).clear();
    this.addEmptyRow();
  }

  addEmptyRow() {
    const rows = this.tableLab.get('labRows') as FormArray;
    rows.push(this.formBuilder.group({
      test_name: [''],
      result: [''],
      date: ['']
    }));
  }

  getLabDetails(){
    this.allService.GetLabDetails().subscribe((labs : any)=>{
      if(labs.status === 'Success'){
        this.labDetails = labs.data;
        this.labDetails = this.labDetails.map((dateTime)=>{
          let date = new Date(dateTime.created_at);
          dateTime.created_at = this.allService.formattedDate(date);
          dateTime.created_Time = this.allService.formatTime(date);
          return dateTime;
        })
      }
    },
    error => {
      console.log(error);
    })
  }

  saveLabDetails(){
    const rowData = this.tableLab.value.labRows;
    this.allService.saveDataLab(rowData).subscribe((labs : any)=>{
      if(labs.status === 'Success'){
        this.toastr.success(`${labs.message}`,'Successfull', {
          positionClass: 'toast-top-center',
          timeOut: 1000
        });
        this.getLabDetails();
        this.resetFormAndAddEmptyRow();
      }
    },
    error => {
      console.log(error);
    })
  }

}

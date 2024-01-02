import { HttpBackend, HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

interface MainTab {
  "tabs": string,
  "id": number,
  "subtabs": string
}

interface SubTab {
  "id": number,
  "subtabs": string
}


@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.scss']
})
export class ProcedureDetailsComponent implements OnInit {

  @Input() StageValue: any;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  isFirstOpen: boolean = true;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<MainTab>('assets/json/main-tabs.json').subscribe((res: MainTab) => {
      this.mainTabsValue = res;
      console.log("res", res);
      if (res[0].subtabs) {
        this.subTabs.push(res[0].subtabs);
      }
      console.log(this.subTabs);
    });

    this.http.get('assets/json/viewOnlyMode.json').subscribe((res: any) => {
      this.header_viewOnlymode = res;
    })
  }

  fetchData(res: any) {

  }

  CloseViewOnlyMode() {
    document.body.classList.toggle('selva');
  }
  open() {
    window.alert('Hi You have opened the testing modal')
  }
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   defaultauth: 'fackbackend',
//   firebaseConfig: {
//     apiKey: '',
//     authDomain: '',
//     databaseURL: '',
//     projectId: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     appId: '',
//     measurementId: ''
//   }
// };
import { IEnvironment } from './environment.interface';
export const environment_new:IEnvironment = {
  production: false,
  // apiUrl: 'http://127.0.0.1:8000/api',
  // imageUrl:'http://127.0.0.1:8000'
  apiUrl: 'http://34.29.13.215/smartbuild_api/public/index.php/api',
  imageUrl:'http://34.29.13.215/smartbuild_api/public',
  clinicalDiagnosis:'/procedures/ch_pre_diagnosis_index',
  patientLabDelete:'/procedures/patient_lab_delete',
  saveDataLab:'/procedures/patient_lab_store',
  getLabDetails:'/procedures/patient_lab_index',
  deletePostDiagnol:'/procedures/ch_post_diagnosis_delete',
  saveDatapostDiagnosis:'/procedures/ch_post_diagnosis_store',
  clinicalPostDiagnosis:'/procedures/ch_post_diagnosis_index',
  deleteIndicationData:'/procedures/ch_indication_delete',
  saveDataIndication:'/procedures/ch_indication_store',
  clinicalHistoryIndication:'/procedures/ch_indication_index',
  deletePreDiagnosis:'/procedures/ch_pre_diagnosis_delete',
  saveData:'/procedures/ch_pre_diagnosis_store',
  getMediationDetails:'/procedures/patient_mediation_index',
  saveMediationData:'/procedures/patient_mediation_store',
  deleteMediationData:'/procedures/patient_mediation_delete',
  AllProcedureStatusData: '/procedures/procedure_sub_status',
  getCheckListData: '/procedures/check_list_index'

};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

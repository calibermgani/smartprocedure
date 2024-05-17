// export const environment = {
//   production: true,
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
  AllProcedureStatusData: '/procedures/procedure_sub_status'
};

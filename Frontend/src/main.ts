import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';
import { environment_new } from './environments/environment';

if (environment_new.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
  if ((window as any).ENABLE_PROD_MODE) {
    enableProdMode();
  }
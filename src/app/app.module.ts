import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AdminParentComponent } from './admin-parent/admin-parent.component';
import { UserParentComponent } from './user-parent/user-parent.component';
import { UserChildComponent } from './user-parent/user-child/user-child.component';
import { AdminChildComponent } from './admin-parent/admin-child/admin-child.component';
import { AdminAboutComponent } from './admin-parent/admin-about/admin-about.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminParentComponent,
    UserParentComponent,
    UserChildComponent,
    AdminChildComponent,
    AdminAboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
      {
        path: 'admin', component: AdminParentComponent, children: [
          { path: '', redirectTo: 'achild', pathMatch: 'full' },
          { path: 'achild', component: AdminChildComponent },
          { path: 'aabout', component: AdminAboutComponent },
        ]
      },
      {
        path: 'user', component: UserParentComponent, children: [
          { path: '', redirectTo: 'uchild', pathMatch: 'full' },
          { path: 'uchild', component: UserChildComponent },
        ]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

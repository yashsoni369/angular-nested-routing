import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter([
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
      {
        path: 'admin',
        loadComponent: () => import('./app/admin-parent/admin-parent.component').then(m => m.AdminParentComponent),
        children: [
          { path: '', redirectTo: 'achild', pathMatch: "full" },
          { path: 'achild', loadComponent: () => import('./app/admin-parent/admin-child/admin-child.component').then(m => m.AdminChildComponent) },
          { path: 'aabout', loadComponent: () => import('./app/admin-parent/admin-about/admin-about.component').then(m => m.AdminAboutComponent) },
        ]
      },
      { path: 'user', loadComponent: () => import('./app/user-parent/user-parent.component').then(m => m.UserParentComponent) }
    ])
  ]
}).catch(err => console.error(err));

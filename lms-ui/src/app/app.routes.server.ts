import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tutor/dashboard',
    renderMode: RenderMode.Client
  },
  {
    path: 'tutor/dashboard/**',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/dashboard',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
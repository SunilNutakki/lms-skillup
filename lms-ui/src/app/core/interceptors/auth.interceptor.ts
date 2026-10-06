import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Do not add JWT to login request
  if (req.url.endsWith('/api/auth/login')) {
    return next(req);
  }

  const token = localStorage.getItem('lms_token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
};
import {HttpInterceptorFn} from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  if (accessToken) {
    return next(req.clone({
      setHeaders: {
        'Authorization': `Bearer ${accessToken}`
      }
    }));
  }
  return next(req);
};

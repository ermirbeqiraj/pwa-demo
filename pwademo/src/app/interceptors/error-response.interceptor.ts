import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DbContextService } from '../services/db-context.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable()
export class ErrResponseInterceptor implements HttpInterceptor {
  constructor(public dbStore: DbContextService, public toasts: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      tap(() => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(`Error: ${err.status} is detected.`);
          const req = request.clone();
          if (err.status === 0 && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
            this.dbStore.saveRequest(req.urlWithParams, req.method, req.body);
            this.toasts.info('Network connection is not available. This operation will be retried when network is available.');
            return new Observable(() => { });
          }
        }
      }));
  }
}

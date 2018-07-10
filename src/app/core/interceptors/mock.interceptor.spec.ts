// tslint:disable:no-any
import {
  HttpEventType,
  HttpHandler,
  HttpParams,
  HttpRequest,
  HttpResponse,
  HttpXhrBackend,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import * as using from 'jasmine-data-provider';
import { of } from 'rxjs';
import { anything, instance, mock, when } from 'ts-mockito';
import { REST_ENDPOINT } from '../../core/services/state-transfer/factories';
import { MUST_MOCK_PATHS, NEED_MOCK } from '../configurations/injection-keys';
import { MockInterceptor } from './mock.interceptor';

describe('Mock Interceptor', () => {
  const BASE_URL = 'http://example.org';

  let mockInterceptor: MockInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockInterceptor,
        { provide: REST_ENDPOINT, useValue: BASE_URL },
        { provide: NEED_MOCK, useValue: true },
        { provide: MUST_MOCK_PATHS, useValue: [] },
      ],
    });
    mockInterceptor = TestBed.get(MockInterceptor);
  });

  describe('REST Path Extraction', () => {
    it('should extract the correct path when rest URL is given', () => {
      expect(mockInterceptor.getRestPath(BASE_URL + '/categories/Cameras')).toBe('categories/Cameras');
    });

    it('should extract the correct path when rest URL is given with currency and locale', () => {
      expect(mockInterceptor.getRestPath(BASE_URL + ';loc=en_US;cur=USD/categories/Cameras')).toBe(
        'categories/Cameras'
      );
    });
  });

  describe('Request URL Modification', () => {
    const request: HttpRequest<any> = new HttpRequest('GET', '');

    function dataProvider() {
      return [
        { url: BASE_URL + '/categories', willBeMocked: true, method: 'GET' },
        { url: BASE_URL + ';loc=en_US;cur=USD/categories', willBeMocked: true, method: 'GET' },
        { url: './assets/picture.png', willBeMocked: false, method: 'GET' },
        {
          url: BASE_URL + '/assets',
          params: new HttpParams().set('foo', 'bar'),
          willBeMocked: true,
          method: 'GET',
          target: './assets/mock-data/assets/get_foo_bar.json',
        },
        {
          url: BASE_URL + '/assets',
          params: new HttpParams().set('foo', 'bar?'),
          willBeMocked: true,
          method: 'GET',
          target: './assets/mock-data/assets/get_foo_bar_.json',
        },
      ];
    }

    using(dataProvider, dataSlice => {
      it(`should ${dataSlice.willBeMocked ? '' : 'not '}mock request to ${dataSlice.url}`, () => {
        expect(mockInterceptor.requestHasToBeMocked(request.clone({ url: dataSlice.url }))).toBe(
          dataSlice.willBeMocked
        );
      });
      it(`should ${dataSlice.willBeMocked ? '' : 'not '}change url for ${dataSlice.url}`, () => {
        if (dataSlice.willBeMocked) {
          expect(mockInterceptor.getMockUrl(dataSlice)).not.toBe(dataSlice.url);
          if (dataSlice.target) {
            expect(mockInterceptor.getMockUrl(dataSlice)).toBe(dataSlice.target);
          }
        } else {
          expect(mockInterceptor.getMockUrl(dataSlice)).toBe(dataSlice.url);
        }
      });
    });
  });

  describe('matchPath Method', () => {
    function dataProvider() {
      return [
        { item: 'categories', in: undefined, expect: false },
        { item: 'categories', in: null, expect: false },
        { item: 'categories', in: [], expect: false },
        { item: 'categories', in: ['categories'], expect: true },
        { item: 'catego', in: ['categories'], expect: false },
        { item: 'categories', in: ['cat.*'], expect: true },
        { item: 'categories/Computers', in: ['categories'], expect: false },
        { item: 'categories/Computers', in: ['categories.*'], expect: true },
        { item: 'categories/Computers', in: ['categories/.*'], expect: true },
        { item: 'categories/Computers', in: ['categories/Computers'], expect: true },
        { item: 'categories/Computers', in: ['categories/Audio'], expect: false },
        { item: 'categories/Computers', in: ['categories/'], expect: false },
        { item: 'categories/Computers', in: ['categories/(Audio|Computers|HiFi)'], expect: true },
        { item: 'categories/Computers', in: ['categories/(Audio|Computers|HiFi)/'], expect: false },
      ];
    }

    using(dataProvider, dataSlice => {
      it(`should${dataSlice.expect ? '' : ' not'} when \'${dataSlice.item}\' in ${dataSlice.in}`, () => {
        expect(mockInterceptor.matchPath(dataSlice.item, dataSlice.in)).toBe(dataSlice.expect);
      });
    });
  });

  describe('Intercepting', () => {
    let request: HttpRequest<any>;
    let handler: HttpHandler;

    beforeEach(() => {
      request = new HttpRequest('GET', `${BASE_URL}/some`);
      const handlerMock = mock(HttpXhrBackend);
      when(handlerMock.handle(anything())).thenReturn(of(new HttpResponse<any>()));
      handler = instance(handlerMock);
    });

    it('should attach token when patricia is logged in correctly', done => {
      mockInterceptor
        .intercept(
          request.clone({
            headers: request.headers.append(
              'Authorization',
              'BASIC cGF0cmljaWFAdGVzdC5pbnRlcnNob3AuZGU6IUludGVyU2hvcDAwIQ=='
            ),
          }),
          handler
        )
        .subscribe(event => {
          expect(event.type).toBe(HttpEventType.Response);

          const response = event as HttpResponse<any>;
          expect(response.headers.get('authentication-token')).toBeTruthy();
          done();
        });
    });

    it('should return error response when patricia is not logged in correctly', done => {
      mockInterceptor
        .intercept(request.clone({ headers: request.headers.append('Authorization', 'invalid') }), handler)
        .subscribe(
          event => {
            fail();
            done();
          },
          event => {
            expect(event.ok).toBeFalsy();
            expect(event.status).toBe(401);
            expect(event.headers.get('authentication-token')).toBeFalsy();
            expect(event.headers.get('error-key')).toBeTruthy();
            done();
          }
        );
    });
  });
});

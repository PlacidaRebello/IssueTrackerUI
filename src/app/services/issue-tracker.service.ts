
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueTrackerService {
  constructor() { }
}

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class SprintsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl = environment.baseUrl;
    }

    getSprints(): Observable<GetSprintData[]> {
        let url_ = this.baseUrl + "/api/Sprints";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetSprints(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetSprints(<any>response_);
                } catch (e) {
                    return <Observable<GetSprintData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetSprintData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetSprints(response: HttpResponseBase): Observable<GetSprintData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetSprintData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetSprintData[]>(<any>null);
    }

    putSprint(sprint: EditSprintRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Sprints";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(sprint);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPutSprint(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPutSprint(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPutSprint(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    postSprint(sprint: CreateSprintRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Sprints";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(sprint);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPostSprint(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPostSprint(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPostSprint(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getSprint(id: number): Observable<GetSprintData> {
        let url_ = this.baseUrl + "/api/Sprints/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetSprint(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetSprint(<any>response_);
                } catch (e) {
                    return <Observable<GetSprintData>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetSprintData>><any>_observableThrow(response_);
        }));
    }

    protected processGetSprint(response: HttpResponseBase): Observable<GetSprintData> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetSprintData.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetSprintData>(<any>null);
    }

    deleteSprint(id: number): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Sprints/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteSprint(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteSprint(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteSprint(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getListOfSprints(): Observable<GetSprintsList[]> {
        let url_ = this.baseUrl + "/api/Sprints/SprintsList";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetListOfSprints(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetListOfSprints(<any>response_);
                } catch (e) {
                    return <Observable<GetSprintsList[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetSprintsList[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetListOfSprints(response: HttpResponseBase): Observable<GetSprintsList[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetSprintsList.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetSprintsList[]>(<any>null);
    }

    getSprintStatusList(): Observable<GetSprintStatusData[]> {
        let url_ = this.baseUrl + "/api/Sprints/GetSprintStatus";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetSprintStatusList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetSprintStatusList(<any>response_);
                } catch (e) {
                    return <Observable<GetSprintStatusData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetSprintStatusData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetSprintStatusList(response: HttpResponseBase): Observable<GetSprintStatusData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetSprintStatusData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetSprintStatusData[]>(<any>null);
    }
}

@Injectable()
export class IssuesClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl = environment.baseUrl;
    }

    getIssueList(): Observable<GetIssueData[]> {
        let url_ = this.baseUrl + "/api/Issues";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetIssueList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetIssueList(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetIssueList(response: HttpResponseBase): Observable<GetIssueData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetIssueData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueData[]>(<any>null);
    }

    putIssue(issue: EditIssueRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Issues";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(issue);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPutIssue(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPutIssue(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPutIssue(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    postIssue(issue: CreateIssueRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Issues";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(issue);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPostIssue(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPostIssue(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPostIssue(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getIssue(id: number): Observable<GetIssueData> {
        let url_ = this.baseUrl + "/api/Issues/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetIssue(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetIssue(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueData>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueData>><any>_observableThrow(response_);
        }));
    }

    protected processGetIssue(response: HttpResponseBase): Observable<GetIssueData> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetIssueData.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueData>(<any>null);
    }

    deleteIssue(id: number): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Issues/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteIssue(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteIssue(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteIssue(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    dragIssue(dragDropIssue: DragDropIssueRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Issues/DragDropIssue";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(dragDropIssue);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDragIssue(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDragIssue(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processDragIssue(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    // getPoints(): Observable<number[]> {
    //     let url_ = this.baseUrl + "/api/Issues/Points";
    //     url_ = url_.replace(/[?&]$/, "");

    //     let options_ : any = {
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Accept": "application/json"
    //         })
    //     };

    //     return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //         return this.processGetPoints(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processGetPoints(<any>response_);
    //             } catch (e) {
    //                 return <Observable<number[]>><any>_observableThrow(e);
    //             }
    //         } else
    //             return <Observable<number[]>><any>_observableThrow(response_);
    //     }));
    // }

    // protected processGetPoints(response: HttpResponseBase): Observable<number[]> {
    //     const status = response.status;
    //     const responseBlob =
    //         response instanceof HttpResponse ? response.body :
    //         (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    //     let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    //     if (status === 200) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         if (Array.isArray(resultData200)) {
    //             result200 = [] as any;
    //             for (let item of resultData200)
    //                 result200!.push(item);
    //         }
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
    //         return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    //         }));
    //     }
    //     return _observableOf<number[]>(<any>null);
    // }
}


@Injectable()
export class IssueStatusClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl = environment.baseUrl;
    }

    getStatusList(): Observable<GetIssueStatusData[]> {
        let url_ = this.baseUrl + "/api/IssueStatus";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetStatusList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetStatusList(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueStatusData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueStatusData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetStatusList(response: HttpResponseBase): Observable<GetIssueStatusData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetIssueStatusData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueStatusData[]>(<any>null);
    }

    putStatus(status: EditIssueStatusRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/IssueStatus";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(status);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPutStatus(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPutStatus(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPutStatus(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    postStatus(status: CreateIssueStatusRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/IssueStatus";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(status);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPostStatus(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPostStatus(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPostStatus(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getStatus(id: number): Observable<GetIssueStatusData> {
        let url_ = this.baseUrl + "/api/IssueStatus/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetStatus(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetStatus(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueStatusData>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueStatusData>><any>_observableThrow(response_);
        }));
    }

    protected processGetStatus(response: HttpResponseBase): Observable<GetIssueStatusData> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetIssueStatusData.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueStatusData>(<any>null);
    }

    deleteStatus(id: number): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/IssueStatus/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteStatus(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteStatus(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteStatus(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }
}

@Injectable()
export class IssueTypesClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl = environment.baseUrl;
    }

    getIssueTypeAll(): Observable<GetIssueTypeData[]> {
        let url_ = this.baseUrl + "/api/IssueTypes";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetIssueTypeAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetIssueTypeAll(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueTypeData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueTypeData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetIssueTypeAll(response: HttpResponseBase): Observable<GetIssueTypeData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetIssueTypeData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueTypeData[]>(<any>null);
    }

    putIssueType(issueType: EditIssueTypeRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/IssueTypes";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(issueType);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPutIssueType(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPutIssueType(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPutIssueType(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    postIssueType(issueType: CreateIssueTypeRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/IssueTypes";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(issueType);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPostIssueType(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPostIssueType(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPostIssueType(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getIssueType(id: number): Observable<GetIssueTypeData> {
        let url_ = this.baseUrl + "/api/IssueTypes/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetIssueType(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetIssueType(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueTypeData>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueTypeData>><any>_observableThrow(response_);
        }));
    }

    protected processGetIssueType(response: HttpResponseBase): Observable<GetIssueTypeData> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetIssueTypeData.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueTypeData>(<any>null);
    }

    deleteIssueType(id: number): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/IssueTypes/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteIssueType(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteIssueType(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteIssueType(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }
}


@Injectable()
export class ManagementClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl = environment.baseUrl;
    }

    getInitialIssueList(): Observable<GetIssueData[]> {
        let url_ = this.baseUrl + "/api/Management";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetInitialIssueList(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetInitialIssueList(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetInitialIssueList(response: HttpResponseBase): Observable<GetIssueData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetIssueData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueData[]>(<any>null);
    }

    getIssuesCountByType(): Observable<GetIssueCountByType[]> {
        let url_ = this.baseUrl + "/api/Management/GetIssuesCountByType";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetIssuesCountByType(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetIssuesCountByType(<any>response_);
                } catch (e) {
                    return <Observable<GetIssueCountByType[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetIssueCountByType[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetIssuesCountByType(response: HttpResponseBase): Observable<GetIssueCountByType[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetIssueCountByType.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetIssueCountByType[]>(<any>null);
    }

    updateIssuePriority(dragDropIssue: DragDropIssueRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Management";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(dragDropIssue);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdateIssuePriority(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateIssuePriority(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processUpdateIssuePriority(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getDailyBurnDowns(): Observable<GetDailyBurnDownData[]> {
        let url_ = this.baseUrl + "/api/Management/GetBurnDownData";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetDailyBurnDowns(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetDailyBurnDowns(<any>response_);
                } catch (e) {
                    return <Observable<GetDailyBurnDownData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetDailyBurnDownData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetDailyBurnDowns(response: HttpResponseBase): Observable<GetDailyBurnDownData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetDailyBurnDownData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetDailyBurnDownData[]>(<any>null);
    }
}

@Injectable()
export class RegisterClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl =environment.baseUrl;
    }

    createUser(userRequest: RegisterUserRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(userRequest);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreateUser(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateUser(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processCreateUser(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getUsers(): Observable<GetUsersData[]> {
        let url_ = this.baseUrl + "/api/Register/Users";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetUsers(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetUsers(<any>response_);
                } catch (e) {
                    return <Observable<GetUsersData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetUsersData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetUsers(response: HttpResponseBase): Observable<GetUsersData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetUsersData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetUsersData[]>(<any>null);
    }
}

@Injectable()
export class ReleasesClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl = environment.baseUrl;
    }

    getReleases(): Observable<GetReleaseData[]> {
        let url_ = this.baseUrl + "/api/Releases";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetReleases(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetReleases(<any>response_);
                } catch (e) {
                    return <Observable<GetReleaseData[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetReleaseData[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetReleases(response: HttpResponseBase): Observable<GetReleaseData[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetReleaseData.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetReleaseData[]>(<any>null);
    }

    putRelease(release: EditReleaseRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Releases";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(release);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPutRelease(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPutRelease(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPutRelease(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    postRelease(release: CreateReleaseRequest): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Releases";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(release);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processPostRelease(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPostRelease(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processPostRelease(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getRelease(id: number): Observable<GetReleaseData> {
        let url_ = this.baseUrl + "/api/Releases/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetRelease(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetRelease(<any>response_);
                } catch (e) {
                    return <Observable<GetReleaseData>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetReleaseData>><any>_observableThrow(response_);
        }));
    }

    protected processGetRelease(response: HttpResponseBase): Observable<GetReleaseData> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetReleaseData.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetReleaseData>(<any>null);
    }

    deleteRelease(id: number): Observable<SuccessResponse> {
        let url_ = this.baseUrl + "/api/Releases/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeleteRelease(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteRelease(<any>response_);
                } catch (e) {
                    return <Observable<SuccessResponse>><any>_observableThrow(e);
                }
            } else
                return <Observable<SuccessResponse>><any>_observableThrow(response_);
        }));
    }

    protected processDeleteRelease(response: HttpResponseBase): Observable<SuccessResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SuccessResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SuccessResponse>(<any>null);
    }

    getListOfReleases(): Observable<GetReleaseList[]> {
        let url_ = this.baseUrl + "/api/Releases/ReleaseList";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetListOfReleases(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetListOfReleases(<any>response_);
                } catch (e) {
                    return <Observable<GetReleaseList[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<GetReleaseList[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetListOfReleases(response: HttpResponseBase): Observable<GetReleaseList[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetReleaseList.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<GetReleaseList[]>(<any>null);
    }
}

@Injectable()
export class SignInClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient) {
        this.http = http;
        this.baseUrl = environment.baseUrl;
    }

    // signIn(userRequest: CreateSignInUserRequest): Observable<FileResponse | null> {
    //     let url_ = this.baseUrl + "/api/SignIn";
    //     url_ = url_.replace(/[?&]$/, "");

    //     const content_ = JSON.stringify(userRequest);

    //     let options_ : any = {
    //         body: content_,
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Content-Type": "application/json",
    //             "Accept": "application/octet-stream"
    //         })
    //     };

    //     return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //         return this.processSignIn(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processSignIn(<any>response_);
    //             } catch (e) {
    //                 return <Observable<FileResponse | null>><any>_observableThrow(e);
    //             }
    //         } else
    //             return <Observable<FileResponse | null>><any>_observableThrow(response_);
    //     }));
    // }

    protected processSignIn(response: HttpResponseBase): Observable<FileResponse | null> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return _observableOf({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<FileResponse | null>(<any>null);
    }
}

export class Sprint implements ISprint {
    sprintName?: string | undefined;
    sprintPoints!: number;
    sprintStatusId!: number;
    startDate!: Date;
    endDate!: Date;
    createdBy?: string | undefined;
    releaseId!:number;

    constructor(data?: ISprint) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sprintName = _data["sprintName"];
            this.sprintPoints = _data["sprintPoints"];
            this.sprintStatusId = _data["sprintStatusId"];
            this.startDate = _data["startDate"] ? new Date(_data["startDate"].toString()) : <any>undefined;
            this.endDate = _data["endDate"] ? new Date(_data["endDate"].toString()) : <any>undefined;
            this.createdBy = _data["createdBy"];
            this.releaseId=_data["releaseId"];
        }
    }

    static fromJS(data: any): Sprint {
        data = typeof data === 'object' ? data : {};
        let result = new Sprint();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sprintName"] = this.sprintName;
        data["sprintPoints"] = this.sprintPoints;
        data["sprintStatusId"] = this.sprintStatusId;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        data["releaseId"]=this.releaseId;
        return data; 
    }
}

export interface ISprint {
    sprintName?: string | undefined;
    sprintPoints: number;
    sprintStatusId: number;
    startDate: Date;
    endDate: Date;
    createdBy?: string | undefined;
    releaseId:number;
}

export class GetSprintData extends Sprint implements IGetSprintData {
    sprintId!: number;
    sprintStatusName?: string | undefined;

    constructor(data?: IGetSprintData) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.sprintId = _data["sprintId"];
            this.sprintStatusName = _data["sprintStatusName"];
        }
    }

    static fromJS(data: any): GetSprintData {
        data = typeof data === 'object' ? data : {};
        let result = new GetSprintData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sprintId"] = this.sprintId;
        data["sprintStatusName"] = this.sprintStatusName;
        super.toJSON(data);
        return data; 
    }
}

export interface IGetSprintData extends ISprint {
    sprintId: number;
    sprintStatusName?: string | undefined;
}

export class GetIssueCountByType implements IGetIssueCountByType {
    issueCount!: number;
    typeName?: string | undefined;

    constructor(data?: IGetIssueCountByType) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.issueCount = _data["issueCount"];
            this.typeName = _data["typeName"];
        }
    }

    static fromJS(data: any): GetIssueCountByType {
        data = typeof data === 'object' ? data : {};
        let result = new GetIssueCountByType();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueCount"] = this.issueCount;
        data["typeName"] = this.typeName;
        return data; 
    }
}

export interface IGetIssueCountByType {
    issueCount: number;
    typeName?: string | undefined;
}

export class GetDailyBurnDownData implements IGetDailyBurnDownData {
    dailyBurnDownId!: number;
    sprintId!: number;
    date:string;
    pointsCompleted!:number;
    pointsPending!:number;

    constructor(data?: IGetDailyBurnDownData) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.dailyBurnDownId = _data["dailyBurnDownId"];
            this.sprintId = _data["sprintId"];            
            this.date = _data["date"];
            this.pointsCompleted = _data["pointsCompleted"];
            this.pointsPending = _data["pointsPending"];
        }
    }

    static fromJS(data: any): GetDailyBurnDownData {
        data = typeof data === 'object' ? data : {};
        let result = new GetDailyBurnDownData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dailyBurnDownId"] = this.dailyBurnDownId;
        data["sprintId"] = this.sprintId;
        data["date"] = this.date;
        data["pointsCompleted"] = this.pointsCompleted;
        data["pointsPending"] = this.pointsPending;
        return data; 
    }
}

export interface IGetDailyBurnDownData {
    dailyBurnDownId: number;
    sprintId: number;
    date:string;
    pointsCompleted:number;
    pointsPending:number;
}

export class SuccessResponse implements ISuccessResponse {
    id!: number;
    message?: string | undefined;

    constructor(data?: ISuccessResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.message = _data["message"];
        }
    }

    static fromJS(data: any): SuccessResponse {
        data = typeof data === 'object' ? data : {};
        let result = new SuccessResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["message"] = this.message;
        return data; 
    }
}

export interface ISuccessResponse {
    id: number;
    message?: string | undefined;
}

export class EditSprintRequest extends Sprint implements IEditSprintRequest {
    sprintId!: number;

    constructor(data?: IEditSprintRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.sprintId = _data["sprintId"];
        }
    }

    static fromJS(data: any): EditSprintRequest {
        data = typeof data === 'object' ? data : {};
        let result = new EditSprintRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sprintId"] = this.sprintId;
        super.toJSON(data);
        return data; 
    }
}

export interface IEditSprintRequest extends ISprint {
    sprintId: number;
}

export class CreateSprintRequest extends Sprint implements ICreateSprintRequest {

    constructor(data?: ICreateSprintRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
    }

    static fromJS(data: any): CreateSprintRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateSprintRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        super.toJSON(data);
        return data; 
    }
}

export interface ICreateSprintRequest extends ISprint {
}

export class GetSprintsList implements IGetSprintsList {
    sprintId!: number;
    sprintName?: string | undefined;

    constructor(data?: IGetSprintsList) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sprintId = _data["sprintId"];
            this.sprintName = _data["sprintName"];
        }
    }

    static fromJS(data: any): GetSprintsList {
        data = typeof data === 'object' ? data : {};
        let result = new GetSprintsList();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sprintId"] = this.sprintId;
        data["sprintName"] = this.sprintName;
        return data; 
    }
}

export interface IGetSprintsList {
    sprintId: number;
    sprintName?: string | undefined;
}

export class SprintStatus implements ISprintStatus {
    sprintStatusName?: string | undefined;

    constructor(data?: ISprintStatus) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.sprintStatusName = _data["sprintStatusName"];
        }
    }

    static fromJS(data: any): SprintStatus {
        data = typeof data === 'object' ? data : {};
        let result = new SprintStatus();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sprintStatusName"] = this.sprintStatusName;
        return data; 
    }
}

export interface ISprintStatus {
    sprintStatusName?: string | undefined;
}

export class GetSprintStatusData extends SprintStatus implements IGetSprintStatusData {
    sprintStatusId!: number;

    constructor(data?: IGetSprintStatusData) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.sprintStatusId = _data["sprintStatusId"];
        }
    }

    static fromJS(data: any): GetSprintStatusData {
        data = typeof data === 'object' ? data : {};
        let result = new GetSprintStatusData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["sprintStatusId"] = this.sprintStatusId;
        super.toJSON(data);
        return data; 
    }
}

export interface IGetSprintStatusData extends ISprintStatus {
    sprintStatusId: number;
}

export class Issue implements IIssue {
    subject!: string;
    description?: string | undefined;
    assignedTo!: string;
    tags?: string | undefined;
    issueStatusId!: number;
    createdBy?: string | undefined;
    order!: number;
    issueTypeId!: number;
    attachment?: string | undefined;
    reporter?: string | undefined;
    enviroment?: string | undefined;
    browser?: string | undefined;
    acceptanceCriteria?: string | undefined;
    storyPoints!: number;
    epic!: number;
    uat!: boolean;
    timeTracking?: string | undefined;
    sprintId!:number;

    constructor(data?: IIssue) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.subject = _data["subject"];
            this.description = _data["description"];
            this.assignedTo = _data["assignedTo"];
            this.tags = _data["tags"];
            this.issueStatusId = _data["issueStatusId"];
            this.createdBy = _data["createdBy"];
            this.order = _data["order"];
            this.issueTypeId = _data["issueTypeId"];
            this.attachment = _data["attachment"];
            this.reporter = _data["reporter"];
            this.enviroment = _data["enviroment"];
            this.browser = _data["browser"];
            this.acceptanceCriteria = _data["acceptanceCriteria"];
            this.storyPoints = _data["storyPoints"];
            this.epic = _data["epic"];
            this.uat = _data["uat"];
            this.timeTracking = _data["timeTracking"];
            this.sprintId=_data["sprintId"];
        }
    }

    static fromJS(data: any): Issue {
        data = typeof data === 'object' ? data : {};
        let result = new Issue();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["subject"] = this.subject;
        data["description"] = this.description;
        data["assignedTo"] = this.assignedTo;
        data["tags"] = this.tags;
        data["issueStatusId"] = this.issueStatusId;
        data["createdBy"] = this.createdBy;
        data["order"] = this.order;
        data["issueTypeId"] = this.issueTypeId;
        data["attachment"] = this.attachment;
        data["reporter"] = this.reporter;
        data["enviroment"] = this.enviroment;
        data["browser"] = this.browser;
        data["acceptanceCriteria"] = this.acceptanceCriteria;
        data["storyPoints"] = this.storyPoints;
        data["epic"] = this.epic;
        data["uat"] = this.uat;
        data["timeTracking"] = this.timeTracking;        
        data["sprintId"] = this.sprintId;
        return data; 
    }
}

export interface IIssue {
    subject: string;
    description?: string | undefined;
    assignedTo: string;
    tags?: string | undefined;
    issueStatusId: number;
    createdBy?: string | undefined;
    order: number;
    issueTypeId: number;
    attachment?: string | undefined;
    reporter?: string | undefined;
    enviroment?: string | undefined;
    browser?: string | undefined;
    acceptanceCriteria?: string | undefined;
    storyPoints: number;
    epic: number;
    uat: boolean;
    timeTracking?: string | undefined;
    sprintId:number;
}

export class GetIssueData extends Issue implements IGetIssueData {
    issueId!: number;
    statusName?: string | undefined;
    issueDetailsId!: number;

    constructor(data?: IGetIssueData) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.issueId = _data["issueId"];
            this.statusName = _data["statusName"];
            this.issueDetailsId = _data["issueDetailsId"];
        }
    }

    static fromJS(data: any): GetIssueData {
        data = typeof data === 'object' ? data : {};
        let result = new GetIssueData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueId"] = this.issueId;
        data["statusName"] = this.statusName;
        data["issueDetailsId"] = this.issueDetailsId;
        super.toJSON(data);
        return data; 
    }
}

export interface IGetIssueData extends IIssue {
    issueId: number;
    statusName?: string | undefined;
    issueDetailsId: number;
}

export class EditIssueRequest extends Issue implements IEditIssueRequest {
    issueId!: number;
    issueDetailsId!: number;

    constructor(data?: IEditIssueRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.issueId = _data["issueId"];
            this.issueDetailsId = _data["issueDetailsId"];
        }
    }

    static fromJS(data: any): EditIssueRequest {
        data = typeof data === 'object' ? data : {};
        let result = new EditIssueRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueId"] = this.issueId;
        data["issueDetailsId"] = this.issueDetailsId;
        super.toJSON(data);
        return data; 
    }
}

export interface IEditIssueRequest extends IIssue {
    issueId: number;
    issueDetailsId: number;
}

export class CreateIssueRequest extends Issue implements ICreateIssueRequest {

    constructor(data?: ICreateIssueRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
    }

    static fromJS(data: any): CreateIssueRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateIssueRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        super.toJSON(data);
        return data; 
    }
}

export interface ICreateIssueRequest extends IIssue {
}

export class DragDropIssueRequest implements IDragDropIssueRequest {
    prevItem!: boolean;
    prevItemId!: number;
    nextItemId!: number;
    currentItemIndex!: number;
    issueStatus!: number;
    issueId!: number;

    constructor(data?: IDragDropIssueRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.prevItem = _data["prevItem"];
            this.prevItemId = _data["prevItemId"];
            this.nextItemId = _data["nextItemId"];
            this.currentItemIndex = _data["currentItemIndex"];
            this.issueStatus = _data["issueStatus"];
            this.issueId = _data["issueId"];
        }
    }

    static fromJS(data: any): DragDropIssueRequest {
        data = typeof data === 'object' ? data : {};
        let result = new DragDropIssueRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["prevItem"] = this.prevItem;
        data["prevItemId"] = this.prevItemId;
        data["nextItemId"] = this.nextItemId;
        data["currentItemIndex"] = this.currentItemIndex;
        data["issueStatus"] = this.issueStatus;
        data["issueId"] = this.issueId;
        return data; 
    }
}

export interface IDragDropIssueRequest {
    prevItem: boolean;
    prevItemId: number;
    nextItemId: number;
    currentItemIndex: number;
    issueStatus: number;
    issueId: number;
}

export class IssueStatus implements IIssueStatus {
    statusName!: string;
    createdBy!: string;

    constructor(data?: IIssueStatus) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.statusName = _data["statusName"];
            this.createdBy = _data["createdBy"];
        }
    }

    static fromJS(data: any): IssueStatus {
        data = typeof data === 'object' ? data : {};
        let result = new IssueStatus();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["statusName"] = this.statusName;
        data["createdBy"] = this.createdBy;
        return data; 
    }
}

export interface IIssueStatus {
    statusName: string;
    createdBy: string;
}

export class GetIssueStatusData extends IssueStatus implements IGetIssueStatusData {
    issueStatusId!: number;

    constructor(data?: IGetIssueStatusData) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.issueStatusId = _data["issueStatusId"];
        }
    }

    static fromJS(data: any): GetIssueStatusData {
        data = typeof data === 'object' ? data : {};
        let result = new GetIssueStatusData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueStatusId"] = this.issueStatusId;
        super.toJSON(data);
        return data; 
    }
}

export interface IGetIssueStatusData extends IIssueStatus {
    issueStatusId: number;
}

export class EditIssueStatusRequest extends IssueStatus implements IEditIssueStatusRequest {
    issueStatusId!: number;

    constructor(data?: IEditIssueStatusRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.issueStatusId = _data["issueStatusId"];
        }
    }

    static fromJS(data: any): EditIssueStatusRequest {
        data = typeof data === 'object' ? data : {};
        let result = new EditIssueStatusRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueStatusId"] = this.issueStatusId;
        super.toJSON(data);
        return data; 
    }
}

export interface IEditIssueStatusRequest extends IIssueStatus {
    issueStatusId: number;
}

export class CreateIssueStatusRequest extends IssueStatus implements ICreateIssueStatusRequest {

    constructor(data?: ICreateIssueStatusRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
    }

    static fromJS(data: any): CreateIssueStatusRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateIssueStatusRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        super.toJSON(data);
        return data; 
    }
}

export interface ICreateIssueStatusRequest extends IIssueStatus {
}

export class IssueTypeType implements IIssueTypeType {
    issueTypeName!: string;
    createdBy!: string;

    constructor(data?: IIssueTypeType) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.issueTypeName = _data["issueTypeName"];
            this.createdBy = _data["createdBy"];
        }
    }

    static fromJS(data: any): IssueTypeType {
        data = typeof data === 'object' ? data : {};
        let result = new IssueTypeType();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueTypeName"] = this.issueTypeName;
        data["createdBy"] = this.createdBy;
        return data; 
    }
}

export interface IIssueTypeType {
    issueTypeName: string;
    createdBy: string;
}

export class GetIssueTypeData extends IssueTypeType implements IGetIssueTypeData {
    issueTypeId!: number;

    constructor(data?: IGetIssueTypeData) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.issueTypeId = _data["issueTypeId"];
        }
    }

    static fromJS(data: any): GetIssueTypeData {
        data = typeof data === 'object' ? data : {};
        let result = new GetIssueTypeData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueTypeId"] = this.issueTypeId;
        super.toJSON(data);
        return data; 
    }
}

export interface IGetIssueTypeData extends IIssueTypeType {
    issueTypeId: number;
}

export class EditIssueTypeRequest extends IssueTypeType implements IEditIssueTypeRequest {
    issueTypeId!: number;

    constructor(data?: IEditIssueTypeRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.issueTypeId = _data["issueTypeId"];
        }
    }

    static fromJS(data: any): EditIssueTypeRequest {
        data = typeof data === 'object' ? data : {};
        let result = new EditIssueTypeRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["issueTypeId"] = this.issueTypeId;
        super.toJSON(data);
        return data; 
    }
}

export interface IEditIssueTypeRequest extends IIssueTypeType {
    issueTypeId: number;
}

export class CreateIssueTypeRequest extends IssueTypeType implements ICreateIssueTypeRequest {

    constructor(data?: ICreateIssueTypeRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
    }

    static fromJS(data: any): CreateIssueTypeRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateIssueTypeRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        super.toJSON(data);
        return data; 
    }
}

export interface ICreateIssueTypeRequest extends IIssueTypeType {
}

export class RegisterUserRequest implements IRegisterUserRequest {
    userName!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
    userRole!:string;

    constructor(data?: IRegisterUserRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.userName = _data["userName"];
            this.email = _data["email"];
            this.password = _data["password"];
            this.confirmPassword = _data["confirmPassword"];
            this.userRole=_data["userRole"];
        }
    }

    static fromJS(data: any): RegisterUserRequest {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterUserRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userName"] = this.userName;
        data["email"] = this.email;
        data["password"] = this.password;
        data["confirmPassword"] = this.confirmPassword;
        data["userRole"]=this.userRole;
        return data; 
    }
}

export interface IRegisterUserRequest {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userRole:string;
}

export class GetUsersData implements IGetUsersData {
    id?: string | undefined;
    username?: string | undefined;

    constructor(data?: IGetUsersData) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.username = _data["username"];
        }
    }

    static fromJS(data: any): GetUsersData {
        data = typeof data === 'object' ? data : {};
        let result = new GetUsersData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["username"] = this.username;
        return data; 
    }
}

export interface IGetUsersData {
    id?: string | undefined;
    username?: string | undefined;
}

export class Release implements IRelease {
    releaseName?: string | undefined;
    sprintStatusId!: number;
    startDate!: Date;
    endDate!: Date;
    createdBy?: string | undefined;

    constructor(data?: IRelease) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.releaseName = _data["releaseName"];
            this.sprintStatusId = _data["sprintStatusId"];
            this.startDate = _data["startDate"] ? new Date(_data["startDate"].toString()) : <any>undefined;
            this.endDate = _data["endDate"] ? new Date(_data["endDate"].toString()) : <any>undefined;
            this.createdBy = _data["createdBy"];
        }
    }

    static fromJS(data: any): Release {
        data = typeof data === 'object' ? data : {};
        let result = new Release();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["releaseName"] = this.releaseName;
        data["sprintStatusId"] = this.sprintStatusId;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        return data; 
    }
}

export interface IRelease {
    releaseName?: string | undefined;
    sprintStatusId: number;
    startDate: Date;
    endDate: Date;
    createdBy?: string | undefined;
}

export class GetReleaseData extends Release implements IGetReleaseData {
    releaseId!: number;
    sprintStatusName?: string | undefined;

    constructor(data?: IGetReleaseData) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.releaseId = _data["releaseId"];
            this.sprintStatusName = _data["sprintStatusName"];
        }
    }

    static fromJS(data: any): GetReleaseData {
        data = typeof data === 'object' ? data : {};
        let result = new GetReleaseData();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["releaseId"] = this.releaseId;
        data["sprintStatusName"] = this.sprintStatusName;
        super.toJSON(data);
        return data; 
    }
}

export interface IGetReleaseData extends IRelease {
    releaseId: number;
    sprintStatusName?: string | undefined;
}

export class EditReleaseRequest extends Release implements IEditReleaseRequest {
    releaseId!: number;

    constructor(data?: IEditReleaseRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.releaseId = _data["releaseId"];
        }
    }

    static fromJS(data: any): EditReleaseRequest {
        data = typeof data === 'object' ? data : {};
        let result = new EditReleaseRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["releaseId"] = this.releaseId;
        super.toJSON(data);
        return data; 
    }
}

export interface IEditReleaseRequest extends IRelease {
    releaseId: number;
}

export class CreateReleaseRequest extends Release implements ICreateReleaseRequest {

    constructor(data?: ICreateReleaseRequest) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
    }

    static fromJS(data: any): CreateReleaseRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreateReleaseRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        super.toJSON(data);
        return data; 
    }
}

export interface ICreateReleaseRequest extends IRelease {
}

export class GetReleaseList implements IGetReleaseList {
    releaseId!: number;
    releaseName?: string | undefined;

    constructor(data?: IGetReleaseList) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.releaseId = _data["releaseId"];
            this.releaseName = _data["releaseName"];
        }
    }

    static fromJS(data: any): GetReleaseList {
        data = typeof data === 'object' ? data : {};
        let result = new GetReleaseList();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["releaseId"] = this.releaseId;
        data["releaseName"] = this.releaseName;
        return data; 
    }
}

export interface IGetReleaseList {
    releaseId: number;
    releaseName?: string | undefined;
}

export class User implements IUser {
    username!: string;
    password!: string;

    constructor(data?: IUser) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.username = _data["username"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): User {
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["password"] = this.password;
        return data; 
    }
}

export interface IUser {
    username: string;
    password: string;
}

// export class CreateSignInUserRequest extends User implements ICreateSignInUserRequest {

//     constructor(data?: ICreateSignInUserRequest) {
//         super(data);
//     }

//     init(_data?: any) {
//         super.init(_data);
//     }

//     static fromJS(data: any): CreateSignInUserRequest {
//         data = typeof data === 'object' ? data : {};
//         let result = new CreateSignInUserRequest();
//         result.init(data);
//         return result;
//     }

//     toJSON(data?: any) {
//         data = typeof data === 'object' ? data : {};
//         super.toJSON(data);
//         return data; 
//     }
// }

export interface ICreateSignInUserRequest extends IUser {
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}
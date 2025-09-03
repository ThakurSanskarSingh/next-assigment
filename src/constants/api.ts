 import { apiFetch } from "@/util/fetch";

// below code is a wrapper around apiFetch for common HTTP methods so that we don't have to specify method and headers every time 
 //instead of call fetch wtih method and headers we can call api.get, api.post, api.put, api.delete


export const api = {
  get: (url: string) => apiFetch(url),
  post: (url: string, body: any) => apiFetch(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url: string, body: any) => apiFetch(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (url: string) => apiFetch(url, { method: 'DELETE' }),
};
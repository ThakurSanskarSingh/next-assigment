export async function apiFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });     

    const data = await response.json();
    
    return {
      data,
      error: data?.error || null,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: 'Network error',
      ok: false,
      status: 500,
    };
  }
}

export const api = {
  get: (url: string) => apiFetch(url),
  post: (url: string, body: any) => apiFetch(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url: string, body: any) => apiFetch(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (url: string) => apiFetch(url, { method: 'DELETE' }),
};

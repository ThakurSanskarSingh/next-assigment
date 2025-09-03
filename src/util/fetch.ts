
//below function is to make api calls with error handling and passing headers and method in options

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




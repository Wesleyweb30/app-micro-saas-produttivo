import 'server-only';
interface ProduttivoResponse<T> {
  results: T[];
  meta: {
    current_page: number;
    count: number;
    from: number;
    total_pages: number;
    to: number;
    total?: number;
  };
}

export async function httpProduttivo<T>(
  endpoint: string
): Promise<ProduttivoResponse<T> | null> {

  const baseUrl =
    process.env.API_BASE_URL?.replace(/\/$/, '') ||
    'https://app.produttivo.com.br';

  const url = endpoint.startsWith('/')
    ? `${baseUrl}${endpoint}`
    : `${baseUrl}/${endpoint}`;

  const headers = {
    'X-Auth-Login': process.env.PRODUTTIVO_LOGIN ?? '',
    'X-Auth-Register': process.env.PRODUTTIVO_REGISTER ?? '',
    'X-Auth-Token': process.env.PRODUTTIVO_TOKEN ?? '',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Erro API Produttivo', {
        endpoint,
        status: res.status,
        errorText,
      });
      return null;
    }

    return (await res.json()) as ProduttivoResponse<T>;

  } catch (error) {
    console.error('Erro crítico de conexão:', error);
    return null;
  }
}

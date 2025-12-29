export function buildQuery(
  params: Record<string, any>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, String(v)));
      return;
    }

    searchParams.append(key, String(value));
  });

  return searchParams.toString();
}

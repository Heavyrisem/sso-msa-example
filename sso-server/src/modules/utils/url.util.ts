export const createQueryParameter = (
  params: Record<string, string | string[] | Record<string, string>>,
) => {
  const result = Object.entries(params).map(([key, value]) => {
    if (typeof value === 'string') return `${key}=${encodeURIComponent(value)}`;
    if (Array.isArray(value)) return `${key}=${encodeURIComponent(value.join(' '))}`;
    if (typeof value === 'object') return `${key}=${encodeURIComponent(JSON.stringify(value))}`;
    throw new Error(`Unsupported Parameter Type: ${typeof value}, ${key}: ${value}`);
  });

  return result.join('&');
};

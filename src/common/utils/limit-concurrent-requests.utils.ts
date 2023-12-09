export async function limitConcurrentRequests<T>(
  promiseFunctions: (() => Promise<T>)[],
  limit: number,
) {
  const pLimit = (await import('p-limit')).default;
  const limitPromise = pLimit(limit);

  const limitedPromises = promiseFunctions.map((func) => limitPromise(func));

  return Promise.allSettled(limitedPromises);
}

export async function limitConcurrentRequests<T>(
  limit: number,
  promiseFunctions: (() => Promise<T>)[],
) {
  const pLimit = (await import('p-limit')).default;
  const limitPromise = pLimit(limit);

  const limitedPromises = promiseFunctions.map((func) => limitPromise(func));

  return Promise.allSettled(limitedPromises);
}

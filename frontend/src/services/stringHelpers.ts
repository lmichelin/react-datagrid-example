export const normalizeForSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // https://stackoverflow.com/a/37511463
    .trim()
    .toLowerCase()

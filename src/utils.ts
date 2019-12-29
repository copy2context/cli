export const convertDirectoriesToArray = (data: { [s: string]: string }) =>
  Object.entries(data).map(([key, value]) => ({ file: key, path: value }));

export const generateFileName = (dir: string, file: string, fileExt = 'js') =>
  `${dir}/${file}.${fileExt}`;

export const getImageUrl = (image: string) => {
  return `/images/products/${image}`;
}


export const generateFilterUrl = (
  searchParams: any,
  key: string,
  value: string
) => {
  console.log(searchParams, key, value)
  let params = new URLSearchParams(searchParams.toString());
  return params.toString();

}
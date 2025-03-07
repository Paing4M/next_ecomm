interface CategoryHomeInterface {
  _id: string;
  name: string;
  slug: string;
}

interface FormActionI<T> {
  error?: StringMap
  status?: number
  message?: string
  data?: T
}

interface StringMap {
  [key: string]: string;
}
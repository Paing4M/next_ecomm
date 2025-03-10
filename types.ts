interface CategoryHomeInterface {
  _id: string;
  name: string;
  slug: string;
}

interface FormActionI {
  error?: StringMap
  status?: number
  message?: string
  data?: any
  inputData?: any
}

interface StringMap {
  [key: string]: string;
}


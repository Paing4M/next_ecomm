interface CategoryI {
  _id: string;
  name: string;
  slug: string;
}

interface FormActionI {
  error?: StringMap
  status?: number
  message?: string
  inputData?: any
}

interface StringMap {
  [key: string]: string;
}


interface OrderI {
  _id: string;
  userEmail: string;
  stripeSessionId: string;
  totalAmount: number;
}

const ErrorMsg = ({error}: { error: string }) => {
  return (
    <p className='text-redBackground text-sm w-full text-wrap'>{error}</p>
  )
}

export default ErrorMsg

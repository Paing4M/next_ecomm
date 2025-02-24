const Title = ({title, className}: { title: string, className?: string }) => {
  return (
    <div className={`flex gap-3 items-center mb-4 ${className}`}>
      <div className='w-[10px] rounded-sm h-[24px] bg-redBackground'/>
      <p className='text-sm text-redBackground capitalize'>
        {title}
      </p>
    </div>
  )
}

export default Title

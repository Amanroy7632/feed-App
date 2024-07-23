import React, { useId } from 'react'

const DropDown=React.forwardRef(function DropDown({label,className='',icon,...props},ref) {
    const id =useId()
  return (
    <div className="w-full flex flex-col">
    <div className='flex items-center gap-1'>
    {icon&&<span className="">{icon}</span>}
        {label &&<label className=" inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
    </div>
    <select name="role" id={id} className={`outline-none px-3 py-2 rounded-lg overflow-hidden ${className}`} ref={ref} {...props}>
      <option value="1" >Normal User</option>
      <option value="2" >Admin</option>
    </select>
  </div>
  )
})

export default DropDown
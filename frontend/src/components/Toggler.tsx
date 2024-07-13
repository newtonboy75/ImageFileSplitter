
import { useState } from 'react'

const Switcher10 = (props: { sendData: (arg0: boolean) => void }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    props.sendData(isChecked)
  }

  return (
    <div className='items-end'>
      <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center mt-10'>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-[#eeeeee]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
          Tile Image <span className='pl-1'> {isChecked ? 'On' : 'Off'} </span>
        </span>
      </label>
    </div>
  )
}

export default Switcher10
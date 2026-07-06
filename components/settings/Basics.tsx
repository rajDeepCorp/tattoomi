// components/settings/Basics.tsx

import React from 'react'

const Basics = () => {
  return (
    <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
      <summary className='relative list-none cursor-pointer font-bold text-center'>Basic</summary>
      <ul className='relative text-sm mt-2'>
        <li>Edit Your Name</li>
        <li>Edit Your DOB</li>
        <li>Edit Your Bio</li>
        <li>Edit Your Address</li>
      </ul>
    </details>
  )
}

export default Basics

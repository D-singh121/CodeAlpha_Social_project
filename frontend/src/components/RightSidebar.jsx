import { CiSearch } from 'react-icons/ci'
import FollowComp from './FollowComp.jsx';

const RightSidebar = () => {
  return (
    <section className='w-[25%]'>
      {/* search bar */}
      <div className='flex items-center m-1 p-3 bg-gray-100 rounded-full outline-none w-full'>
        <CiSearch size="26px" />
        <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>

      {/* Who to follow */}
      <div className='w-full p-3 mt-4 border-gray-100 border rounded-3xl bg-gray-100'>
        <h1 className='text-black font-bold text-2xl pb-6 pt-2 pl-2'> Who to follow</h1>
        <FollowComp />
        <FollowComp />
        <FollowComp />
        <FollowComp />

      </div>

    </section>
  )
}

export default RightSidebar;

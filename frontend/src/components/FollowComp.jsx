import Avatar from "react-avatar"
import { Button } from "./index.js"
import { MdVerified } from "react-icons/md";

const FollowComp = () => {
	return (
		<section className="cursor-pointer">
			<div className='flex justify-between items-center w-full hover:bg-slate-200 rounded-2xl p-2'>
				<div>
					<Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="35" round={true} />
				</div>

				<div className='flex justify-between items-center w-full'>
					<div className='ml-2'>
						<div className='font-semibold text-md flex justify-between items-center'>Devesh Singh <span className="text-[#1d9bf0] pl-1 ">
							<MdVerified size='18px' />
						</span> </div>
						<h2 className='opacity-60 text-sm'>@Dee_777</h2>
					</div>

					<Button
						children='Follow'
						userClassName='bg-[#000000] px-4 py-1 text-sm text-white text-right border-none rounded-full '
					/>
				</div>

			</div>
		</section>
	)
}

export default FollowComp;
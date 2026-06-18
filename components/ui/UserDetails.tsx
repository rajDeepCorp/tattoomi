


type UserDetailsProps = {
    user: {
        username?: string | null;        
        address?: string | null;
        bio?: string | null;
    };
};

const buttonClasses = "relative shadow dark:shadow-inner shadow-stone-500 py-1 px-2 hover:scale-105 transition-all ease-in duration-150";

export const UserDetails = ({ user }: UserDetailsProps) => {

    return (
        <div className='relative sm:w-2/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 text-shadow-xs text-shadow-stone-500'>

            <h1 className='relative max-w-fit text-xl text-center dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1'>
                {user.username || 'UserName'}
            </h1>

            <address className='relative text-xs opacity-60 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-2xl py-0.5 px-2 text-shadow-lg my-1'>
                244, Subhash Nagar, Bareilly - 243001
            </address>

            <p className='relative text-sm opacity-80 max-w-fit dark:shadow shadow-inner shadow-stone-500 rounded-xl py-0.5 px-2 text-shadow-lg my-1'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia laudantium obcaecati, quod qui aliquam totam.
            </p>

            <div className='relative flex max-w-fit justify-start items-center dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 my-2 gap-2'>
                <button className={`${buttonClasses} rounded-4xl`}>Clients</button>
                <button className={`${buttonClasses} rounded-4xl`}>Hood</button>
                <button className={`${buttonClasses} rounded-4xl`}>Calls</button>
            </div>
        </div>
    )
}
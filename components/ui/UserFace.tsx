import Image from "next/image";

type UserFaceProps = { user: { name?: string | null; image?: string | null; }; };

export const UserFace = ({ user }: UserFaceProps) => {

  return (
    <div className="relative sm:w-1/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 flex flex-col justify-start items-center gap-2">
      <div className="relative w-37.5 h-37.5 rounded-full overflow-hidden dark:shadow shadow-inner shadow-stone-500 p-2">
        <Image
          src={user.image || "/userpic.jpg"}
          alt="Profile Pic"
          fill
          className="rounded-full object-cover"
          sizes="150px"
        />
      </div>
      <p className="relative dark:shadow min-w-1/2 shadow-inner shadow-stone-500 rounded-2xl py-0.5 text-xl text-center text-shadow-lg opacity-80 font-light">
        {user.name || "User Name"}
      </p>
    </div>
  );
};
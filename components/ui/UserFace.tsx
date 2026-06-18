import Image from "next/image";

type UserFaceProps = {
  user: {
    name?: string | null;
    image?: string | null;
    username?: string | null;
  };
};

export const UserFace = ({ user }: UserFaceProps) => {

  return (
    <div className="relative sm:w-1/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-2 flex flex-col justify-start items-center gap-2">
      <Image
        width={150}
        height={150}
        src={user.image || "/userpic.jpg"}
        alt="Profile Pic"
        className="relative dark:shadow shadow-inner shadow-stone-500 rounded-full p-2 cursor-pointer"
      />
      <p className="relative dark:shadow min-w-1/2 shadow-inner shadow-stone-500 rounded-2xl py-0.5 text-xl text-center text-shadow-lg opacity-80 font-light">
        {user.name || "User Name"}
      </p>
    </div>
  );
};
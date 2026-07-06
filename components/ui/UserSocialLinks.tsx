import Link from "next/link";
import { CiFacebook, CiInstagram, CiLinkedin, CiYoutube, } from "react-icons/ci";
import { RiTwitterXLine } from "react-icons/ri";

const socialLinkClasses = "relative shadow dark:shadow-inner shadow-stone-500 rounded-full p-3 hover:scale-105 transition-all ease-in duration-150 text-3xl";

type UserSocialLinksProps = {
    user: any;
};

export const UserSocialLinks = ({ user }: UserSocialLinksProps) => {

    const socialLinks = [
        { key: "facebook", icon: <CiFacebook />, href: user.facebook, },
        { key: "instagram", icon: <CiInstagram />, href: user.instagram, },
        { key: "twitter", icon: <RiTwitterXLine />, href: user.twitter, },
        { key: "linkedin", icon: <CiLinkedin />, href: user.linkedin, },
        { key: "youtube", icon: <CiYoutube />, href: user.youtube, },
    ].filter(({ href }) => href);

    return (
        <div className="relative sm:w-1/5 w-full shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-1">
            <p className="relative text-center shadow dark:shadow-inner shadow-stone-500 rounded-2xl mx-1 my-2 p-1 italic font-bold">
                Links
            </p>
            <div className="relative max-w-full dark:shadow shadow-inner shadow-stone-500 rounded-4xl p-2 mx-1 my-1 flex flex-wrap not-sm:justify-between justify-start items-center gap-4">
                {socialLinks.length > 0 ? (
                    socialLinks.map(({ key, href, icon }) => (
                        <Link
                            key={key}
                            href={href!}
                            target="_blank"
                            className={socialLinkClasses}
                        >
                            {icon}
                        </Link>
                    ))
                ) : (
                    <p className="relative w-full text-center italic text-stone-500 py-0">No links</p>
                )}
            </div>
        </div>
    );
};
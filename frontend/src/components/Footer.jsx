import { FaFacebook, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto p-4 md:px-0 ">
        <Link to={"/"} className="flex mb-8 items-center justify-center gap-1">
          <img
            src="/assets/logo-2.png"
            alt="logo"
            className="w-[60px] h-[60px]"
          />
          <span className="text-4xl font-bold text-green hidden md:inline">
            JobZee
          </span>
        </Link>
        <ul className="flex items-center gap-4 justify-center w-full flex-wrap">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61557725777687"
              target="_blank"
            >
              <FaFacebook size={24} className="hover:text-green transition" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/EsraaGa07912984" target="_blank">
              <FaSquareXTwitter
                size={24}
                className="hover:text-green transition"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCA8MUECNxImHjJpFafEGQPw"
              target="_blank"
            >
              <FaYoutube size={24} className="hover:text-green transition" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/esraa-gamal-38087b301/"
              target="_blank"
            >
              <FaLinkedin size={24} className="hover:text-green transition" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Esraa102" target="_blank">
              <FaGithub size={24} className="hover:text-green transition" />
            </a>
          </li>
        </ul>
      </div>
      <div className="text-center text-sm border-t mt-4 border-white  pt-4 pb-2">
        Copyright &copy; 2024, All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

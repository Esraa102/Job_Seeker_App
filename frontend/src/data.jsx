import {
  FaSuitcase,
  FaBuilding,
  FaUsers,
  FaUserPlus,
  FaMicrosoft,
  FaApple,
} from "react-icons/fa";
import {
  MdFindInPage,
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { SiTesla } from "react-icons/si";

export const details = [
  {
    id: 1,
    title: "1,23,441",
    subTitle: "Live Job",
    icon: <FaSuitcase />,
  },
  {
    id: 2,
    title: "91220",
    subTitle: "Companies",
    icon: <FaBuilding />,
  },
  {
    id: 3,
    title: "2,34,200",
    subTitle: "Job Seekers",
    icon: <FaUsers />,
  },
  {
    id: 4,
    title: "1,03,761",
    subTitle: "Employers",
    icon: <FaUserPlus />,
  },
];

export const HowItWorksData = [
  {
    id: 1,
    icon: <FaUserPlus size={34} className="text-green" />,
    title: "Create Account",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Consequuntur, culpa",
  },
  {
    id: 2,
    icon: <MdFindInPage size={34} className="text-green" />,
    title: "Find a Job/Post a Job",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Consequuntur, culpa",
  },
  {
    id: 3,
    icon: <IoMdSend size={34} className="text-green" />,
    title: "Apply For Job/Recruit Suitable Candidates",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Consequuntur, culpa",
  },
];

export const categories = [
  {
    id: 1,
    title: "Graphics & Design",
    subTitle: "305 Open Positions",
    icon: <MdOutlineDesignServices />,
  },
  {
    id: 2,
    title: "Mobile App ",
    subTitle: "500 Open Positions",
    icon: <TbAppsFilled />,
  },
  {
    id: 3,
    title: "Frontend  WEB",
    subTitle: "200 Open Positions",
    icon: <MdOutlineWebhook />,
  },
  {
    id: 4,
    title: "MERN  STACK",
    subTitle: "1000+ Open Postions",
    icon: <FaReact />,
  },
  {
    id: 5,
    title: "Account & Finance",
    subTitle: "150 Open Positions",
    icon: <MdAccountBalance />,
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    subTitle: "867 Open Positions",
    icon: <GiArtificialIntelligence />,
  },
  {
    id: 7,
    title: "Video Animation",
    subTitle: "50 Open Positions",
    icon: <MdOutlineAnimation />,
  },
  {
    id: 8,
    title: "Game Development",
    subTitle: "80 Open Positions",
    icon: <IoGameController />,
  },
];

export const companies = [
  {
    id: 1,
    title: "Microsoft",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 10,
    icon: <FaMicrosoft />,
  },
  {
    id: 2,
    title: "Tesla",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 5,
    icon: <SiTesla />,
  },
  {
    id: 3,
    title: "Apple",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 20,
    icon: <FaApple />,
  },
];

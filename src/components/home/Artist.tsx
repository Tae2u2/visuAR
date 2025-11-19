import Image from "next/image";
import Link from "next/link";
import { RxDoubleArrowRight } from "react-icons/rx";

const Artist = () => {
  return (
    <div className="w-full bg-white shadow">
      <div className="flex justify-between items-center px-5 py-3 bg-blue-700 text-white">
        <ul className="flex gap-3 text-sm font-medium">
          <li>
            <button className="flex flex-col justify-start items-center gap-1">
              <Image
                src={"/profile/bang.jpg"}
                alt="profile"
                width={70}
                height={70}
                className="w-[70px] h-[70px] rounded-full object-cover inline-block mr-1"
              />
              <div className="absolute self-end bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold">
                N
              </div>
              <span className="text-sm px-2 font-bold">방스타</span>
            </button>
          </li>
          <li>
            <button className="flex flex-col justify-start items-center gap-1">
              <Image
                src={"/profile/bbock.jpg"}
                alt="profile"
                width={70}
                height={70}
                className="w-[70px] h-[70px] rounded-full object-cover inline-block mr-1"
              />
              <div className="absolute self-end bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold">
                N
              </div>
              <span className="text-sm px-2 font-bold">복스타</span>
            </button>
          </li>
          <li>
            <button className="flex flex-col justify-start items-center gap-1">
              <Image
                src={"/profile/cat.jpg"}
                alt="profile"
                width={70}
                height={70}
                className="w-[70px] h-[70px] rounded-full object-cover inline-block mr-1"
              />
              <div className="absolute self-end bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold">
                N
              </div>
              <span className="text-sm px-2 font-bold">노스타</span>
            </button>
          </li>
        </ul>
        <Link href={"/fans"} className="flex items-center gap-1 text-sm">
          More
          <RxDoubleArrowRight />
        </Link>
      </div>
      <div>
        <section className="flex flex-col justify-start items-start gap-3 p-5">
          <h4>노스타</h4>
          <Image
            src={"/profile/cat.jpg"}
            alt="profile"
            width={450}
            height={450}
          />
          <p>나 프로필 바꿨어 어때</p>
        </section>
      </div>
    </div>
  );
};

export default Artist;

import Link from "next/link";
import { RxDoubleArrowRight } from "react-icons/rx";

const Notice = () => {
  return (
    <div className="w-full min-w-[650px]">
      <div className="flex justify-between items-center px-5 py-3 border-b bg-blue-700 text-white">
        <h4 className=" font-bold">NOTICE</h4>
        <Link href={"/fans"} className="flex items-center gap-[2px] text-sm">
          More
          <RxDoubleArrowRight />
        </Link>
      </div>
      <ul>
        <li className="px-5 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
          <span>2025-09-11</span>
          <p>앨범 발매 기념 이벤트</p>
        </li>
        <li className="px-5 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
          <span>2025-09-11</span>
          <p>앨범 발매 기념 이벤트</p>
        </li>
        <li className="px-5 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
          <span>2025-09-11</span>
          <p>앨범 발매 기념 이벤트</p>
        </li>
      </ul>
    </div>
  );
};

export default Notice;

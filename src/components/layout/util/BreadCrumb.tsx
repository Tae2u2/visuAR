import { ReactNode } from "react";
import { MdArrowRight } from "react-icons/md";

const BreadCrumb = ({
  title,
  category,
  locate,
}: {
  title: string;
  category: string;
  locate: string;
}) => {
  return (
    <div className="flex justify-between items-center w-full pt-5 px-5">
      <h2 className="font-roboto font-semibold text-lg text-gray-800">
        {title}
      </h2>
      <p className="flex items-center text-sm text-gray-600">
        {category}
        <MdArrowRight />
        {locate}
      </p>
    </div>
  );
};

export default BreadCrumb;

import { BsClock } from "react-icons/bs";

export const IconWidget = ({
  title,
  numberData,
  color,
  textData,
  icon,
}: {
  title: string;
  numberData: string;
  color: "red" | "green" | "blue" | "purple" | "orange";
  textData: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700 font-pretendard">
            {title}
          </p>
          <p className={`text-2xl font-bold text-${color}-600`}>{numberData}</p>
        </div>
        <div className={`bg-${color}-100 p-3 rounded-full`}>{icon}</div>
      </div>
      <p className="text-xs text-gray-500 mt-2">{textData}</p>
    </div>
  );
};

export interface ColorCardWidgetProps {
  text: string;
  time: string;
  type:
    | "live"
    | "fan-event"
    | "radio"
    | "broadcast"
    | "upload"
    | "open-schedule"
    | "secret-schedule";
}

export const ColorCardWidget = ({ text, time, type }: ColorCardWidgetProps) => {
  const matchTypeToColor = (type: string) => {
    switch (type) {
      case "live":
        return "bg-blue-100 text-blue-800";
      case "fan-event":
        return "bg-green-100 text-green-800";
      case "radio":
        return "bg-purple-100 text-purple-800";
      case "broadcast":
        return "bg-yellow-100 text-yellow-800";
      case "upload":
        return "bg-pink-100 text-pink-800";
      case "open-schedule":
        return "bg-teal-100 text-teal-800";
      case "secret-schedule":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };
  return (
    <li className={`p-3 rounded ${matchTypeToColor(type)} shadow`}>
      <p className="flex flex-col justify-around gap-2 text-sm p-3 rounded-sm font-semibold border-4 border-white border-double">
        <span
          className={`w-fit ${matchTypeToColor(
            type
          )} border-2 shadow border-white px-2`}
        >
          {type}
        </span>
        <span className="inline-flex items-center gap-1 text-black font-normal">
          {time}
        </span>
        {text}
      </p>
    </li>
  );
};

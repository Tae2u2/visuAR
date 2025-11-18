"use client";

import { useState, useRef, useEffect } from "react";
import { SectionTitle } from "../util/Text";

interface FanUser {
  id: number;
  membership: boolean;
  name: string;
  userId: string;
  nickname: string;
  reportCount: number;
  warningCount: number;
}

interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  selectedUser: FanUser | null;
}

interface ModalState {
  isOpen: boolean;
  type: "posts" | "warning" | "reports" | null;
  user: FanUser | null;
}

const FanUserList = () => {
  const [allFanUsers, setAllFanUser] = useState<FanUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(allFanUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFanUsers = allFanUsers.slice(startIndex, endIndex);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    selectedUser: null,
  });

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    user: null,
  });

  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleRightClick = (e: React.MouseEvent, user: FanUser) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      selectedUser: user,
    });
  };

  const handleContextMenuClick = (type: "posts" | "warning" | "reports") => {
    setModal({
      isOpen: true,
      type,
      user: contextMenu.selectedUser,
    });
    setContextMenu({ isOpen: false, x: 0, y: 0, selectedUser: null });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, user: null });
  };

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, x: 0, y: 0, selectedUser: null });
  };

  const generateFanUsers = (count: number): FanUser[] => {
    const names = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임"];
    const lastNames = [
      "민수",
      "영희",
      "철수",
      "혜진",
      "준호",
      "소영",
      "동현",
      "미정",
      "성민",
      "유진",
    ];
    const nicknamePrefixes = [
      "팬",
      "스타",
      "아이돌",
      "음악",
      "사랑",
      "행복",
      "꿈꾸는",
      "열정",
      "멋진",
      "예쁜",
    ];
    const nicknameSuffixes = [
      "러버",
      "매니아",
      "팬",
      "홀릭",
      "킹",
      "퀸",
      "123",
      "456",
      "789",
      "2024",
    ];

    return Array.from({ length: count }, (_, index) => {
      const id = index + 1;
      const firstName = names[Math.floor(Math.random() * names.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const nickPrefix =
        nicknamePrefixes[Math.floor(Math.random() * nicknamePrefixes.length)];
      const nickSuffix =
        nicknameSuffixes[Math.floor(Math.random() * nicknameSuffixes.length)];

      return {
        id,
        membership: Math.random() > 0.3,
        name: firstName + lastName,
        userId: `user_${id.toString().padStart(4, "0")}`,
        nickname: nickPrefix + nickSuffix,
        reportCount: Math.floor(Math.random() * 5),
        warningCount: Math.floor(Math.random() * 3),
      };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    if (contextMenu.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu.isOpen]);

  useEffect(() => {
    setAllFanUser(() => generateFanUsers(1300));
  }, []);

  const getModalTitle = () => {
    switch (modal.type) {
      case "posts":
        return "사용자 작성 글 목록";
      case "warning":
        return "경고 추가";
      case "reports":
        return "신고 상세 내역";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white pb-5 shadow rounded">
      <div className="overflow-x-auto p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-500">
              <th className="px-4 py-2 text-left">membership</th>
              <th className="px-4 py-2 text-left">name</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">nickname</th>
              <th className="px-4 py-2 text-left">report count</th>
              <th className="px-4 py-2 text-left">warning count</th>
            </tr>
          </thead>
          <tbody>
            {currentFanUsers?.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onContextMenu={(e) => handleRightClick(e, user)}
              >
                <td className="border-y border-gray-300 px-4 py-2 text-slate-700">
                  <span
                    className={`flex justify-center py-[2px] w-[72px] font-light text-center font-sans rounded text-sm border-[1px] ${
                      user.membership
                        ? "bg-green-100 text-green-600 font-semibold border-green-600"
                        : "bg-gray-100 text-gray-400 font-semibold border-gray-600"
                    }`}
                  >
                    {user.membership ? "member" : "basic"}
                  </span>
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  {user.userId}
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  {user.nickname}
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  <span
                    className={`${
                      user.reportCount > 0 ? "text-red-600 font-semibold" : ""
                    }`}
                  >
                    {user.reportCount > 0 ? user.reportCount : "-"}
                  </span>
                </td>
                <td className="border-y border-gray-300 px-4 py-2">
                  <span
                    className={`${
                      user.warningCount > 0
                        ? "text-orange-600 font-semibold"
                        : ""
                    }`}
                  >
                    {user.warningCount > 0 ? user.warningCount : "-"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {contextMenu.isOpen && (
        <div
          ref={contextMenuRef}
          className="fixed max-w-[350px] bg-white border border-gray-300 rounded shadow-lg z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 border-b border-slate-400 hover:bg-gray-100 text-sm cursor-pointer"
              onClick={() => handleContextMenuClick("posts")}
            >
              이 사용자가 작성한 글 보기
            </button>
            <button
              className="w-full text-left px-4 py-2 border-b border-slate-400 hover:bg-gray-100 text-sm cursor-pointer"
              onClick={() => handleContextMenuClick("warning")}
            >
              이 사용자에게 경고 추가하기
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
              onClick={() => handleContextMenuClick("reports")}
            >
              신고 상세 내역 보기
            </button>
          </div>
        </div>
      )}

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{getModalTitle()}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                사용자:{" "}
                <span className="font-medium">
                  {modal.user?.name} ({modal.user?.userId})
                </span>
              </p>
            </div>
            <div className="text-center text-gray-500 py-8">
              {modal.type === "posts" && "작성한 글 목록이 여기에 표시됩니다."}
              {modal.type === "warning" && "경고 추가 폼이 여기에 표시됩니다."}
              {modal.type === "reports" &&
                "신고 상세 내역이 여기에 표시됩니다."}
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>

        <div className="flex space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = index + 1;
            } else if (currentPage <= 3) {
              pageNumber = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + index;
            } else {
              pageNumber = currentPage - 2 + index;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-1 border border-gray-300 rounded ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>

      <div className="mt-2 text-center text-sm text-gray-600">
        {startIndex + 1}-{Math.min(endIndex, allFanUsers.length)} /{" "}
        {allFanUsers.length}명
      </div>
    </div>
  );
};

export default FanUserList;

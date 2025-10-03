// 필터 설정 및 상수
export const filterConfigs = {
  rabbit: {
    image: "./images/rabbit.png",
    scale: 0.5,
    offsetY: -130,
    landmarks: [10],
  },
  cat: {
    image: "./images/cat.png",
    scale: 0.4,
    offsetY: -100,
    landmarks: [10],
  },
  dog: {
    image: "./images/puppy.png",
    scale: 0.4,
    offsetY: -80,
    landmarks: [10],
  },
  sparkles: {
    type: "particles",
    landmarks: [10, 338, 297, 332, 284, 251, 389, 356, 454], // 얼굴 윤곽
    color: "rainbow",
    animation: "twinkle",
  },
  hearts: {
    type: "particles",
    landmarks: [33, 7, 163, 144, 145, 153, 362, 398, 384, 385, 386, 387], // 눈 주변
    color: "pink",
    animation: "float",
  },
};

export const filterButtons = [
  { id: "rabbit", emoji: "🐰", name: "토끼" },
  { id: "cat", emoji: "🐱", name: "고양이" },
  { id: "dog", emoji: "🐶", name: "강아지" },
  { id: "sparkles", emoji: "✨", name: "반짝이" },
  { id: "hearts", emoji: "💕", name: "하트" },
];

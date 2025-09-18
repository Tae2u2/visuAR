// 전역 변수
let faceMesh;
let camera;
let currentFilter = null;
let loadedImages = new Map();
let isReady = false;

// 필터 설정
const filterConfigs = {
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

const filterButtons = [
  { id: "rabbit", emoji: "🐰", name: "토끼" },
  { id: "cat", emoji: "🐱", name: "고양이" },
  { id: "dog", emoji: "🐶", name: "강아지" },
  { id: "sparkles", emoji: "✨", name: "반짝이" },
  { id: "hearts", emoji: "💕", name: "하트" },
];

// 이미지 미리 로드
async function preloadImages() {
  const promises = Object.values(filterConfigs)
    .filter((config) => config.image)
    .map((config) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedImages.set(config.image, img);
          resolve();
        };
        img.onerror = () => reject(`이미지 로드 실패: ${config.image}`);
        img.src = config.image;
      });
    });

  await Promise.all(promises);
}

// 필터 버튼 생성
function createFilterButtons() {
  const controls = document.getElementById("controls");

  filterButtons.forEach((filter) => {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.textContent = `${filter.emoji} ${filter.name}`;
    button.onclick = () => changeFilter(filter.id, button);
    button.dataset.filter = filter.id;
    controls.appendChild(button);
  });
}

// 필터 변경
function changeFilter(filterId, buttonElement) {
  currentFilter = filterId;

  // 버튼 활성화 상태 업데이트
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  buttonElement.classList.add("active");
}

// 필터 제거
function clearFilter() {
  currentFilter = null;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
}
function onResults(results) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 640;
  canvas.height = 480;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 얼굴이 감지되고 현재 필터가 설정되어 있으면
  if (
    results.multiFaceLandmarks &&
    results.multiFaceLandmarks.length > 0 &&
    currentFilter
  ) {
    const landmarks = results.multiFaceLandmarks[0];

    // 랜드마크 품질 확인 (선택적)
    if (landmarks && landmarks.length >= 468) {
      // 전체 랜드마크 개수 확인
      applyFilter(ctx, landmarks);
    } else {
      console.warn("불완전한 랜드마크 데이터");
    }
  }
}

// 정수리 위치 계산 및 필터 적용 (에러 핸들링 추가)
function applyFilter(ctx, landmarks) {
  const config = filterConfigs[currentFilter];
  if (!config) return;

  try {
    if (config.type === "particles") {
      drawParticles(ctx, landmarks, config);
    } else {
      drawImage(ctx, landmarks, config);
    }
  } catch (error) {
    console.error("필터 적용 오류:", error);
    // 오류 발생 시 기본 점만 표시
    drawDebugPoint(ctx, landmarks);
  }
}

// 디버그용 점 표시
function drawDebugPoint(ctx, landmarks) {
  if (landmarks[10]) {
    const x = landmarks[10].x * ctx.canvas.width;
    const y = landmarks[10].y * ctx.canvas.height;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// 이미지 필터 그리기
function drawImage(ctx, landmarks, config) {
  if (!config.image) return;

  const img = loadedImages.get(config.image);
  if (!img) return;

  config.landmarks.forEach((landmarkIndex) => {
    const point = landmarks[landmarkIndex]; // 이마 중앙점

    // 얼굴 크기 기반 정수리 위치 계산
    const faceWidth = Math.abs(landmarks[234].x - landmarks[454].x); // 얼굴 너비
    const crownOffset = faceWidth * ctx.canvas.width * 0.5; // 얼굴 너비 기반 오프셋

    const x = point.x * ctx.canvas.width;
    const y = point.y * ctx.canvas.height;

    const imgWidth = img.width * config.scale;
    const imgHeight = img.height * config.scale;

    const drawX = x - imgWidth / 2;
    const drawY = y + config.offsetY - crownOffset; // 얼굴 크기에 맞춰 조정

    ctx.drawImage(img, drawX, drawY, imgWidth, imgHeight);
  });
}

// 파티클 효과 그리기
function drawParticles(ctx, landmarks, config) {
  const time = Date.now() * 0.005; // 애니메이션 속도

  config.landmarks.forEach((pointIndex, i) => {
    const point = landmarks[pointIndex];
    const x = point.x * ctx.canvas.width;
    const y = point.y * ctx.canvas.height;

    if (config.color === "rainbow") {
      // 반짝이 효과
      const hue = (time * 50 + i * 45) % 360;
      const size = 4 + Math.sin(time * 3 + i) * 2;
      const opacity = 0.7 + Math.sin(time * 2 + i) * 0.3;

      ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${opacity})`;
      ctx.shadowColor = `hsl(${hue}, 80%, 60%)`;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();

      // 십자 모양 반짝임
      ctx.strokeStyle = `hsla(${hue}, 80%, 80%, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - size * 2, y);
      ctx.lineTo(x + size * 2, y);
      ctx.moveTo(x, y - size * 2);
      ctx.lineTo(x, y + size * 2);
      ctx.stroke();
    } else if (config.color === "pink") {
      // 하트 효과
      const floatY = y + Math.sin(time * 2 + i) * 5;
      const size = 8 + Math.sin(time * 1.5 + i) * 3;
      const opacity = 0.6 + Math.sin(time * 1.8 + i) * 0.4;

      ctx.fillStyle = `hsla(330, 80%, 60%, ${opacity})`;
      ctx.shadowColor = "rgba(255, 105, 180, 0.5)";
      ctx.shadowBlur = 8;

      // 하트 모양 그리기
      drawHeart(ctx, x, floatY, size);
    }

    ctx.shadowBlur = 0; // 그림자 리셋
  });
}

// 하트 모양 그리기 함수
function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;

  ctx.moveTo(x, y + size * 0.3);
  // 왼쪽 커브
  ctx.bezierCurveTo(
    x,
    y,
    x - size * 0.5,
    y,
    x - size * 0.5,
    y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x - size * 0.5,
    y + size * 0.7,
    x,
    y + size * 0.7,
    x,
    y + size
  );
  // 오른쪽 커브
  ctx.bezierCurveTo(
    x,
    y + size * 0.7,
    x + size * 0.5,
    y + size * 0.7,
    x + size * 0.5,
    y + topCurveHeight
  );
  ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);

  ctx.fill();
}

// 앱 초기화
async function init() {
  try {
    // 1. 이미지 미리 로드
    await preloadImages();

    // 2. 필터 버튼 생성
    createFilterButtons();

    // 3. MediaPipe 초기화
    faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.3,
      selfieMode: true, // 셀카 모드 활성화
    });

    faceMesh.onResults(onResults);

    // 4. 카메라 시작
    const video = document.getElementById("video");
    camera = new Camera(video, {
      onFrame: async () => {
        if (isReady) {
          await faceMesh.send({ image: video });
        }
      },
      width: 640,
      height: 480,
    });

    await camera.start();

    // 5. UI 업데이트
    document.getElementById("loading").style.display = "none";
    document.querySelector(".video-container").style.display = "block";
    document.getElementById("controls").style.display = "flex";
    document.getElementById("clear-controls").style.display = "flex";

    isReady = true;
  } catch (error) {
    console.error("초기화 실패:", error);
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent = `오류: ${error.message}`;
  }
}

// 페이지 로드 후 시작
window.onload = init;

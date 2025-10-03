// 모듈 임포트
import { filterConfigs, filterButtons } from "./js/config/filterConfig.js";
import { ImageLoader } from "./js/utils/imageLoader.js";
import { FilterManager } from "./js/core/FilterManager.js";
import { FaceDetector } from "./js/core/FaceDetector.js";
import { FilterRenderer } from "./js/renderers/FilterRenderer.js";
import { UIController } from "./js/ui/UIController.js";

// 앱 클래스
class FaceFilterApp {
  constructor() {
    // 인스턴스 생성
    this.imageLoader = new ImageLoader();
    this.filterManager = new FilterManager();
    this.filterRenderer = new FilterRenderer(this.imageLoader);
    this.uiController = new UIController(filterButtons);
    this.faceDetector = new FaceDetector(this.onResults.bind(this));

    // DOM 요소
    this.canvas = null;
    this.video = null;
    this.ctx = null;
  }

  /**
   * MediaPipe 얼굴 감지 결과 콜백
   * @param {Object} results - 얼굴 감지 결과
   */
  onResults(results) {
    if (!this.ctx || !this.canvas) return;

    this.canvas.width = 640;
    this.canvas.height = 480;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 얼굴이 감지되고 현재 필터가 설정되어 있으면
    if (
      results.multiFaceLandmarks &&
      results.multiFaceLandmarks.length > 0 &&
      this.filterManager.hasActiveFilter()
    ) {
      const landmarks = results.multiFaceLandmarks[0];

      // 랜드마크 품질 확인
      if (landmarks && landmarks.length >= 468) {
        const currentFilter = this.filterManager.getCurrentFilter();
        const config = filterConfigs[currentFilter];
        this.filterRenderer.applyFilter(this.ctx, landmarks, config);
      } else {
        console.warn("불완전한 랜드마크 데이터");
      }
    }
  }

  /**
   * 필터 변경 핸들러
   * @param {string} filterId - 필터 ID
   * @param {HTMLElement} buttonElement - 클릭된 버튼 요소
   */
  changeFilter(filterId, buttonElement) {
    this.filterManager.setFilter(filterId);
    this.uiController.updateButtonState(buttonElement);
  }

  /**
   * 필터 제거 핸들러
   */
  clearFilter() {
    this.filterManager.clearFilter();
    this.uiController.clearButtonState();
  }

  /**
   * 앱 초기화
   */
  async init() {
    try {
      // 1. 로딩 표시
      this.uiController.showLoading();

      // 2. 이미지 미리 로드
      await this.imageLoader.preloadImages(filterConfigs);

      // 3. 필터 버튼 생성
      this.uiController.createFilterButtons(this.changeFilter.bind(this));

      // 4. MediaPipe 초기화
      await this.faceDetector.initializeFaceMesh();

      // 5. DOM 요소 가져오기
      this.canvas = document.getElementById("canvas");
      this.video = document.getElementById("video");
      this.ctx = this.canvas.getContext("2d");

      // 6. 카메라 시작
      await this.faceDetector.startCamera(this.video, 640, 480);

      // 7. UI 업데이트
      this.uiController.hideLoading();
      this.uiController.showVideoControls();
    } catch (error) {
      console.error("초기화 실패:", error);
      this.uiController.hideLoading();
      this.uiController.showError(error.message);
    }
  }
}

// 전역 앱 인스턴스
let app = null;

// 전역 함수 (HTML onclick에서 호출)
window.clearFilter = () => {
  if (app) {
    app.clearFilter();
  }
};

// 페이지 로드 후 시작
window.onload = async () => {
  app = new FaceFilterApp();
  await app.init();
};

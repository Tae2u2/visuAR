import { ImageRenderer } from "./ImageRenderer.js";
import { ParticleRenderer } from "./ParticleRenderer.js";

// 필터 렌더링 통합 클래스
export class FilterRenderer {
  constructor(imageLoader) {
    this.imageRenderer = new ImageRenderer(imageLoader);
    this.particleRenderer = new ParticleRenderer(imageLoader);
  }

  /**
   * 필터 적용
   * @param {CanvasRenderingContext2D} ctx - 캔버스 컨텍스트
   * @param {Array} landmarks - 얼굴 랜드마크
   * @param {Object} config - 필터 설정
   */
  applyFilter(ctx, landmarks, config) {
    if (!config) return;

    try {
      if (config.type === "particles") {
        this.particleRenderer.render(ctx, landmarks, config);
      } else {
        this.imageRenderer.render(ctx, landmarks, config);
      }
    } catch (error) {
      console.error("필터 적용 오류:", error);
      // 오류 발생 시 기본 점만 표시
      this.imageRenderer.drawDebugPoint(ctx, landmarks);
    }
  }
}

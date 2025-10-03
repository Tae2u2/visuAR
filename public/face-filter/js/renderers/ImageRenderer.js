import { BaseRenderer } from "./BaseRenderer.js";

// 이미지 기반 필터 렌더러
export class ImageRenderer extends BaseRenderer {
  /**
   * 이미지 필터 렌더링
   * @param {CanvasRenderingContext2D} ctx - 캔버스 컨텍스트
   * @param {Array} landmarks - 얼굴 랜드마크
   * @param {Object} config - 필터 설정
   */
  render(ctx, landmarks, config) {
    if (!config.image) return;

    const img = this.imageLoader.getImage(config.image);
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
}

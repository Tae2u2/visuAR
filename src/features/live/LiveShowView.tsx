"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const EAR_IMAGES: Record<string, string> = {
  rabbit: "/ears_rabbit.png",
  cat: "/ears_cat.png",
  dog: "/ears_dog.png",
};

export default function AnimalEarsLiveWithSelector() {
  const [earType, setEarType] = useState<keyof typeof EAR_IMAGES>("rabbit");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const earImgRef = useRef<HTMLImageElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // 모델 및 이미지 로드
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();

    const earImg = new Image();
    earImg.src = EAR_IMAGES[earType];
    earImg.onload = () => (earImgRef.current = earImg);
  }, [earType]);

  // 비디오 + 캔버스 루프
  useEffect(() => {
    if (!modelsLoaded) return;
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let animationFrameId: number;

    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      video.srcObject = stream;
      await video.play();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const render = async () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks(true);

        detections.forEach((d) => {
          const landmarks = d.landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const eyeCenterX = (leftEye[0].x + rightEye[3].x) / 2;
          const eyeCenterY = (leftEye[0].y + rightEye[3].y) / 2;

          const jaw = landmarks.getJawOutline();
          const faceWidth = Math.abs(jaw[jaw.length - 1].x - jaw[0].x);

          const earWidth = faceWidth * 0.6;
          const earHeight = earWidth * 1.2;
          const earCenterX = eyeCenterX;
          const earCenterY = eyeCenterY - faceWidth * 0.55;
          const earLeftX = earCenterX - earWidth / 2 - (earWidth * 0.35) / 2;
          const earRightX = earCenterX - earWidth / 2 + (earWidth * 0.35) / 2;

          if (earImgRef.current) {
            ctx.save();
            ctx.translate(earLeftX + earWidth / 2, earCenterY);
            ctx.scale(-1, 1);
            ctx.drawImage(
              earImgRef.current,
              -earWidth / 2,
              -earHeight / 2,
              earWidth,
              earHeight
            );
            ctx.restore();

            ctx.drawImage(
              earImgRef.current,
              earRightX,
              earCenterY - earHeight / 2,
              earWidth,
              earHeight
            );
          }
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    startVideo();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video && video.srcObject) {
        (video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, [modelsLoaded, earType]);

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-semibold">Animal Ears Live Demo</h2>
      <div className="relative w-full max-w-3xl bg-black">
        <video ref={videoRef} style={{ display: "none" }} />
        <canvas ref={canvasRef} className="w-full" />
      </div>

      <div className="flex gap-2 mt-2">
        <span>Select Ear: </span>
        {Object.keys(EAR_IMAGES).map((type) => (
          <button
            key={type}
            onClick={() => setEarType(type)}
            className={`px-2 py-1 rounded ${
              earType === type ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="text-sm mt-2">
        Models loaded: {modelsLoaded ? "✅" : "Loading..."}
      </div>
      <div className="text-xs text-gray-500">
        Place /models & images in public/
      </div>
    </div>
  );
}

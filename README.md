# VisuAR 🎭

**카메라 필터와 그 사용량 분석 서비스**

> 실시간 얼굴 인식 기반 카메라 필터를 적용하고, 사용량 데이터를 수집하여
> 대시보드와 3D 시각화를 통해 분석하는 웹 애플리케이션입니다.

---

## 📂 프로젝트 구조

```bash
ar-visualization-app/
├── app/                        # Next.js App Router
│   ├── page.tsx                # 홈 (카메라 + 필터)
│   ├── studio/page.tsx         # 필터 선택 & 체험
│   ├── dashboard/page.tsx      # 데이터 시각화 (통계/3D)
│   └── api/                    # 서버 API
│       ├── usage/route.ts      # 필터 사용 기록 저장
│       └── stats/route.ts      # 통계 데이터 제공
│
├── components/
│   ├── BunnyFilter/            # AR 필터 관련
│   └── charts/                 # 데이터 시각화 컴포넌트
│
├── lib/                        # DB/분석 유틸
├── public/                     # 모델 파일 & 이미지 리소스
└── styles/                     # 글로벌 스타일


---

### 🚀 주요 기능


1. 🎥 실시간 얼굴 인식: 카메라로 얼굴을 추적하고 AR 필터 적용
2. 🐰 다양한 필터: 토끼 귀, 안경, 콧수염 등 오버레이 가능
3. 📊 사용량 수집 & 분석: 필터별 사용 횟수, 시간대별 패턴 기록
4. 🌐 대시보드 시각화: Recharts로 차트, Three.js로 3D 시각화 제공
5. 🔒 확장성 있는 구조: Next.js 기반 API & DB 연동 가능

---

### 🛠️ 기술 스택

- Frontend

Next.js 14 (App Router) <br />
React 18 <br />
TailwindCSS + shadcn/ui (UI 컴포넌트) <br />
Framer Motion (애니메이션) <br />

<br />

- AR / Visualization

face-api.js (얼굴 인식) <br />
Three.js (3D 데이터 시각화) <br />
Recharts (차트) <br />

- Backend

Next.js API Routes <br />
Prisma + [SQLite/PostgreSQL] (데이터 저장) <br />

<br /><br />

---

### ⚡ 설치 및 실행

- (준비중)


---

### 📊 데이터 시각화 예시

- (구상중)

<br />
<br />



---

### 📝 커밋 컨벤션

- feat: 새로운 기능 추가
- fix: 버그 수정
- refactor: 코드 리팩터링 (기능 변화 없음)
- style: 스타일 수정 (CSS, UI)
- docs: 문서 작성/수정 (README 등)
- chore: 설정, 빌드, 라이브러리 업데이트
```

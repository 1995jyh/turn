# 📝 Turnline (턴 + 온라인) 멀티 콘텐츠 커뮤니티 기획서 (AI Development Blueprint)

## 1. 프로젝트 개요 (Project Overview)
본 프로젝트는 유저들이 끄투, 넌센스 퀴즈, 캐치마인드 등 다양한 실시간 웹 게임을 즐기고 소통할 수 있는 종합 커뮤니티 플랫폼 'Turnline' 이다. **특히 향후 새로운 미니게임이 지속적으로 추가될 수 있도록 모듈화되고 확장 가능한 아키텍처**를 지향한다.

## 2. 기술 스택 (Tech Stack)
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Drawing API:** HTML5 Canvas API (캐치마인드 드로잉 구현용)
* **Backend & DB:** Supabase (PostgreSQL, Auth, Edge Functions)
* **Real-time:** Supabase Realtime (WebSockets - 채팅 및 드로잉 좌표 동기화)
* **Deployment:** Vercel

## 3. 핵심 기능 명세 (Core Features)

### A. 유저 및 소셜 시스템 (User & Social)
* **프로필 및 꾸미기:** 닉네임, 아바타 이미지 설정 및 게임 보상(포인트/재화)을 활용한 프로필 테마, 칭호 꾸미기 기능.
* **친구 시스템:** 유저 간 친구 맺기, 친구 목록 조회, 현재 접속 상태(온라인/오프라인) 확인.
* **친구 초대:** 고유 초대 링크를 생성하여 외부에서 친구를 특정 게임방으로 바로 초대하는 기능.

### B. 커뮤니티 및 상호작용 (Community)
* **게시판 기능:** 자유게시판, 정보 공유 등 카테고리별 게시글 작성 (텍스트 및 이미지 첨부).
* **댓글 시스템:** 게시글 및 유저 출제 퀴즈에 대한 댓글 및 대댓글 기능, 좋아요/싫어요 반응.

### C. 확장형 미니게임 모드 (Mini-Games)
*(새로운 게임을 추가하기 쉬운 플러그인 형태의 라우팅 및 상태 관리 구조 적용)*
* **[미니게임 1] 끄투 (끝말잇기):** 실시간 턴 동기화, 단어 사전 검증 로직, 제한 시간 및 특수 룰(두음법칙 등) 적용.
* **[미니게임 2] 넌센스 퀴즈:** 시스템 공식 퀴즈 진행 및 유저가 직접 출제하는 퀴즈(UGC) 등록, 정답 판정 로직.
* **[미니게임 3] 캐치마인드 (그림 퀴즈):** 출제자가 Canvas에 그리는 마우스/터치 궤적(Stroke 데이터)을 실시간으로 방 안의 유저들에게 브로드캐스팅. 정답을 맞힌 유저와 출제자에게 포인트 지급.

## 4. 데이터베이스 구조 스케치 (Database Schema Draft)
* **`users`**: id, nickname, avatar_url, profile_theme, level, total_points
* **`friends`**: user_id, friend_id, status (pending/accepted)
* **`posts` & `comments`**: 커뮤니티 글과 댓글 데이터 및 계층 구조 관리
* **`quizzes`**: 넌센스 퀴즈 데이터 (공식 및 유저 출제 데이터 분리)
* **`items` & `inventory`**: 프로필 꾸미기용 아이템 정보 및 유저 보유 현황

## 5. 단계별 개발 로드맵 (Development Phases)
* **Phase 1: 인프라, 인증 및 소셜 기초** (Supabase DB/Auth 세팅, 프로필, 친구, 커뮤니티 게시판/댓글 CRUD 구현)
* **Phase 2: 공통 게임 룸 시스템** (대기방 생성, 유저 입장/퇴장, 실시간 채팅, 친구 초대 링크 로직 구현)
* **Phase 3: 게임 모듈 1 (끄투 & 넌센스)** (단어 검증 로직 및 턴제 퀴즈 시스템 연동)
* **Phase 4: 게임 모듈 2 (캐치마인드)** (Canvas API 기반 실시간 드로잉 데이터 최적화 전송 및 렌더링)
* **Phase 5: 경제 및 꾸미기 시스템** (포인트 획득 및 프로필 꾸미기 상점 기능, 최종 QA)
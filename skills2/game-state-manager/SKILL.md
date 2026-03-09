---
name: game-state-manager
description: 미니게임(끄투, 퀴즈 등)의 비즈니스 로직, 상태 머신(State Machine), 타이머 동기화 관리 규칙
---

# [Role]
너는 게임 로직의 무결성(Integrity)을 수호하는 게임 백엔드 아키텍트다.

# [Core Rules]
1. 단일 진실 공급원 (Single Source of Truth): 게임의 현재 상태(대기 중, 진행 중, 결과 화면)와 현재 누구의 턴인지는 절대 개별 클라이언트가 판단하게 두지 마라. 방장(Host) 클라이언트나 서버(Supabase DB/Edge Function)의 상태를 기준으로만 동기화해라.
2. 보안 검증 (Anti-Cheat): 유저가 입력한 끄투 단어나 퀴즈 정답은 클라이언트 단에서만 검사하고 넘기지 마라. 반드시 최종 점수나 정답 판정은 조작할 수 없는 로직에서 크로스체크해라.
3. 타이머 동기화 (Server Timestamp): 게임의 '남은 시간'을 클라이언트의 `setInterval`로만 계산하면 기기 성능에 따라 오차가 생긴다. 게임 시작 시 서버의 타임스탬프를 기준으로 종료 시간을 설정하고, 각 기기에서 그 시간까지의 차이를 계산해서 보여줘라.
4. 모듈화 (Pluggable Games): 새로운 미니게임이 추가될 것을 대비해, 게임 로직은 UI 컴포넌트 내부에 하드코딩하지 말고 순수 함수(Pure Functions)나 커스텀 훅(Custom Hook)으로 완전히 분리해라.
'use client'; // 배경색을 동적으로 바꾸기 위해 클라이언트 컴포넌트로 변경

import React from 'react';
import { usePathname } from 'next/navigation';
import LobbyHeader from '@/components/lobby/LobbyHeader';
import LobbyRightPanel from '@/components/lobby/LobbyRightPanel';

/**
 * 💡 로비 공통 레이아웃 (Lobby Layout)
 * 이 폴더(`/app/lobby`) 아래에 있는 모든 페이지는 이 레이아웃의 영향을 받습니다.
 * 코드 중복을 최소화하고 화면의 공통 구조(헤더, 우측 패널, 배경)를 관리합니다.
 */
export default function LobbyLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // 현재 접속한 로비 주소에 따라 동적인 배경색 반환
    const getLobbyBackgroundColor = () => {
        if (pathname.includes('/kkutu')) return 'bg-[#E9F5E3]';       // 끝말잇기: 메인 기본 배경 (연녹색)
        if (pathname.includes('/initial')) return 'bg-[#E3F2FD]';     // 초성퀴즈: 연한 파란색
        if (pathname.includes('/nonsense')) return 'bg-[#FFE4E6]';    // 넌센스: 연한 빨간/분홍색
        if (pathname.includes('/catchmind')) return 'bg-[#FEF3C7]';   // 그림맞추기: 연한 노란색

        return 'bg-[#E9F5E3]'; // 기본 메인 로비 배경
    };

    return (
        // 라우팅에 따라 달라지는 동적 배경색 적용
        <div className={`min-h-screen ${getLobbyBackgroundColor()} flex flex-col font-sans overflow-hidden relative transition-colors duration-700`}>

            {/* 🎲 체크보드 형태의 배경 장식 (Kkutu 느낌) */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"
                style={{
                    backgroundImage: `
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000),
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)
          `,
                    backgroundSize: '100px 100px',
                    backgroundPosition: '0 0, 50px 50px'
                }}
            />

            {/* 1. 상단 공통 헤더 */}
            <LobbyHeader />

            {/* 2. 하단 메인 영역 (중앙 컨텐츠 + 우측 패널) */}
            <div className="flex-1 flex overflow-hidden relative z-10 h-[calc(100vh-74px)]">

                {/* 🌟 중앙 동적 영역 (페이지별 컨텐츠 삽입 지점) */}
                <main className="flex-1 flex flex-col relative overflow-y-auto w-full">
                    {children}
                </main>

                {/* 우측 광고 & 커뮤니티 사이드바 */}
                <LobbyRightPanel />

            </div>
        </div>
    );
}

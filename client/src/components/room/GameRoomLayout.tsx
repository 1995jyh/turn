'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LobbyHeader from '@/components/lobby/LobbyHeader';

interface GameRoomLayoutProps {
    children: React.ReactNode;
    gameName: string;
    roomId: string;
    roomTitle: string;
}

export default function GameRoomLayout({ children, gameName, roomId, roomTitle }: GameRoomLayoutProps) {
    const pathname = usePathname();

    // 로비와 유사하게 방 배경색도 게임 테마에 맞춤
    const getRoomBackgroundColor = () => {
        if (pathname.includes('/kkutu')) return 'bg-[#E9F5E3]';       // 연녹색
        if (pathname.includes('/initial')) return 'bg-[#E3F2FD]';     // 연한 파란색
        if (pathname.includes('/nonsense')) return 'bg-[#FFE4E6]';    // 연한 빨간색
        if (pathname.includes('/catchmind')) return 'bg-[#FEF3C7]';   // 연한 노란색
        return 'bg-[#F3F4F6]'; // 기본 회색
    };

    return (
        <div className={`min-h-screen ${getRoomBackgroundColor()} flex flex-col font-sans overflow-hidden relative transition-colors duration-700`}>

            {/* 배경 패턴 (로비와 동일) */}
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

            <LobbyHeader />

            <main className="flex-1 flex flex-col items-center justify-start pt-6 pb-6 px-4 md:px-8 relative z-10 h-[calc(100vh-74px)] overflow-hidden">
                <div className="w-full max-w-6xl h-full flex flex-col bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-white/50 shadow-xl overflow-hidden animate-in zoom-in-95 duration-300">

                    {/* 방 상단 정보 바 */}
                    <div className="flex items-center justify-between px-6 py-3 bg-white/80 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-gray-800 text-white text-sm font-bold rounded-lg tracking-wider">
                                NO.{roomId}
                            </span>
                            <span className="px-2.5 py-1 text-xs font-bold bg-[#E9F5E3] text-green-800 rounded-md border border-green-200/50 shadow-sm">
                                {gameName}
                            </span>
                            <h2 className="text-xl font-black text-gray-800 ml-2 truncate max-w-md">
                                {roomTitle}
                            </h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
                                <span className="text-gray-500 text-sm">👥</span>
                                <span className="font-bold text-gray-700 text-sm">1 / 8</span>
                            </div>
                            <Link
                                href={`/lobby/${pathname.split('/')[2] || ''}`}
                                className="px-5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                            >
                                나가기
                            </Link>
                        </div>
                    </div>

                    {/* 게임 메인 컨텐츠 영역 (하위 컴포넌트 렌더링) */}
                    <div className="flex-1 flex overflow-hidden">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

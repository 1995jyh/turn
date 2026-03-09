'use client'; // URL 경로를 읽어와야 하므로 클라이언트 컴포넌트로 분리

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RoomListPanel from './RoomListPanel';

/**
 * 💡 공통 로비 내용 컴포넌트 (Base Lobby Content)
 * 메인 로비(/lobby) 및 각 게임별 로비(/lobby/kkutu 등)에서 공통으로 사용되는
 * 1. 게임 선택 4개 메뉴 버튼
 * 2. 중앙 캐릭터 및 유저 정보
 * 3. 하단 '빠른 시작' 버튼
 * 영역을 렌더링합니다.
 * 
 * usePathname 훅을 사용하여 현재 어느 메뉴에 있는지 감지하여 버튼 하이라이트를 적용합니다.
 */
export default function BaseLobbyContent() {
    const pathname = usePathname();
    const [showRoomList, setShowRoomList] = useState(false);

    return (
        <div className="flex-1 flex flex-col items-center justify-start pt-12 h-full w-full relative overflow-y-auto pb-32">

            {/* 1. 상단 4개 메인 게임 메뉴 (빠른 시작 형태의 컴포넌트) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl px-8 mb-8 animate-in fade-in slide-in-from-top-8 duration-500 z-10">

                <Link href="/lobby/kkutu" className={`block relative group transition-all ${pathname === '/lobby/kkutu' ? 'scale-105' : 'hover:scale-[1.03] active:scale-[0.97]'}`}>
                    <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-300 to-green-300 rounded-3xl blur transition duration-500 ${pathname === '/lobby/kkutu' ? 'opacity-80' : 'opacity-20 group-hover:opacity-60'}`}></div>
                    <div className={`relative w-full py-4 bg-gradient-to-b from-[#E8F8E3] to-[#C9F0BB] rounded-2xl border-4 ${pathname === '/lobby/kkutu' ? 'border-green-400' : 'border-white'} shadow-[0_6px_15px_rgba(34,197,94,0.15)] text-center overflow-hidden flex flex-col items-center justify-center h-32`}>
                        <span className="text-4xl mb-2 drop-shadow-sm">💬</span>
                        <span className="text-xl md:text-2xl font-black text-green-900 tracking-tight" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7)" }}>
                            끝말잇기
                        </span>
                    </div>
                </Link>

                <Link href="/lobby/initial" className={`block relative group transition-all ${pathname === '/lobby/initial' ? 'scale-105' : 'hover:scale-[1.03] active:scale-[0.97]'}`}>
                    <div className={`absolute -inset-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-3xl blur transition duration-500 ${pathname === '/lobby/initial' ? 'opacity-80' : 'opacity-20 group-hover:opacity-60'}`}></div>
                    <div className={`relative w-full py-4 bg-gradient-to-b from-[#E3F2FD] to-[#BBDEFB] rounded-2xl border-4 ${pathname === '/lobby/initial' ? 'border-blue-400' : 'border-white'} shadow-[0_6px_15px_rgba(59,130,246,0.15)] text-center overflow-hidden flex flex-col items-center justify-center h-32`}>
                        <span className="text-4xl mb-2 drop-shadow-sm">🔠</span>
                        <span className="text-xl md:text-2xl font-black text-blue-900 tracking-tight" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7)" }}>
                            초성퀴즈
                        </span>
                    </div>
                </Link>

                <Link href="/lobby/nonsense" className={`block relative group transition-all ${pathname === '/lobby/nonsense' ? 'scale-105' : 'hover:scale-[1.03] active:scale-[0.97]'}`}>
                    <div className={`absolute -inset-1 bg-gradient-to-r from-rose-300 to-red-300 rounded-3xl blur transition duration-500 ${pathname === '/lobby/nonsense' ? 'opacity-80' : 'opacity-20 group-hover:opacity-60'}`}></div>
                    <div className={`relative w-full py-4 bg-gradient-to-b from-[#FFE4E6] to-[#FECDD3] rounded-2xl border-4 ${pathname === '/lobby/nonsense' ? 'border-rose-400' : 'border-white'} shadow-[0_6px_15px_rgba(244,63,94,0.15)] text-center overflow-hidden flex flex-col items-center justify-center h-32`}>
                        <span className="text-4xl mb-2 drop-shadow-sm">💡</span>
                        <span className="text-xl md:text-2xl font-black text-rose-900 tracking-tight" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7)" }}>
                            넌센스
                        </span>
                    </div>
                </Link>

                <Link href="/lobby/catchmind" className={`block relative group transition-all ${pathname === '/lobby/catchmind' ? 'scale-105' : 'hover:scale-[1.03] active:scale-[0.97]'}`}>
                    <div className={`absolute -inset-1 bg-gradient-to-r from-amber-300 to-orange-300 rounded-3xl blur transition duration-500 ${pathname === '/lobby/catchmind' ? 'opacity-80' : 'opacity-20 group-hover:opacity-60'}`}></div>
                    <div className={`relative w-full py-4 bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] rounded-2xl border-4 ${pathname === '/lobby/catchmind' ? 'border-amber-400' : 'border-white'} shadow-[0_6px_15px_rgba(245,158,11,0.15)] text-center overflow-hidden flex flex-col items-center justify-center h-32`}>
                        <span className="text-4xl mb-2 drop-shadow-sm">🎨</span>
                        <span className="text-xl md:text-2xl font-black text-amber-900 tracking-tight" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.7)" }}>
                            그림맞추기
                        </span>
                    </div>
                </Link>

            </div>

            {/* 2. 중앙 컨텐츠 영역 (캐릭터 or 방 목록) */}
            <div className={`flex flex-col items-center w-full transition-all duration-500 mt-2 mb-10 px-4`}>
                {showRoomList ? (
                    <RoomListPanel />
                ) : (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        {/* 캐릭터 렌더링 (현재는 CSS로 간단한 노란색 젤리 모양 임시 구현) */}
                        <div className="relative w-40 h-44 mb-6 drop-shadow-xl hover:scale-105 transition-transform cursor-pointer">
                            {/* 몸통 */}
                            <div className="absolute inset-x-0 bottom-2 top-0 bg-[#FCD34D] rounded-t-full rounded-b-[40%] border-4 border-[#B45309] overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_-15px_0_rgba(217,119,6,0.2)]">
                                {/* 눈 */}
                                <div className="flex gap-6 mb-2 mt-4">
                                    <div className="w-3 h-5 bg-[#451A03] rounded-full"></div>
                                    <div className="w-3 h-5 bg-[#451A03] rounded-full"></div>
                                </div>
                                {/* 입 */}
                                <div className="w-6 h-3 border-b-4 border-[#451A03] rounded-b-full"></div>
                            </div>

                            {/* 발 */}
                            <div className="absolute -bottom-1 left-6 w-5 h-4 bg-[#D97706] rounded-full border-2 border-[#B45309]"></div>
                            <div className="absolute -bottom-1 right-6 w-5 h-4 bg-[#D97706] rounded-full border-2 border-[#B45309]"></div>

                            {/* 팔 */}
                            <div className="absolute top-1/2 -left-2 w-4 h-6 bg-[#FCD34D] rounded-l-full border-y-4 border-l-4 border-[#B45309]"></div>
                            <div className="absolute top-1/2 -right-2 w-4 h-6 bg-[#FCD34D] rounded-r-full border-y-4 border-r-4 border-[#B45309]"></div>

                            {/* 캐릭터 아래 둥근 그림자 */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/10 rounded-full blur-[2px] -z-10"></div>
                        </div>

                        {/* 닉네임 */}
                        <h2 className="text-2xl font-black text-gray-800 tracking-wide drop-shadow-sm">
                            손님3326
                        </h2>

                        {/* 레벨 및 경험치 바 */}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-bold text-gray-600 bg-white/40 px-2 py-0.5 rounded-md border border-gray-200">LV.1</span>
                            <div className="w-40 h-4 bg-green-100 rounded-full border border-green-200 overflow-hidden relative shadow-inner">
                                <div className="absolute top-0 left-0 h-full bg-green-400 w-[15%]" />
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-green-900 z-10 w-full">15 / 100</span>
                            </div>
                        </div>

                        {/* 재화 정보 영역 */}
                        <div className="flex items-center gap-4 mt-3 bg-white/50 px-5 py-1.5 rounded-2xl border border-white shadow-sm backdrop-blur-sm">
                            <div className="flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer" title="보석">
                                <span className="text-xl drop-shadow-sm text-center">💎</span>
                                <span className="font-bold text-gray-700">0</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300" />
                            <div className="flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer" title="코인">
                                <span className="text-xl drop-shadow-sm text-center">🪙</span>
                                <span className="font-bold text-gray-700">0</span>
                            </div>
                        </div>

                        {/* 계정 변경 버튼 */}
                        <button className="mt-4 px-4 py-1.5 text-xs font-bold text-gray-500 bg-white/50 border border-gray-300 rounded-full hover:bg-white hover:text-gray-800 transition-colors shadow-sm">
                            계정 변경
                        </button>
                    </div>
                )}
            </div>

            {/* 3. 하단 액션 버튼 영역 (4개 기능 버튼) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 flex flex-col gap-4">

                {/* 4개의 부가 기능 카드 배열 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button className="flex flex-col items-center justify-center bg-white/80 backdrop-blur border-2 border-white rounded-xl py-3 shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all">
                        <span className="text-2xl mb-1 drop-shadow-sm">🎲</span>
                        <span className="text-sm font-bold text-gray-700">랜덤 매칭</span>
                    </button>

                    <button className="flex flex-col items-center justify-center bg-white/80 backdrop-blur border-2 border-white rounded-xl py-3 shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all">
                        <span className="text-2xl mb-1 drop-shadow-sm">➕</span>
                        <span className="text-sm font-bold text-gray-700">방 생성</span>
                    </button>

                    <button className="flex flex-col items-center justify-center bg-white/80 backdrop-blur border-2 border-white rounded-xl py-3 shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all">
                        <span className="text-2xl mb-1 drop-shadow-sm">🔑</span>
                        <span className="text-sm font-bold text-gray-700">커스텀 입장</span>
                    </button>

                    <button
                        onClick={() => setShowRoomList(!showRoomList)}
                        className={`flex flex-col items-center justify-center backdrop-blur border-2 rounded-xl py-3 shadow-sm hover:-translate-y-1 transition-all ${showRoomList ? 'bg-green-100 text-green-800 border-green-400 shadow-md transform -translate-y-1' : 'bg-white/80 text-gray-700 border-white hover:bg-white hover:shadow-md'}`}>
                        <span className="text-2xl mb-1 drop-shadow-sm">📋</span>
                        <span className="text-sm font-bold">방 목록</span>
                    </button>
                </div>

            </div>

        </div>
    );
}

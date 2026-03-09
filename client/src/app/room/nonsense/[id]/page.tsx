'use client';

import React, { useState, useEffect } from 'react';
import GameRoomLayout from '@/components/room/GameRoomLayout';

export default function NonsenseRoomPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const roomId = resolvedParams.id || '128354';

    /**
     * [UI 설계 및 반응형 구현 전략]
     * 1. Left-Right Avatar Layout: 10명의 유저를 5:5로 나누어 좌우 공간을 효율적으로 사용.
     * 2. No-Scroll UX: 'flex-1'과 'overflow-hidden'을 순차적으로 중첩하여, 
     *    브라우저 전체 스크롤이 아닌 내부 컨텐츠 영역(게임보드, 아바타 리스트)만 스크롤되도록 제어함.
     * 3. Fixed Bottom Chat: 하단 채팅 바에 'shrink-0'을 부여하여 어떤 해상도에서도 짤리지 않고 바닥에 고정됨.
     */

    // 더미 플레이어 상태 (10석)
    const [players, setPlayers] = useState(
        Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            isEmpty: i > 2, // 3명만 차있다고 가정
            isHost: i === 0,
            nickname: i === 0 ? '손님3326' : i === 1 ? '지나가는개' : i === 2 ? '센스쟁이' : '',
            chatMessage: '',
            chatTimer: null as any
        }))
    );

    const [chatInput, setChatInput] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        // 본인(0번 플레이어)이 채팅을 쳤다고 가정
        setPlayers(prev => {
            const next = [...prev];
            // 이전 타이머 지우기
            if (next[0].chatTimer) clearTimeout(next[0].chatTimer);

            next[0].chatMessage = chatInput;
            next[0].chatTimer = setTimeout(() => {
                setPlayers(p => {
                    const np = [...p];
                    if (np[0].chatMessage === chatInput) {
                        np[0].chatMessage = '';
                    }
                    return np;
                });
            }, 3000); // 3초 뒤 말풍선 사라짐
            return next;
        });

        // 상대방(1번 플레이어) 더미 응답
        if (chatInput.includes('정답')) {
            setTimeout(() => {
                setPlayers(prev => {
                    const next = [...prev];
                    if (next[1].chatTimer) clearTimeout(next[1].chatTimer);
                    next[1].chatMessage = '아깝다 ㅠㅠ';
                    next[1].chatTimer = setTimeout(() => {
                        setPlayers(p => {
                            const np = [...p];
                            np[1].chatMessage = '';
                            return np;
                        });
                    }, 3000);
                    return next;
                });
            }, 1000);
        }

        setChatInput('');
    };

    // 좌우 아바타 렌더링용 내부 컴포넌트
    const PlayerAvatar = ({ player, side }: { player: any, side: 'left' | 'right' }) => (
        <div className="relative flex flex-col items-center shrink-0 w-full h-20 md:h-24 justify-center">
            {/* 말풍선 */}
            {player.chatMessage && (
                <div className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-full ml-4' : 'right-full mr-4'} whitespace-nowrap z-20 animate-in fade-in zoom-in duration-200`}>
                    <div className="bg-white border-2 border-gray-200 text-gray-800 text-sm font-bold px-4 py-2 rounded-2xl shadow-lg relative max-w-[150px] md:max-w-xs whitespace-normal break-words text-center leading-snug">
                        {player.chatMessage}
                        {/* 말풍선 꼬리 */}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-b-2 border-gray-200 rotate-45 ${side === 'left' ? '-left-1.5 border-l-2' : '-right-1.5 border-r-2'}`}></div>
                    </div>
                </div>
            )}

            {/* 아바타 */}
            {player.isEmpty ? (
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100/50 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center opacity-70">
                    <span className="text-lg md:text-xl text-gray-300">🪑</span>
                </div>
            ) : (
                <div className="relative">
                    {player.isHost && (
                        <span className="absolute -top-3 -left-3 md:text-xl drop-shadow-md z-10 animate-bounce">👑</span>
                    )}
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center overflow-hidden shadow-md transition-transform hover:-translate-y-1
                        ${player.isHost ? 'bg-[#FCD34D] border-[#B45309]' : 'bg-blue-200 border-blue-500'}
                    `}>
                        <span className="text-xl md:text-2xl">{player.isHost ? '👀' : '🐶'}</span>
                    </div>
                </div>
            )}

            {/* 닉네임 */}
            <div className="mt-1.5 w-20 md:w-24 font-bold text-[10px] md:text-xs text-center text-gray-700 truncate bg-white/60 rounded px-1.5 py-0.5">
                {player.isEmpty ? '빈 자리' : player.nickname}
            </div>

            {/* 자리 번호 (디버깅/식별용 임시 표기) */}
            <div className="absolute -bottom-1 text-[9px] font-black text-rose-300/60 transition-opacity opacity-0 hover:opacity-100">
                P{player.id + 1}
            </div>
        </div>
    );

    return (
        <GameRoomLayout gameName="넌센스" roomId={roomId} roomTitle="웃기면 다 패스">
            {/* 메인 레이아웃 컨테이너: h-full 상태에서 flex-col로 하단 입력창과 영역 분리 */}
            <div className="flex-1 flex flex-col bg-[#F8F9FA]/50 relative overflow-hidden">

                {/* 상/중단 영역: 10인 아바타 사이드바와 중앙 게임판의 3열 구성 */}
                <div className="flex-1 flex flex-row w-full overflow-hidden">

                    {/* 좌측 아바타 5명: 짝수 인덱스 배치. 넘치면 개별 스크롤됨(no-scrollbar 적용) */}
                    <div className="w-24 md:w-36 flex flex-col justify-around items-center py-2 bg-white/40 border-r border-rose-100 z-10 shrink-0 shadow-[4px_0_15px_rgba(0,0,0,0.01)] overflow-y-auto no-scrollbar">
                        {players.filter((_, i) => i % 2 === 0).map(player => (
                            <PlayerAvatar key={player.id} player={player} side="left" />
                        ))}
                    </div>

                    {/* 중앙 게임 메인 영역: 반응형 너비를 위해 flex-1 할당 */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto no-scrollbar">
                        <div className="bg-white/80 backdrop-blur-md px-6 py-8 md:px-12 md:py-12 rounded-3xl shadow-xl border-2 border-rose-100 flex flex-col items-center transform transition-transform hover:scale-105 duration-300 w-full max-w-xl text-center">
                            <span className="px-5 py-2 bg-rose-500 text-white text-sm font-black rounded-full mb-8 shadow-md animate-pulse">
                                Q. 현재 문제
                            </span>
                            <span className="text-3xl md:text-5xl font-black text-rose-900 drop-shadow-sm leading-tight break-keep">
                                세상에서 가장 가난한 왕은?
                            </span>
                            <div className="mt-10 text-rose-400 font-bold text-xl animate-bounce">
                                남은 시간: <span className="text-rose-600 text-2xl">15</span>초
                            </div>
                        </div>
                    </div>

                    {/* 우측 아바타 5명: 홀수 인덱스 배치 */}
                    <div className="w-24 md:w-36 flex flex-col justify-around items-center py-2 bg-white/40 border-l border-rose-100 z-10 shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.01)] overflow-y-auto no-scrollbar">
                        {players.filter((_, i) => i % 2 !== 0).map(player => (
                            <PlayerAvatar key={player.id} player={player} side="right" />
                        ))}
                    </div>
                </div>

                {/* 하단 채팅 입력창: 'shrink-0'을 통해 상단 flex 컨텐츠에 밀려나지 않고 항상 보여짐 */}
                <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-30 shrink-0">
                    <form onSubmit={handleSendMessage} className="flex gap-3 mx-auto w-full">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="정답이나 채팅을 입력하세요..."
                            className="flex-1 bg-gray-100 border-2 border-transparent focus:border-rose-400 focus:bg-white focus:outline-none rounded-2xl px-5 py-3 font-medium transition-colors text-gray-800 shadow-inner"
                        />
                        <button
                            type="submit"
                            className="w-24 md:w-32 bg-rose-500 hover:bg-rose-600 text-white font-black text-lg rounded-2xl shadow-[0_4px_0_0_#E11D48] active:translate-y-1 active:shadow-none transition-all flex-shrink-0 cursor-pointer"
                        >
                            입력
                        </button>
                    </form>
                </div>
            </div>
        </GameRoomLayout>
    );
}

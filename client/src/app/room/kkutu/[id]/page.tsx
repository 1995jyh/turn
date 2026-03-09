'use client';

import React, { useState } from 'react';
import GameRoomLayout from '@/components/room/GameRoomLayout';

export default function KkutuRoomPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const roomId = resolvedParams.id || '925001';

    // 더미 플레이어 상태 (10석)
    const [players, setPlayers] = useState(
        Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            isEmpty: i > 2, // 3명만 차있다고 가정
            isHost: i === 0,
            nickname: i === 0 ? '손님3326' : i === 1 ? '지나가는개' : i === 2 ? '단어마스터' : '',
            chatMessage: '',
            chatTimer: null as any
        }))
    );

    const [chatInput, setChatInput] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        setPlayers(prev => {
            const next = [...prev];
            if (next[0].chatTimer) clearTimeout(next[0].chatTimer);
            next[0].chatMessage = chatInput;
            next[0].chatTimer = setTimeout(() => {
                setPlayers(p => {
                    const np = [...p];
                    if (np[0].chatMessage === chatInput) np[0].chatMessage = '';
                    return np;
                });
            }, 3000);
            return next;
        });

        // 상대방 리액션
        if (chatInput.includes('기름')) {
            setTimeout(() => {
                setPlayers(prev => {
                    const next = [...prev];
                    if (next[1].chatTimer) clearTimeout(next[1].chatTimer);
                    next[1].chatMessage = '름이 들어가는 단어가 뭐 있지?';
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

    const PlayerAvatar = ({ player, side }: { player: any, side: 'left' | 'right' }) => (
        <div className="relative flex flex-col items-center shrink-0 w-full h-20 md:h-24 justify-center">
            {player.chatMessage && (
                <div className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-full ml-4' : 'right-full mr-4'} whitespace-nowrap z-20 animate-in fade-in zoom-in duration-200`}>
                    <div className="bg-white border-2 border-green-200 text-gray-800 text-sm font-bold px-4 py-2 rounded-2xl shadow-lg relative max-w-[150px] md:max-w-xs whitespace-normal break-words text-center leading-snug">
                        {player.chatMessage}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-b-2 border-green-200 rotate-45 ${side === 'left' ? '-left-1.5 border-l-2' : '-right-1.5 border-r-2'}`}></div>
                    </div>
                </div>
            )}

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
                        ${player.isHost ? 'bg-[#FCD34D] border-[#B45309]' : 'bg-green-200 border-green-500'}
                    `}>
                        <span className="text-xl md:text-2xl">{player.isHost ? '👀' : '📚'}</span>
                    </div>
                </div>
            )}

            <div className="mt-1.5 w-20 md:w-24 font-bold text-[10px] md:text-xs text-center text-gray-700 truncate bg-white/60 rounded px-1.5 py-0.5">
                {player.isEmpty ? '빈 자리' : player.nickname}
            </div>

            <div className="absolute -bottom-1 text-[9px] font-black text-green-300/60 transition-opacity opacity-0 hover:opacity-100">
                P{player.id + 1}
            </div>
        </div>
    );

    return (
        <GameRoomLayout gameName="한국어 끝말잇기" roomId={roomId} roomTitle="끝말잇기 한판 하실분 컴컴">
            {/* 반응형 레이아웃 홀더: 상단 컨텐츠 영역이 하단 입력창을 가리지 않도록 제어 */}
            <div className="flex-1 flex flex-col bg-[#F8F9FA]/50 relative overflow-hidden">

                {/* 게임/채팅 메인 베드: 가로 폭 100%를 사용하여 좌우 아바타 목록과 중앙 게임판을 배치 */}
                <div className="flex-1 flex flex-row w-full overflow-hidden">

                    {/* 좌측 아바타 리스트: PC 기준 144px(w-36) 고정 너비를 할당하여 레이아웃 흔들림 방지 */}
                    <div className="w-24 md:w-36 flex flex-col justify-around items-center py-2 bg-white/40 border-r border-green-100 z-10 shrink-0 shadow-[4px_0_15px_rgba(0,0,0,0.01)] overflow-y-auto no-scrollbar">
                        {players.filter((_, i) => i % 2 === 0).map(player => (
                            <PlayerAvatar key={player.id} player={player} side="left" />
                        ))}
                    </div>

                    {/* 중앙 단어 표시판: flex-1로 유동적 너비를 가지며 글자 크기가 큰 단어도 중앙에 위치하게 함 */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto no-scrollbar">
                        <div className="bg-white/80 backdrop-blur-md px-6 py-8 md:px-12 md:py-12 rounded-3xl shadow-xl border-2 border-green-100 flex flex-col items-center transform transition-transform hover:scale-105 duration-300 w-full max-w-xl text-center">
                            <span className="px-5 py-2 bg-green-500 text-white text-sm font-black rounded-full mb-8 shadow-md hover:scale-110 transition-transform">
                                이전 단어
                            </span>
                            <span className="text-5xl md:text-7xl font-black text-green-900 drop-shadow-sm tracking-[0.2em] leading-tight break-keep">
                                자 전 거
                            </span>
                            <div className="mt-10 text-green-400 font-bold text-xl animate-bounce">
                                남은 시간: <span className="text-green-600 text-2xl">8</span>초
                            </div>
                        </div>
                    </div>

                    {/* 우측 아바타 리스트: 홀수 번째 유저들을 위한 대칭 영역 */}
                    <div className="w-24 md:w-36 flex flex-col justify-around items-center py-2 bg-white/40 border-l border-green-100 z-10 shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.01)] overflow-y-auto no-scrollbar">
                        {players.filter((_, i) => i % 2 !== 0).map(player => (
                            <PlayerAvatar key={player.id} player={player} side="right" />
                        ))}
                    </div>
                </div>

                {/* 하단 입력바: z-index를 높이고 shadow를 위쪽으로 주어 상단 컨텐츠와의 입체적 구분감을 줌 */}
                <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-30 shrink-0">
                    <form onSubmit={handleSendMessage} className="flex gap-3 mx-auto w-full">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="단어를 입력하세요!"
                            className="flex-1 bg-gray-100 border-2 border-transparent focus:border-green-400 focus:bg-white focus:outline-none rounded-2xl px-5 py-3 font-medium transition-colors text-gray-800 shadow-inner"
                        />
                        <button
                            type="submit"
                            className="w-24 md:w-32 bg-green-500 hover:bg-green-600 text-white font-black text-lg rounded-2xl shadow-[0_4px_0_0_#16A34A] active:translate-y-1 active:shadow-none transition-all flex-shrink-0 cursor-pointer"
                        >
                            입력
                        </button>
                    </form>
                </div>
            </div>
        </GameRoomLayout>
    );
}

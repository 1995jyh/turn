'use client';

import React, { useState } from 'react';
import GameRoomLayout from '@/components/room/GameRoomLayout';

/**
 * [그림맞추기 방 페이지]
 * - 캔버스 영역을 중심으로 좌우 5명씩 플레이어를 배치하는 레이아웃을 가집니다.
 * - 반응형 설계를 통해 하단 채팅창이 항상 보이도록 최적화되었습니다.
 */
export default function CatchmindRoomPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const roomId = resolvedParams.id || '871384';

    // 더미 플레이어 상태 (10석)
    const [players, setPlayers] = useState(
        Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            isEmpty: i > 2, // 3명만 차있다고 가정
            isHost: i === 0,
            nickname: i === 0 ? '손님3326' : i === 1 ? '지나가는개' : i === 2 ? '피카소' : '',
            chatMessage: '',
            chatTimer: null as any
        }))
    );

    const [chatInput, setChatInput] = useState('');

    /**
     * 채팅 메시지 전송 처리 함수
     * 1. 메시지를 상태에 저장하고 3초 뒤에 자동으로 초기화하는 타이머를 설정합니다. (말풍선 효과)
     * 2. 특정 키워드에 대한 더미 반응 로직을 포함하고 있습니다.
     */
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

        // 상대방 리액션 가이드 (더미 데이터 체험용)
        if (chatInput.includes('기둥')) {
            setTimeout(() => {
                setPlayers(prev => {
                    const next = [...prev];
                    if (next[1].chatTimer) clearTimeout(next[1].chatTimer);
                    next[1].chatMessage = '정답입니다!!';
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

    /**
     * 개별 플레이어 아바타 및 말풍선 렌더링 컴포넌트
     */
    const PlayerAvatar = ({ player, side }: { player: any, side: 'left' | 'right' }) => (
        <div className="relative flex flex-col items-center shrink-0 w-full h-20 md:h-24 justify-center">
            {/* 말풍선 UI: 사이드에 따라 꼬리 방향과 위치를 유연하게 조절 */}
            {player.chatMessage && (
                <div className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-full ml-4' : 'right-full mr-4'} whitespace-nowrap z-20 animate-in fade-in zoom-in duration-200`}>
                    <div className="bg-white border-2 border-amber-200 text-gray-800 text-sm font-bold px-4 py-2 rounded-2xl shadow-lg relative max-w-[150px] md:max-w-xs whitespace-normal break-words text-center leading-snug">
                        {player.chatMessage}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-b-2 border-amber-200 rotate-45 ${side === 'left' ? '-left-1.5 border-l-2' : '-right-1.5 border-r-2'}`}></div>
                    </div>
                </div>
            )}

            {/* 플레이어 본체 (빈 자리 vs 아바타) */}
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
                        ${player.isHost ? 'bg-[#FCD34D] border-[#B45309]' : 'bg-amber-200 border-amber-500'}
                    `}>
                        <span className="text-xl md:text-2xl">{player.isHost ? '👀' : '🎨'}</span>
                    </div>
                </div>
            )}

            <div className="mt-1.5 w-20 md:w-24 font-bold text-[10px] md:text-xs text-center text-gray-700 truncate bg-white/60 rounded px-1.5 py-0.5">
                {player.isEmpty ? '빈 자리' : player.nickname}
            </div>

            <div className="absolute -bottom-1 text-[9px] font-black text-amber-300/60 transition-opacity opacity-0 hover:opacity-100">
                P{player.id + 1}
            </div>
        </div>
    );

    return (
        <GameRoomLayout gameName="그림맞추기" roomId={roomId} roomTitle="피카소 모십니다">
            {/* 상/하 분할: flex-col을 통해 상단 게임부와 하단 채팅바를 구분 */}
            <div className="flex-1 flex flex-col bg-[#F8F9FA]/50 relative overflow-hidden">

                {/* 메인 게임 열: 3열(아바타-캔버스-아바타) 구성으로 화면 가로 폭을 최대로 활용 */}
                <div className="flex-1 flex flex-row w-full overflow-hidden">

                    {/* 좌측 패널 (5인): shrink-0으로 고정 너비를 유지하여 캔버스 공간 위협 방지 */}
                    <div className="w-24 md:w-36 flex flex-col justify-around items-center py-2 bg-white/40 border-r border-amber-100 z-10 shrink-0 shadow-[4px_0_15px_rgba(0,0,0,0.01)] overflow-y-auto no-scrollbar">
                        {players.filter((_, i) => i % 2 === 0).map(player => (
                            <PlayerAvatar key={player.id} player={player} side="left" />
                        ))}
                    </div>

                    {/* 중앙 캔버스 영역: 전체 화면 중앙에 배치되며, 절대 위치 컴포넌트들을 사용하여 UI 도구와 겹침 처리 */}
                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* 캔버스 텍스처 배경: mix-blend-multiply를 사용하여 종이 질감 구현 */}
                        <div className="absolute inset-0 bg-white/50 z-0 flex items-center justify-center shadow-inner">
                            <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-40 absolute inset-0 mix-blend-multiply pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col items-center opacity-40 animate-pulse">
                                <span className="text-6xl mb-4">🖌️</span>
                                <span className="text-2xl font-black text-amber-900/40 tracking-widest">캔버스 대기중</span>
                            </div>
                        </div>

                        {/* 게임 정보 레이어 (Z-index 10) */}
                        <div className="absolute top-6 self-center bg-amber-100/90 px-6 py-2 rounded-full text-sm font-bold text-amber-800 shadow-md backdrop-blur-sm z-10 border border-amber-200">
                            그림으로 설명해주세요!
                        </div>

                        <div className="absolute bottom-6 self-center z-10 animate-bounce">
                            <div className="text-amber-500 font-bold text-xl drop-shadow-sm bg-white/80 px-4 py-1 rounded-full border border-amber-100">
                                남은 시간: <span className="text-amber-600 text-2xl">45</span>초
                            </div>
                        </div>
                    </div>

                    {/* 우측 패널 (5인): 좌측과 동일한 로직 */}
                    <div className="w-24 md:w-36 flex flex-col justify-around items-center py-2 bg-white/40 border-l border-amber-100 z-10 shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.01)] overflow-y-auto no-scrollbar">
                        {players.filter((_, i) => i % 2 !== 0).map(player => (
                            <PlayerAvatar key={player.id} player={player} side="right" />
                        ))}
                    </div>
                </div>

                {/* 하단 채팅 바: 배경에 backdrop-blur를 주어 뒤쪽 캔버스가 비치는 고급스러운 효과 부여 */}
                <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-30 shrink-0">
                    <form onSubmit={handleSendMessage} className="flex gap-3 mx-auto w-full">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="정답이나 채팅을 입력하세요!"
                            className="flex-1 bg-gray-100 border-2 border-transparent focus:border-amber-400 focus:bg-white focus:outline-none rounded-2xl px-5 py-3 font-medium transition-colors text-gray-800 shadow-inner"
                        />
                        <button
                            type="submit"
                            className="w-24 md:w-32 bg-amber-500 hover:bg-amber-600 text-white font-black text-lg rounded-2xl shadow-[0_4px_0_0_#D97706] active:translate-y-1 active:shadow-none transition-all flex-shrink-0 cursor-pointer"
                        >
                            입력
                        </button>
                    </form>
                </div>
            </div>
        </GameRoomLayout>
    );
}

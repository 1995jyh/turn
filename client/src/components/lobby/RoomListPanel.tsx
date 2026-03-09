import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const dummyRooms = [
    { id: '925001', status: '진행 중', title: '손님4363 님의 방', type: '초성 퀴즈', mode: '쉬움', rounds: '6 라운드 / 20초', players: '2 / 2', isPrivate: true },
    { id: '353638', status: '진행 중', title: '세이 님의 방', type: '한국어 끝말잇기', mode: '', rounds: '무제한 / 150초', players: '3 / 5', isPrivate: false },
    { id: '724590', status: '진행 중', title: '손님4487 님의 방', type: '한국어 끝말잇기', mode: '', rounds: '10 라운드 / 150초', players: '2 / 3', isPrivate: true },
    { id: '951951', status: '진행 중', title: '손님3465 님의 방', type: '한국어 끝말잇기', mode: '', rounds: '2 라운드 / 90초', players: '2 / 8', isPrivate: false },
    { id: '480427', status: '대기 중', title: '상상 님의 방', type: '한국어 끝말잇기', mode: '매너', rounds: '3 라운드 / 150초', players: '2 / 8', isPrivate: false },
    { id: '249539', status: '대기 중', title: '훈민정음파워', type: '초성 퀴즈', mode: '', rounds: '5 라운드 / 60초', players: '1 / 3', isPrivate: false },
    { id: '128354', status: '대기 중', title: '과일수 님의 방', type: '한국어 끝말잇기', mode: '쉬움', rounds: '자음 3개 / 180초', players: '1 / 8', isPrivate: true },
    { id: '871384', status: '진행 중', title: '손님5520 님의 방', type: '한국어 끝말잇기', mode: '', rounds: '5 라운드 / 90초', players: '2 / 8', isPrivate: true },
    { id: '111222', status: '대기 중', title: '아재개그 환영', type: '넌센스', mode: '쉬움', rounds: '10 라운드 / 60초', players: '5 / 10', isPrivate: false },
    { id: '333444', status: '진행 중', title: '내가 그린 기린 그림', type: '그림맞추기', mode: '어려움', rounds: '3 라운드 / 120초', players: '8 / 8', isPrivate: false },
];

export default function RoomListPanel() {
    const pathname = usePathname();

    const getGameTypeFilter = () => {
        if (pathname.includes('/kkutu')) return '한국어 끝말잇기';
        if (pathname.includes('/initial')) return '초성 퀴즈';
        if (pathname.includes('/nonsense')) return '넌센스';
        if (pathname.includes('/catchmind')) return '그림맞추기';
        return null;
    };

    const filterType = getGameTypeFilter();
    const displayRooms = filterType
        ? dummyRooms.filter(r => r.type.includes(filterType) || filterType.includes(r.type))
        : dummyRooms;

    return (
        <div className="w-full max-w-5xl bg-[#F8F9FA]/95 backdrop-blur-md rounded-xl border border-white shadow-xl flex flex-col h-[550px] md:h-[650px] animate-in fade-in zoom-in-95 duration-300 mx-auto px-2 pb-2">
            {/* 상단 툴바 */}
            <div className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 border-b border-gray-200 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <span className="text-lg opacity-70">🔍</span>
                    <span>공개된 방이 <strong className="text-green-700">{displayRooms.length}</strong>곳 있어요.</span>
                </div>
                <div className="flex gap-2">
                    <button className="px-5 py-2.5 bg-[#E5E7EB] hover:bg-[#D1D5DB] text-gray-700 font-bold rounded-lg text-sm transition-colors shadow-sm">
                        방 번호 검색
                    </button>
                    <button className="px-5 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold rounded-lg text-sm transition-colors shadow-sm">
                        방 만들기
                    </button>
                </div>
            </div>

            {/* 방 목록 컨텐츠 */}
            <div className="flex-1 overflow-y-auto mt-2 pr-1 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {displayRooms.map((room, idx) => {
                        // 게임 타입에 따른 경로 매핑 파서
                        let basePath = 'kkutu';
                        if (room.type.includes('초성')) basePath = 'initial';
                        if (room.type.includes('넌센스')) basePath = 'nonsense';
                        if (room.type.includes('그림')) basePath = 'catchmind';

                        return (
                            <Link href={`/room/${basePath}/${room.id}`} key={idx} className="flex flex-col justify-between p-4 bg-white hover:bg-[#F3F4F6] rounded-xl border-2 border-transparent hover:border-green-200 cursor-pointer shadow-sm transition-all group gap-3">

                                {/* 왼쪽: 방 번호, 상태, 제목 */}
                                {/* 상단: 방 번호, 상태, 제목 */}
                                <div className="flex items-center gap-3 w-full">
                                    <span className="font-mono font-bold text-gray-400 text-lg w-14 group-hover:text-green-600 transition-colors">{room.id}</span>
                                    <span className={`px-2 py-0.5 text-[11px] font-black rounded-full whitespace-nowrap ${room.status === '진행 중' ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'}`}>
                                        {room.status}
                                    </span>
                                    <span className="font-bold text-gray-800 text-base truncate ml-1 group-hover:text-black transition-colors">{room.title}</span>
                                </div>

                                {/* 하단: 태그, 라운드, 인원, 잠금 */}
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="px-2 py-0.5 text-[11px] font-bold bg-[#E9F5E3] text-green-800 rounded-md border border-green-200/50 shadow-sm whitespace-nowrap">
                                            {room.type}
                                        </span>
                                        {room.mode && (
                                            <span className="px-2 py-0.5 text-[11px] font-bold bg-[#FEF3C7] text-amber-800 rounded-md border border-amber-200/50 shadow-sm whitespace-nowrap">
                                                {room.mode}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded text-center">{room.rounds}</span>
                                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded justify-center">
                                            <span className="text-gray-400 text-xs">👥</span>
                                            <span className="font-bold text-gray-700 text-xs">{room.players}</span>
                                        </div>
                                        <div className="w-5 flex justify-center">
                                            {room.isPrivate ?
                                                <span className="text-rose-400 text-sm drop-shadow-sm">🔒</span> :
                                                <span className="text-sky-400 text-sm drop-shadow-sm opacity-50">🔓</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {displayRooms.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                        <span className="text-4xl">🪹</span>
                        <p className="font-medium">공개된 방이 없습니다.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #CBD5E1;
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #94A3B8;
                }
            `}</style>
        </div>
    );
}

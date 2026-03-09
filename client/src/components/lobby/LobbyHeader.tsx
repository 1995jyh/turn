import Link from 'next/link';

/**
 * 💡 로비 상단 헤더 컴포넌트
 * 유저 프로필(캐릭터, 닉네임, 레벨), 재화(보석, 코인), 알림, 상점, 설정 버튼을 포함합니다.
 * 추후 전역 상태(Context/Zustand)나 API 연동을 통해 실제 데이터를 주입할 예정입니다.
 */
export default function LobbyHeader() {
    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-md border-b-2 border-green-900/10 shadow-sm relative z-20">
            {/* 1. 좌측: 메인 로고 영역 */}
            <div className="flex items-center gap-8">
                <Link href="/" className="text-2xl font-black text-green-700 drop-shadow-sm tracking-tight hover:text-green-800 transition-colors">
                    TURNLINE
                </Link>
            </div>

            {/* 2. 우측: 액션 아이콘 버튼 그룹 */}
            <div className="flex items-center gap-3">
                {/* 알림 버튼 */}
                <button className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center border border-orange-200 hover:bg-orange-200 transition-colors relative">
                    🔔
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        1
                    </span>
                </button>

                {/* 상점 버튼 */}
                <button className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center border border-purple-200 hover:bg-purple-200 transition-colors">
                    🏪
                </button>

                {/* 설정 버튼 */}
                <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center border border-gray-200 hover:bg-gray-200 transition-colors">
                    ⚙️
                </button>
            </div>
        </header >
    );
}

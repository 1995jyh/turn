import Link from 'next/link';

/**
 * 💡 우측 패널 컴포넌트 (광고 및 커뮤니티 영역)
 * 사용자가 요청한 300x900 사이즈 임시 광고 영역과 하단 커뮤니티/로그인 유도 패널을 배치합니다.
 */
export default function LobbyRightPanel() {
    return (
        <aside className="w-[300px] flex-shrink-0 flex flex-col bg-white/60 backdrop-blur-sm border-l-2 border-green-900/5 shadow-[-4px_0_15px_-5px_rgba(0,0,0,0.05)] z-10 h-[calc(100vh-74px)] hidden xl:flex">

            {/* 1. 상단 광고 배너 영역 (임시 크기: 300x250 등) */}
            <div className="p-4 border-b border-gray-200/50 flex-shrink-0">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-medium">
                    <span>광고</span>
                    <button className="hover:text-gray-800">ⓘ</button>
                </div>
                {/* 임시 광고 이미지 Placeholder */}
                <div className="w-full bg-blue-100 rounded-lg overflow-hidden border border-blue-200 relative aspect-[4/3] flex flex-col items-center justify-center text-blue-800 p-4 text-center">
                    <span className="text-3xl mb-2 hover:animate-bounce cursor-pointer">🎁</span>
                    <span className="font-bold text-sm">300x250 배너 영역</span>
                    <span className="text-xs opacity-70 mt-1">임시 플레이스홀더</span>
                </div>
            </div>

            {/* 2. 하단 커뮤니티 채팅 / 웹사이트 위젯 영역 */}
            <div className="flex-1 flex flex-col p-4 bg-gray-50/50">
                <div className="flex items-center justify-between font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                    <div className="flex items-center gap-2">
                        <span>💬 커뮤니티</span>
                    </div>
                    {/* 소셜 채널 링크 아이콘 */}
                    <div className="flex gap-2 text-sm">
                        <span className="text-green-500 cursor-pointer hover:scale-110 transition-transform">N</span>
                        <span className="text-indigo-500 cursor-pointer hover:scale-110 transition-transform">D</span>
                    </div>
                </div>

                {/* 비로그인 혹은 접근 제한 안내 박스 */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <p className="text-sm font-medium text-gray-500 mb-6 leading-relaxed">
                        로그인하고 더 많은<br />기능을 이용해 보세요.
                    </p>
                    <Link
                        href="/auth/login"
                        className="px-8 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-colors border border-gray-300 shadow-sm"
                    >
                        로그인
                    </Link>
                </div>

                <div className="text-right mt-auto opacity-40 text-[10px] font-mono">
                    v0.1.0-alpha
                </div>
            </div>

        </aside>
    );
}

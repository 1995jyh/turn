import Link from 'next/link';

// 재사용 가능한 나무 표지판 느낌의 버튼 컴포넌트
const WoodenButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={href} className="relative inline-block hover:scale-[1.02] active:scale-[0.98] transition-transform select-none">
      <div className="relative w-[280px] md:w-[320px] bg-[#E3B06A] rounded-2xl border-4 border-black p-2 pb-3 shadow-[0_8px_0_0_#916934] mt-6">

        {/* 양쪽 상단의 '귀' 모양 장식 */}
        <div className="absolute flex justify-between w-[240px] md:w-[280px] -top-6 left-1/2 -translate-x-1/2 z-[-1]">
          <div className="w-12 h-12 bg-[#E3B06A] border-4 border-black border-b-0 rounded-t-full flex items-center justify-center relative translate-y-3">
            <div className="w-3 h-3 bg-white rounded-full border-2 border-black" />
          </div>
          <div className="w-12 h-12 bg-[#E3B06A] border-4 border-black border-b-0 rounded-t-full flex items-center justify-center relative translate-y-3">
            <div className="w-3 h-3 bg-white rounded-full border-2 border-black" />
          </div>
        </div>

        {/* 안내판의 짙은 갈색 내부 속지 */}
        <div className="relative w-full py-6 md:py-8 bg-[#5C4930] rounded-xl flex items-center justify-center overflow-hidden shadow-[inset_0_5px_0_0_rgba(0,0,0,0.3)]">
          {/* 상단 나사 구멍 2개 */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 bg-black rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-black rounded-full opacity-60"></div>
          </div>

          <span
            className="text-2xl md:text-3xl font-black text-white tracking-widest"
            style={{ textShadow: "2px 4px 0px rgba(0,0,0,0.7)" }}
          >
            {children}
          </span>
        </div>
      </div>
    </Link>
  );
};

// 소셜 로그인 버튼 컴포넌트
const SocialLoginButton = ({ provider, label, color, textColor = "text-white" }: { provider: string; label: string; color: string; textColor?: string }) => (
  <button
    className={`w-14 h-14 rounded-full flex items-center justify-center border-[3px] border-black/10 shadow-[0_5px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none hover:brightness-110 transition-all ${color} ${textColor}`}
    aria-label={`${provider} 로그인`}
    title={`${provider} 계정으로 로그인`}
  >
    <span className="text-xl font-bold">{label}</span>
  </button>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#8EDCA2] flex flex-col items-center justify-center font-sans overflow-hidden">

      {/* 배경 장식 패턴 (옵션) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <main className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center text-center space-y-12">

        {/* 상단 썸네일/로고 영역 */}
        <div className="w-[300px] h-[180px] md:w-[400px] md:h-[220px] bg-white rounded-3xl border-[6px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex flex-col items-center justify-center p-4 rotate-[-2deg] hover:rotate-0 transition-transform bg-gradient-to-br from-indigo-100 to-white">
          <h1 className="text-4xl md:text-5xl font-black text-black tracking-tighter" style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}>
            Turnline
          </h1>
          <p className="mt-3 text-lg font-bold text-gray-600 bg-gray-100 px-4 py-1 rounded-full border-2 border-gray-300">
            턴 + 온라인
          </p>
        </div>

        {/* 로그인 영역 */}
        <div className="flex flex-col items-center space-y-4 bg-white/40 p-6 rounded-3xl border-[3px] border-white/50 backdrop-blur-sm shadow-xl">
          <p className="text-lg font-bold text-teal-800 tracking-wide drop-shadow-sm">간편하게 시작하기</p>
          <div className="flex gap-4">
            <SocialLoginButton provider="카카오" label="K" color="bg-[#FEE500]" textColor="text-black" />
            <SocialLoginButton provider="구글" label="G" color="bg-white" textColor="text-black" />
            <SocialLoginButton provider="네이버" label="N" color="bg-[#03C75A]" />
            <SocialLoginButton provider="디스코드" label="D" color="bg-[#5865F2]" />
          </div>
        </div>

        {/* 메인 액션 버튼 영역 */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-4">
          <WoodenButton href="/lobby">
            게임 로비 입장
          </WoodenButton>

          <WoodenButton href="/community">
            커뮤니티 입장
          </WoodenButton>
        </div>

      </main>
    </div>
  );
}

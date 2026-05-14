"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Calculator,
  Flame,
  DollarSign,
  Menu,
  ChevronLeft,
  FileSpreadsheet,
  TrendingUp,
  Briefcase,
  BookOpen,
  ChartColumnBig,
  Wallet,
  ChartCandlestick,
  Rss,
  PlaySquare,
  Building2,
  Landmark,
  Coins,
  Home,
  PiggyBank,
  Receipt,
  Factory,
} from "lucide-react";
import Image from "next/image";

import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-[60] rounded-lg border border-slate-700 bg-slate-900 p-2 text-white shadow-lg lg:hidden"
          aria-label="메뉴 열기"
        >
          <Menu size={20} />
        </button>
      )}

      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileSidebar}
          aria-label="메뉴 닫기"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex flex-col border-r border-slate-800 bg-slate-950 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className={`${collapsed ? "mx-auto" : ""} flex items-center gap-2 text-white`}
          >
            <Image
              src="/favicon-32x32.png"
              alt="BlueDino"
              width={28}
              height={28}
            />
            {!collapsed ? (
              <span className="text-xl font-bold tracking-wide">BlueDino</span>
            ) : null}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden text-slate-400 hover:text-white lg:block"
            aria-label="사이드바 접기"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </button>

          <button
            onClick={closeMobileSidebar}
            className="text-slate-400 hover:text-white lg:hidden"
            aria-label="모바일 메뉴 닫기"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          {/* 1) 계산기 — 대표 계산기 모음 */}
          <div onClick={closeMobileSidebar}>
            <SidebarGroup title="계산기" collapsed={collapsed} storageKey="calculators">
              <SidebarItem
                href="/cal/calculator"
                label="배당 계산기"
                icon={Calculator}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/compound"
                label="복리 계산기"
                icon={ChartColumnBig}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/fire"
                label="FIRE 계산기"
                icon={Flame}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/capital-gains"
                label="해외주식 양도세"
                icon={DollarSign}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/retirement-tax"
                label="퇴직소득세"
                icon={Briefcase}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/salary-net"
                label="연봉 실수령액"
                icon={Wallet}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/dsr"
                label="DSR 계산기"
                icon={Receipt}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/ltv"
                label="LTV 계산기"
                icon={Home}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/loan-interest"
                label="대출이자 계산기"
                icon={Coins}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/cal/mortgage"
                label="주담대 계산기"
                icon={Building2}
                collapsed={collapsed}
              />
            </SidebarGroup>
          </div>

          {/* 2) 절세·계좌 */}
          <div onClick={closeMobileSidebar}>
            <SidebarGroup title="절세 · 계좌" collapsed={collapsed} storageKey="taxAccount">
              <SidebarItem
                href="/finance"
                label="금융 가이드 메인"
                icon={Landmark}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/finance/isa"
                label="ISA"
                icon={PiggyBank}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/finance/irp"
                label="IRP"
                icon={PiggyBank}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/finance/pension"
                label="연금저축"
                icon={PiggyBank}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/finance/cma"
                label="CMA"
                icon={Wallet}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/finance/parking"
                label="파킹통장"
                icon={Wallet}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/info/investment/account-tax"
                label="계좌별 세금정보"
                icon={FileSpreadsheet}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/info/investment/account-tax-step"
                label="절세계좌 활용순서"
                icon={TrendingUp}
                collapsed={collapsed}
              />
            </SidebarGroup>
          </div>

          {/* 3) 대출·부동산 */}
          <div onClick={closeMobileSidebar}>
            <SidebarGroup title="대출 · 부동산" collapsed={collapsed} storageKey="loanRealty">
              <SidebarItem
                href="/finance/loan-basics"
                label="대출 기초"
                icon={Landmark}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/finance/credit-loan"
                label="신용대출"
                icon={Coins}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/finance/mortgage-loan"
                label="주담대"
                icon={Home}
                collapsed={collapsed}
              />
            </SidebarGroup>
          </div>

          {/* 4) 투자 기초·전략 */}
          <div onClick={closeMobileSidebar}>
            <SidebarGroup title="투자 기초 · 전략" collapsed={collapsed} storageKey="invest">
              <SidebarItem
                href="/info/guide"
                label="투자 기초 가이드"
                icon={BookOpen}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/info/strategy"
                label="투자 전략"
                icon={ChartCandlestick}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/industry"
                label="산업 · 테마 가이드"
                icon={Factory}
                collapsed={collapsed}
              />
            </SidebarGroup>
          </div>

          {/* 5) 기업분석 */}
          <div onClick={closeMobileSidebar}>
            <SidebarGroup title="기업분석" collapsed={collapsed} storageKey="company">
              <SidebarItem
                href="/company-analysis"
                label="기업분석 메인"
                icon={Building2}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/company-analysis/korea"
                label="국내기업"
                icon={Building2}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/company-analysis/global"
                label="해외기업"
                icon={Building2}
                collapsed={collapsed}
              />
            </SidebarGroup>
          </div>

          {/* 외부 자료 — 별도 그룹, 기본 접힘 */}
          <div onClick={closeMobileSidebar}>
            <SidebarGroup
              title="외부 자료"
              collapsed={collapsed}
              storageKey="external"
              defaultOpen={false}
            >
              <SidebarItem
                href="/info/blog"
                label="추천 금융 가이드"
                icon={Rss}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/info/videos"
                label="경제 유튜버 모아보기"
                icon={PlaySquare}
                collapsed={collapsed}
              />
            </SidebarGroup>
          </div>

          {/* 기타 — 사이트 정보, 기본 접힘 */}
          <div onClick={closeMobileSidebar}>
            <SidebarGroup title="기타" collapsed={collapsed} storageKey="etc" defaultOpen={false}>
              <SidebarItem
                href="/info/etc/about"
                label="소개"
                icon={LayoutDashboard}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/info/etc/editorial-policy"
                label="콘텐츠 운영 원칙"
                icon={BookOpen}
                collapsed={collapsed}
              />
              <SidebarItem
                href="/info/etc/methodology"
                label="작성 기준"
                icon={FileSpreadsheet}
                collapsed={collapsed}
              />
            </SidebarGroup>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-800 p-4 text-xs text-slate-400">
          {!collapsed ? (
            <div className="space-y-1">
              <div className="font-semibold text-slate-300">BlueDino Platform</div>
              <div>v1.0.0</div>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}

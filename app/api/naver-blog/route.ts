import { NextResponse } from "next/server";

export const revalidate = 1800;

type CategoryMatch = {
  parentCategory: string;
  childCategory: string;
};

type BlogPost = {
  title: string;
  link: string;
  description: string;
  thumbnail: string | null;
  parentCategory: string;
  childCategory: string;
  pubDate: string;
  isoDate: string;
};

const MAX_ITEMS = 60;

const BLOG_CATEGORY_RULES: Array<{
  parent: string;
  children: Array<{
    label: string;
    keywords: string[];
  }>;
}> = [
  {
    parent: "돈이 되는 정보",
    children: [
      {
        label: "기업분석",
        keywords: [
          "기업분석",
        ],
      },
      {
        label: "경제·투자",
        keywords: [
          "경제",
          "투자",
          "투자전략",
          "자산배분",
          "포트폴리오",
          "리밸런싱",
        ],
      },
      {
        label: "지원·정책",
        keywords: [
          "지원금",
          "지원정책",
          "정부지원",
          "정책자금",
          "청년지원",
          "복지",
          "보조금",
        ],
      },
      {
        label: "국내기업분석",
        keywords: [
          "국내기업분석",
          "국내 기업 분석",
          "코스피",
          "코스닥",
          "삼성전자",
          "한화",
          "두산",
          "현대",
          "lg",
          "sk",
        ],
      },
      {
        label: "해외기업분석",
        keywords: [
          "해외기업분석",
          "해외 기업 분석",
          "미국주식",
          "해외주식",
          "나스닥",
          "s&p",
          "sofi",
          "hood",
          "pltr",
          "tesla",
          "apple",
          "microsoft",
          "amazon",
          "nvidia",
        ],
      },
      {
        label: "ETF",
        keywords: [
          "etf",
          "월배당 etf",
          "고배당 etf",
          "지수추종",
          "인덱스펀드",
          "커버드콜",
        ],
      },
      {
        label: "가상화폐",
        keywords: [
          "가상화폐",
          "비트코인",
          "이더리움",
          "리플",
          "알트코인",
          "코인",
          "암호화폐",
        ],
      },
      {
        label: "공모주 청약 일정",
        keywords: [
          "공모주",
          "청약",
          "수요예측",
          "상장 일정",
          "ipo",
          "일반청약",
        ],
      },
    ],
  },
  {
    parent: "돈이 되는 지식",
    children: [
      {
        label: "주식기초",
        keywords: [
          "주식기초",
          "주식 기초",
          "per",
          "pbr",
          "eps",
          "roe",
          "시가총액",
          "거래량",
          "재무제표",
          "배당수익률",
        ],
      },
      {
        label: "경제기초",
        keywords: [
          "경제기초",
          "경제 기초",
          "금리",
          "인플레이션",
          "환율",
          "기준금리",
          "물가",
          "경기침체",
          "실업률",
          "gdp",
        ],
      },
      {
        label: "연말정산",
        keywords: [
          "연말정산",
          "소득공제",
          "세액공제",
          "환급",
          "신용카드 공제",
          "의료비 공제",
        ],
      },
      {
        label: "마인드셋",
        keywords: [
          "마인드셋",
          "습관",
          "생산성",
          "자기계발",
          "동기부여",
          "목표 설정",
          "루틴",
        ],
      },
      {
        label: "도서추천",
        keywords: [
          "도서추천",
          "책 추천",
          "경제 도서",
          "투자 책",
          "읽어볼 책",
          "북리뷰",
        ],
      },
    ],
  },
  {
    parent: "돈이 되는 계좌",
    children: [
      {
        label: "IMA계좌",
        keywords: [
          "ima",
          "ima계좌",
        ],
      },
      {
        label: "ISA계좌",
        keywords: [
          "isa",
          "중개형 isa",
          "신탁형 isa",
          "isa계좌",
        ],
      },
      {
        label: "CMA계좌",
        keywords: [
          "cma",
          "cma계좌",
        ],
      },
      {
        label: "IRP계좌",
        keywords: [
          "irp",
          "irp계좌",
          "퇴직연금",
          "개인형퇴직연금",
        ],
      },
      {
        label: "연금저축계좌",
        keywords: [
          "연금저축",
          "연금저축계좌",
          "연금계좌",
        ],
      },
    ],
  },
];

function decodeXml(input: string) {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function stripHtml(input: string) {
  return decodeXml(input)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTagValue(block: string, tagName: string) {
  const escaped = tagName.replace(":", "\\:");
  const match = block.match(new RegExp(`<${escaped}>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

function getAttrValue(block: string, tagName: string, attrName: string) {
  const escaped = tagName.replace(":", "\\:");
  const match = block.match(
    new RegExp(`<${escaped}[^>]*\\s${attrName}=["']([^"']+)["'][^>]*\\/?>`, "i")
  );
  return match?.[1]?.trim() ?? "";
}

function normalizeThumbnailUrl(input: string | null) {
  if (!input) return null;

  let value = decodeXml(input).trim();
  if (!value) return null;

  if (value.startsWith("//")) {
    value = `https:${value}`;
  }

  if (value.startsWith("/")) {
    return null;
  }

  value = value.replace(/ /g, "%20");

  if (!/^https?:\/\//i.test(value)) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.toString();
  } catch {
    return null;
  }
}

function extractFirstImage(block: string) {
  const candidates = [
    getAttrValue(block, "media:thumbnail", "url"),
    getAttrValue(block, "media:content", "url"),
    getAttrValue(block, "enclosure", "url"),
  ];

  const htmlSources = [
    ...Array.from(
      decodeXml(block).matchAll(
        /<img[^>]+(?:src|data-src|data-lazy-src|data-original)=["']([^"']+)["']/gi
      )
    ).map((match) => match[1]),
  ];

  const all = [...candidates, ...htmlSources];

  for (const candidate of all) {
    const normalized = normalizeThumbnailUrl(candidate ?? null);
    if (normalized) return normalized;
  }

  return null;
}

function guessHierarchicalCategory(title: string, description: string): CategoryMatch {
  const source = `${title} ${description}`.toLowerCase();

  for (const group of BLOG_CATEGORY_RULES) {
    for (const child of group.children) {
      const matched = child.keywords.some((keyword) =>
        source.includes(keyword.toLowerCase())
      );

      if (matched) {
        return {
          parentCategory: group.parent,
          childCategory: child.label,
        };
      }
    }
  }

  return {
    parentCategory: "기타",
    childCategory: "미분류",
  };
}

function formatDate(input: string) {
  const date = new Date(input);

  if (Number.isNaN(date.getTime())) {
    return input;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function parseRss(xml: string): BlogPost[] {
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return itemBlocks
    .map((block) => {
      const rawTitle = getTagValue(block, "title");
      const rawLink = getTagValue(block, "link");
      const rawDescription =
        getTagValue(block, "description") || getTagValue(block, "content:encoded");
      const rawPubDate = getTagValue(block, "pubDate");

      const title = stripHtml(rawTitle);
      const description = stripHtml(rawDescription).slice(0, 220);
      const thumbnail = extractFirstImage(block);
      const categoryInfo = guessHierarchicalCategory(title, description);
      const link = decodeXml(rawLink);

      const isoDate = (() => {
        const date = new Date(rawPubDate);
        return Number.isNaN(date.getTime()) ? "" : date.toISOString();
      })();

      return {
        title,
        link,
        description,
        thumbnail,
        parentCategory: categoryInfo.parentCategory,
        childCategory: categoryInfo.childCategory,
        pubDate: formatDate(rawPubDate),
        isoDate,
      };
    })
    .filter((item) => item.title && item.link)
    .sort((a, b) => {
      if (a.isoDate && b.isoDate) {
        return a.isoDate < b.isoDate ? 1 : -1;
      }
      return 0;
    });
}

export async function GET() {
  const rssUrl = process.env.NAVER_BLOG_RSS_URL;

  if (!rssUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "NAVER_BLOG_RSS_URL 환경변수가 없습니다. 예: https://rss.blog.naver.com/블로그아이디.xml",
        items: [],
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(rssUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "User-Agent": "BlueDinoBot/1.0 (+https://bluedino.example)",
      },
      next: { revalidate },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: `RSS를 불러오지 못했습니다. status=${response.status}`,
          items: [],
        },
        { status: response.status }
      );
    }

    const xml = await response.text();
    const parsed = parseRss(xml);
    const items = parsed.slice(0, MAX_ITEMS);

    const parentCategories = [
      "전체",
      ...Array.from(new Set(items.map((item) => item.parentCategory).filter(Boolean))),
    ];

    const childCategoriesByParent = Object.fromEntries(
      parentCategories
        .filter((parent) => parent !== "전체")
        .map((parent) => [
          parent,
          [
            "전체",
            ...Array.from(
              new Set(
                items
                  .filter((item) => item.parentCategory === parent)
                  .map((item) => item.childCategory)
                  .filter(Boolean)
              )
            ),
          ],
        ])
    );

    return NextResponse.json({
      ok: true,
      items,
      parentCategories,
      childCategoriesByParent,
      totalParsed: parsed.length,
      returnedCount: items.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "알 수 없는 오류";
    return NextResponse.json(
      {
        ok: false,
        message,
        items: [],
      },
      { status: 500 }
    );
  }
}
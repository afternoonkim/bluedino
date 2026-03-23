
// 사용자에게 보이는 콘텐츠만 구성된 컴포넌트
export default function GuideSeoArticle({ title, children }) {
  return (
    <article>
      <h1>{title}</h1>
      {children}
    </article>
  );
}

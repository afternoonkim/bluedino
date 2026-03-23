import type { ReactNode } from "react";

type GuideSeoArticleProps = {
  title: string;
  children: ReactNode;
};

export default function GuideSeoArticle({
  title,
  children,
}: GuideSeoArticleProps) {
  return (
    <article>
      <h1>{title}</h1>
      {children}
    </article>
  );
}
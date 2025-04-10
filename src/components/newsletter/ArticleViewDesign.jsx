import React from "react";

const ArticleViewDesign = ({
  image,
  title,
  author,
  readTime,
  datePublished,
  article,
  lineclamp,
}) => {
  return (
    <section>
      {image ? (
        <>
          <img
            className="mb-5 w-full h-full aspect-video object-cover rounded-lg"
            src={image}
            alt="Article Image"
          />
        </>
      ) : (
        <></>
      )}
      <p className={`font-avenir-black text-h6 line-clamp-2`}>{title}</p>
      <p className="text-small pb-3 pt-1">
        <span className={`text-primary`}>{author}</span>
        <span className={`text-gray-400`}>&nbsp; |</span>
        <span className={`text-gray-400`}>&nbsp;&nbsp;{readTime}</span>
        <span className={`text-gray-400`}>&nbsp; |</span>
        <span className={`text-gray-400`}>&nbsp;&nbsp;{datePublished}</span>
      </p>
      <div className={`${lineclamp} mobile-clamper text-body text-justify text-gray-500`}>
        <article>{article}</article>
      </div>
    </section>
  );
};

export default ArticleViewDesign;

import React, { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

function HorizontalCard({
  image,
  imageAlt = "card-image",
  title,
  subtitle,
  description,
  price,
  priceLabel,
  currency = "$",
  alternativeCurrency = "INR",
  alternativePrice,
  buttonText = "Book here",
  buttonLink = "#",
  maxDescriptionLength = 120,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = description && description.length > maxDescriptionLength;
  const displayDescription =
    shouldTruncate && !isExpanded ? `${description.slice(0, maxDescriptionLength)}...` : description;

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const isExternalLink =
    buttonLink.startsWith("http") || buttonLink.startsWith("mailto:");
  const isAnchorLink = buttonLink.startsWith("#");
  const isInternalRoute = !isAnchorLink && !isExternalLink && buttonLink.startsWith("/");

  const handleAnchorClick = (event) => {
    if (isAnchorLink) {
      event.preventDefault();
      const target = document.querySelector(buttonLink);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50 transition-all duration-300 ease-in-out md:flex-row dark:border-gray-800 dark:bg-gray-800 dark:shadow-none">
      <div className="h-48 w-full shrink-0 md:h-auto md:w-2/5">
        <div className="h-full w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <div className="flex min-h-[200px] flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold leading-tight text-gray-800 md:text-xl dark:text-white">{title}</h3>

          {subtitle && (
            <p className="mb-2 text-xs font-semibold text-gray-600 md:mb-3 md:text-sm dark:text-gray-300">{subtitle}</p>
          )}

          {description && (
            <div className="mb-3 md:mb-4">
              <p className="text-xs font-medium leading-relaxed text-gray-600 md:text-sm dark:text-gray-200">
                {displayDescription}
              </p>

              {shouldTruncate && (
                <button
                  onClick={toggleExpanded}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-800 md:text-sm"
                >
                  {isExpanded ? (
                    <>
                      Show less <ChevronUp className="h-3 w-3 md:h-4 md:w-4" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {(priceLabel || price) && (
            <div className="mb-3 flex flex-wrap items-center gap-2 text-base font-semibold text-gray-800 md:mb-4 md:text-lg dark:text-white">
              {priceLabel ? (
                <span>{priceLabel}</span>
              ) : (
                <>
                  <span>
                    {currency} {price}
                  </span>
                  {alternativePrice && (
                    <span className="ml-2">
                      or {alternativeCurrency} {alternativePrice}
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto">
          {buttonLink && (
            <>
              {isInternalRoute ? (
                <Link to={buttonLink} className="inline-block">
                  <button className="flex items-center gap-2 border-none bg-transparent p-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 md:text-base dark:text-teal-300 dark:hover:text-teal-200">
                    {buttonText}
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </Link>
              ) : (
                <a
                  href={buttonLink}
                  onClick={handleAnchorClick}
                  target={isExternalLink ? "_blank" : undefined}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                  className="inline-block"
                >
                  <button className="flex items-center gap-2 border-none bg-transparent p-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 md:text-base dark:text-teal-300 dark:hover:text-teal-200">
                    {buttonText}
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;

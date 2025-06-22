
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

function HorizontalCard({ 
  image, 
  imageAlt = "card-image",
  title, 
  subtitle, 
  description, 
  price, 
  currency = "$",
  alternativeCurrency = "INR",
  alternativePrice,
  buttonText = "Book here",
  buttonLink = "#",
  maxDescriptionLength = 120 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldTruncate = description && description.length > maxDescriptionLength;
  const displayDescription = shouldTruncate && !isExpanded 
    ? description.slice(0, maxDescriptionLength) + "..."
    : description;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row min-h-[280px] transition-all duration-300 ease-in-out">
      {/* Image Section */}
      <div className="w-full md:w-2/5 shrink-0 h-48 md:h-auto">
        <div className="h-full w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover object-center"
            style={{ minHeight: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 p-4 md:p-6 min-h-[200px]">
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="text-gray-600 mb-2 md:mb-3 font-semibold text-xs md:text-sm line-clamp-1">
              {subtitle}
            </p>
          )}
          
          {/* Description with truncation */}
          {description && (
            <div className="mb-3 md:mb-4">
              <p className="text-gray-600 font-medium text-xs md:text-sm leading-relaxed">
                {displayDescription}
              </p>
              
              {shouldTruncate && (
                <button
                  onClick={toggleExpanded}
                  className="flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Show less <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
          
          {/* Price */}
          {price && (
            <div className="mb-3 md:mb-4 flex">
              <span className="font-semibold text-base md:text-lg text-gray-800">
                {currency} {price}
              </span>
              {alternativePrice && (<span className="font-semibold text-base md:text-lg text-gray-800"> &nbsp;or {alternativeCurrency} {alternativePrice}</span>)}
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <div className="mt-auto">
          <a href={buttonLink} className="inline-block">
            <button className="flex items-center gap-2 p-2 font-medium text-blue-600 hover:text-blue-800 transition-colors bg-transparent border-none cursor-pointer text-sm md:text-base">
              {buttonText}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
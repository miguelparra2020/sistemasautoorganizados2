import React, { useState, useEffect } from 'react';

const PostsCarousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Debug: Log posts data
  useEffect(() => {
    console.log('Posts data:', posts);
    if (posts && posts.length > 0) {
      console.log('First post:', posts[0]);
      console.log('Image field:', posts[0].image);
    }
  }, [posts]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, posts.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? posts.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === posts.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Function to get image URL
  const getImageUrl = (post) => {
    // Use the processed image from Astro
    const imageUrl = post.processedImage || post.image || post.data?.image || post.frontmatter?.image;
    console.log('Getting image for post:', post.title, 'Processed Image URL:', imageUrl);
    return imageUrl;
  };

  if (!posts || posts.length === 0) {
    return <div className="text-center py-8">No hay posts disponibles</div>;
  }

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {posts.map((post, index) => {
          const imageUrl = getImageUrl(post);
          return (
            <div key={post.id || index} className="w-full h-full flex-shrink-0 relative">
              {/* Background Image */}
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={post.title || 'Post image'}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    console.error('Error loading image:', imageUrl);
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm opacity-75">Sin imagen</p>
                  </div>
                </div>
              )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-gray-200 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              {post.publishDate && (
                <p className="text-sm text-gray-300">
                  {new Date(post.publishDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
              {post.permalink && (
                <a
                  href={post.permalink}
                  className="inline-block mt-4 bg-[#5c603c]  hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Leer más
                </a>
              )}
            </div>
          </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Pagination */}
      {posts.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {posts.length > 1 && isAutoPlaying && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ 
              width: `${((currentIndex + 1) / posts.length) * 100}%` 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PostsCarousel;

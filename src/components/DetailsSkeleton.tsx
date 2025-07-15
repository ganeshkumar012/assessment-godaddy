// Enhanced skeleton loader
export default function DetailsSkeleton() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back button skeleton */}
          <div className="mb-8">
            <div className="h-10 bg-gray-200 rounded-full w-24 animate-pulse"></div>
          </div>
          
          {/* Main card skeleton */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-sm animate-pulse">
            <div className="h-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg w-2/3 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
            
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                </div>
              ))}
            </div>
            
            {/* Button skeleton */}
            <div className="h-14 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }
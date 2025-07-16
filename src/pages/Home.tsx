import { useEffect, useState } from "react";
import type { Repo } from "../types/repo";
import { fetchRepos } from "../api/github";
import { Link } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { Star, Eye, GitFork, Bug } from "lucide-react";

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRepos()
      .then(setRepos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <HomeSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <div className="text-gray-400 text-5xl mb-4">📁</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No repositories found
            </h2>
            <p className="text-gray-600">Check back later for updates.</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalWatchers = repos.reduce(
    (sum, repo) => sum + repo.watchers_count,
    0
  );
  const languages = [
    ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              GoDaddy
            </span>
            <br />
            <span className="text-gray-800 text-3xl sm:text-4xl lg:text-5xl">
              Open Source
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our collection of {repos.length} open source repositories
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {repos.length}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Repositories
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {totalStars.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Stars</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {totalForks.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Forks</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {languages.length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Languages</div>
          </div>
        </div>

        {/* Repository Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <Link
              key={repo.id}
              to={`/repo/${repo.name}`}
              className="group block h-full"
            >
              <div className="flex flex-col justify-between h-full bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50">
                {/* Header */}
                <div className="flex flex-col mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight break-words">
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span className="text-wrap break-words max-w-full">
                        {repo.name}
                      </span>
                      <span className="text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                        →
                      </span>
                    </div>
                  </h2>
                </div>

                {/* Description */}
                <div className="mb-4 flex-grow">
                  {repo.description ? (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]">
                      {repo.description.length > 120
                        ? `${repo.description.slice(0, 120)}...`
                        : repo.description}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm italic min-h-[3.75rem]">
                      No description available
                    </p>
                  )}
                </div>

                {/* Language */}
                {repo.language && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {repo.language}
                    </span>
                  </div>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-auto">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 w-5 h-5" />
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="text-blue-500 w-5 h-5" />
                    <span>{repo.watchers_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="text-green-500 w-5 h-5" />
                    <span>{repo.forks_count.toLocaleString()}</span>
                  </div>
                  {repo.open_issues_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Bug className="text-red-500 w-5 h-5" />
                      <span>{repo.open_issues_count}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Built with ❤️ by ganeshkumar for GoDaddy team
          </p>
        </div>
      </div>
    </div>
  );
}

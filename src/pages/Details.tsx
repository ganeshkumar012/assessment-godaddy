import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import type { Repo } from "../types/repo";
import { fetchRepos } from "../api/github";
import { Bug, Eye, GitFork, Star } from "lucide-react";
import DetailsSkeleton from "../components/DetailsSkeleton";


export default function Details() {
  const { name } = useParams();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRepos()
      .then(repos => {
        const found = repos.find(r => r.name === name);
        if (found) {
          setRepo(found);
        } else {
          setError('Repository not found');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <DetailsSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors shadow-sm mb-8"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          
          {/* Error state */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-sm text-center">
            <div className="text-red-500 text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
            <p className="text-lg text-gray-600 mb-8">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                Go Back Home
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors shadow-sm mb-8"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-sm text-center">
            <div className="text-gray-400 text-6xl mb-6">📁</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Repository Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The repository "{name}" could not be found.</p>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              Browse All Repositories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 shadow-sm mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span>Back to Home</span>
        </Link>

        {/* Main content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100/50">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                {repo.name}
              </span>
            </h1>
            
            {repo.description && (
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-4">
                {repo.description}
              </p>
            )}
            
            {/* Meta information */}
            {/* <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {repo.created_at && (
                <span>Created {formatDate(repo.created_at)}</span>
              )}
              {repo.updated_at && (
                <span>• Updated {formatDate(repo.updated_at)}</span>
              )}
              {repo.size && (
                <span>• {(repo.size / 1024).toFixed(1)} MB</span>
              )} */}
            </div>
          </div>

          {/* Language and topics */}
          {/* <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {repo.language && (
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                  {repo.language}
                </span>
              )}
              {repo.topics && repo.topics.length > 0 && (
                repo.topics.slice(0, 5).map((topic, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {topic}
                  </span>
                ))
              )}
            </div>
          </div> */}

            {/* Language and status badges */}
            <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {repo.language && (
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                  {repo.language}
                </span>
              )}
              {repo.archived && (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium border border-yellow-200">
                  📦 Archived
                </span>
              )}
              {repo.fork && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  🍴 Fork
                </span>
              )}
              {repo.has_issues && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  🐛 Issues Enabled
                </span>
              )}
              {repo.has_wiki && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  📚 Wiki
                </span>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center border border-yellow-200">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {repo.stargazers_count.toLocaleString()}
              </div>
              <div className="text-sm text-yellow-800 font-medium flex items-center justify-center gap-1">
                <Star/>
                <span>Stars</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {repo.forks_count.toLocaleString()}
              </div>
              <div className="text-sm text-green-800 font-medium flex items-center justify-center gap-1">
                <GitFork/>
                <span>Forks</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {repo.watchers_count.toLocaleString()}
              </div>
              <div className="text-sm text-blue-800 font-medium flex items-center justify-center gap-1">
                <Eye/>
                <span>Watchers</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 text-center border border-red-200">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {repo.open_issues_count.toLocaleString()}
              </div>
              <div className="text-sm text-red-800 font-medium flex items-center justify-center gap-1">
                <Bug/>
                <span>Issues</span>
              </div>
            </div>
          </div>

          {/* Additional info */}
          {/* {(repo.license || repo.default_branch) && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repo.license && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">License</h3>
                    <p className="text-gray-600">{repo.license.name}</p>
                  </div>
                )}
                {repo.default_branch && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Default Branch</h3>
                    <p className="text-gray-600 font-mono bg-gray-200 px-2 py-1 rounded text-sm inline-block">
                      {repo.default_branch}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )} */}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>View on GitHub</span>
              <span>→</span>
            </a>
            
            {/* {repo.clone_url && (
              <button
                onClick={() => navigator.clipboard.writeText(repo.clone_url)}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all duration-200 border border-gray-300 hover:border-gray-400"
              >
                <span>Copy Clone URL</span>
                <span>📋</span>
              </button>
            )} */}
          </div>
        </div>
      </div>
  );
}

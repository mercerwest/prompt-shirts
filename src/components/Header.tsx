export default function Header() {
  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Prompt Shirts</h1>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-300">AI-Generated Fashion</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="/gallery" className="text-gray-300 hover:text-white transition-colors">
              Gallery
            </a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
} 
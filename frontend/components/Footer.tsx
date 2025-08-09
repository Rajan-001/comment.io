import React from 'react';

type Props = {};

export const Footer = (props: Props) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-100 px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
            YouTube Comments Analyzer
          </h2>
          <p className="mt-4 text-sm text-slate-300">
            AI-powered analysis for YouTube comments.<br />
            Get instant sentiment reports, trends, and summaries.
          </p>
          <span className="inline-block mt-4 text-sm bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 py-1 rounded-full shadow-md">
            Chrome Extension Available
          </span>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-100">Quick Links</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition">Analysis History</a></li>
            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-100">Resources</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Developer</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} YouTube Comments Analyzer. All rights reserved.
      </div>
    </footer>
  );
};

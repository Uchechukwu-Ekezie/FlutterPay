import React from "react";
import { Link } from "react-router-dom";
import { FeatherIcon } from "./ui/FeatherIcon";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-teal-400 rounded-xl flex items-center justify-center shadow">
            <FeatherIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">FlutterPay</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs">
              Seamless crypto subscriptions for modern businesses.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex md:justify-center">
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/marketplace" className="text-muted-foreground hover:text-foreground">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/subscriptions" className="text-muted-foreground hover:text-foreground">
                My Subscriptions
              </Link>
            </li>
            <li>
              <Link to="/provider" className="text-muted-foreground hover:text-foreground">
                Provider Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex md:justify-end space-x-4">
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-muted-foreground hover:text-foreground"
          >
            <i className="fa-brands fa-twitter text-xl" />
          </a>
          <a
            href="https://github.com"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground"
          >
            <i className="fa-brands fa-github text-xl" />
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FlutterPay. All rights reserved.
      </div>
    </footer>
  );
};

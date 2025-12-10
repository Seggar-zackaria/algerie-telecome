import { Link } from "react-router-dom";
import { ServerCrash, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServerError() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-4 text-center">
      <div className="relative mb-8 flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute h-64 w-64 animate-pulse rounded-full bg-red-100 blur-3xl" />
        <div className="absolute h-48 w-48 animate-pulse rounded-full bg-orange-100 blur-2xl delay-75" />
        
        {/* Main Icon */}
        <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-xl">
          <ServerCrash className="h-16 w-16 text-red-600 animate-[bounce_3s_infinite]" />
        </div>
      </div>

      <div className="relative z-10 max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
            500
          </h1>
          <h2 className="text-2xl font-semibold text-slate-900">
            System Failure
          </h2>
          <p className="text-slate-600">
            Critical system error detected. The server encountered an unexpected condition.
            Please try to reconnect.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button 
            className="gap-2 bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-500/20 transition-all hover:scale-105"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Reload System
          </Button>
          
          <Button variant="outline" asChild className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all hover:scale-105">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
    </div>
  );
}

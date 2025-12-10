import { Link } from "react-router-dom";
import { Cpu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-4 text-center">
      <div className="relative mb-8 flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute h-64 w-64 animate-pulse rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute h-48 w-48 animate-pulse rounded-full bg-indigo-100 blur-2xl delay-75" />
        
        {/* Main Icon */}
        <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-xl">
          <Cpu className="h-16 w-16 text-blue-600 animate-[pulse_4s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="relative z-10 max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-slate-900">
            Page not found
          </h2>
          <p className="text-slate-600">
            The page you are looking for is out of range. 
            Re-establishing connection to the main network is recommended.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
            <Link to="/">
              <Home className="h-4 w-4" />
              Return directly to Homepage
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
    </div>
  );
}

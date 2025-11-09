import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/Button";

export const Landing: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Trustless Payments",
      description:
        "Smart contract escrow ensures secure, automated recurring payments without intermediaries",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Instant Settlement",
      description:
        "Lightning-fast on-chain payments processed directly without delays or middlemen",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "Global Access",
      description:
        "Accept subscribers worldwide without traditional payment barriers or restrictions",
      gradient: "from-cyan-500 to-teal-500",
    },
  ];

  const benefits = [
    "No chargebacks or payment disputes",
    "Lower fees than traditional processors",
    "Programmable payment logic",
    "Real-time earnings tracking",
    "Decentralized and censorship-resistant",
  ];

  const stats = [
    { label: "Active Subscriptions", value: "1,000+" },
    { label: "Total Volume", value: "$50K+" },
    { label: "Providers", value: "100+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 opacity-80"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Seamless Subscriptions,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-teal-400 animate-gradient">
                Powered by Crypto
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The future of recurring payments is here. Leverage the power of
              decentralized finance for your subscription-based business.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/provider/onboarding">
                <Button
                  size="lg"
                  className="group min-w-[220px] bg-gradient-to-r from-primary to-accent hover:from-blue-600 hover:to-green-600 shadow-lg hover:shadow-xl transition-all"
                >
                  Become a Provider
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[220px] border-2 hover:from-blue-600 hover:to-green-200 transition-all"
                >
                  Browse Marketplace
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 blur-xl"></div>
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                {stats.map((stat, index) => (
                  <div key={index} className="py-6 px-4 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why FlutterPay is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another payment processor. We're a decentralized
              platform that puts you in control of your revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50/80 rounded-2xl p-8 border border-gray-200/80"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Unlock Your Revenue Potential
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FlutterPay provides the tools and technology to build a modern,
              sustainable subscription business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-200/70 flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mt-1">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Trophy,
  TrendingUp,
  ArrowRight,
  Flag,
  Building2,
  Map,
  Earth,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-8 pb-20 md:pt-12 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 text-center">
              {" "}
              {/* Removed lg:text-left to keep content centered */}
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                >
                  🧠 New: Interactive Learning Experience
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Master General
                  <span className="text-emerald-600"> Knowledge</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-[600px] mx-auto">
                  {" "}
                  {/* Removed lg:mx-0 */}
                  Test your knowledge across multiple topics, track your
                  progress, and compete with others. PengetahuanAm makes
                  learning fun and engaging with personalized quizzes and
                  detailed performance analytics.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {" "}
                {/* Removed lg:justify-start */}
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View Topics
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-600 justify-center">
                {" "}
                {/* Removed lg:justify-start */}
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Track your progress</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=PengetahuanAm+Quiz+Interface"
                alt="PengetahuanAm Quiz Interface"
                width={800}
                height={600}
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Topics Section */}
      <section id="quiz" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800"
            >
              Quiz Topics
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Test Your Knowledge
            </h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
              Challenge yourself across diverse topics and expand your general
              knowledge. From science to history, we have quizzes that will test
              and improve your understanding.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-5xl">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Flag className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Kenegaraan dan Identiti Nasional Malaysia</CardTitle>
                <CardDescription>
                  Uji pengetahuan anda tentang sejarah, budaya, dan identiti
                  nasional Malaysia. Ketahui lebih lanjut tentang warisan dan
                  nilai-nilai negara.
                </CardDescription>
                <Link href="/quiz/kenegaraan-dan-identiti-nasional-malaysia">
                  <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700">
                    Mula Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>
                  Struktur Pentadbiran dan Pemerintahan Malaysia
                </CardTitle>
                <CardDescription>
                  Pelajari tentang sistem pentadbiran, struktur kerajaan, dan
                  proses pemerintahan di Malaysia.
                </CardDescription>
                <Link href="/quiz/struktur-pentadbiran-dan-pemerintahan-malaysia">
                  <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700">
                    Mula Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Map className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Geografi Malaysia</CardTitle>
                <CardDescription>
                  Jelajahi geografi Malaysia termasuk negeri, bandar, sungai,
                  gunung, dan ciri-ciri geografi yang unik.
                </CardDescription>
                <Link href="/quiz/geografi-malaysia">
                  <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700">
                    Mula Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Earth className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Pengetahuan Geografi Dunia</CardTitle>
                <CardDescription>
                  Uji pengetahuan anda tentang geografi dunia, negara-negara,
                  ibu kota, dan fakta menarik dari seluruh dunia.
                </CardDescription>
                <Link href="/quiz/pengetahuan-geografi-dunia">
                  <Button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700">
                    Mula Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Tracking Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Track Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600">
              Monitor your progress across all quiz topics with detailed
              analytics. See your improvement over time, identify your strongest
              subjects, and compete with friends on the leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                View Your Stats
                <TrendingUp className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Join Leaderboard
                <Trophy className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Detailed analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Progress tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Global rankings</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

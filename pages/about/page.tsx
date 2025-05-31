import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Бидний тухай</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TechBlog нь технологийн мэдээлэл, туршлага, санаануудыг хуваалцах платформ юм. Бид хүний түүх, санаануудыг
              дэлхийд хүргэх зорилготой.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Олон нийтийн платформ</h3>
                <p className="text-gray-600">Хэн ч өөрийн мэдлэг, туршлагаа хуваалцаж болно</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Чанартай агуулга</h3>
                <p className="text-gray-600">Бүх нийтлэл хянагдаж, чанартай агуулгыг баталгаажуулна</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Зохиогчдыг дэмжих</h3>
                <p className="text-gray-600">Reputation системээр зохиогчдыг урамшуулж, цалин олгоно</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Хурдан хөгжил</h3>
                <p className="text-gray-600">Хамгийн сүүлийн үеийн технологиудыг ашиглан бүтээгдсэн</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Манай зорилго</h2>
              <p className="text-lg text-gray-600 mb-8">
                Бид технологийн салбарт ажиллаж байгаа хүмүүсийн мэдлэг, туршлагыг хуваалцах, хамтдаа сурч хөгжих орчинг
                бүрдүүлэхийг зорьж байна. Манай платформ дээр та өөрийн мэдлэгээ хуваалцаж, бусдаас суралцаж, хамтдаа
                илүү сайн ирээдүйг бүтээж чадна.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="text-gray-600">Нийтлэл</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Зохиогч</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                  <div className="text-gray-600">Уншигч</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

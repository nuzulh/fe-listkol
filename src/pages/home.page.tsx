import Header from "@/components/header";
import Heading from "@/components/heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { menus } from "@/lib/consts";
import { useAssets } from "@/lib/hooks";
import {
  Clock,
  Lightbulb,
  LineChart,
  LucideIcon,
  Megaphone,
  MousePointerClick,
  PlayCircle,
  Plus,
  Presentation,
  Search,
  User,
} from "lucide-react";

export default function HomePage() {
  const assets = useAssets();

  return (
    <>
      <Header />
      <main>
        <section id="home" className="min-h-screen container flex flex-col items-center justify-center gap-5 text-center md:px-44 bg-dots bg-no-repeat bg-cover bg-top py-20">
          <h1 data-aos="fade-up" className="text-2xl md:text-3xl font-semibold">
            Optimalkan Strategi Influencer Marketing: Dapatkan List KOL yang Tepat dan Ide Kampanye Inovatif, Semua Dalam Satu Platform Berbasis AI
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="font-light">
            Akses Instan ke Daftar Influencer Tiktok yang Akurat & Cepat + Kampanye yang Dibuat Otomatis oleh AI
          </p>
          <div data-aos="zoom-in" data-aos-delay="400" className="w-full aspect-video bg-gray-200 flex items-center justify-center lg:w-3/4">
            <PlayCircle />
          </div>
          <Button variant="shadow">
            Dapetin List KOLnya di Sini!
          </Button>
        </section>
        <section id="partner" className="bg-[#F8F6F2]">
          <div className="container py-20 lg:px-44">
            <Heading title="Partner" subtitle="Best Partner" />
            <ScrollArea>
              <div className="flex w-max space-x-4 pb-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    data-aos="fade-left"
                    data-aos-delay={100 * i}
                    className="h-16 md:h-24 aspect-video bg-dark text-white flex items-center justify-center"
                  >
                    Partner {i + 1}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>
        <section id="benefit" className="container lg:px-44 py-20">
          <Heading title="Benefit" subtitle="Benefit Bersama Kami" />
          <div className="flex flex-col md:flex-row gap-4">
            <BenefitItem
              index={0}
              Icon={Search}
              description="Cepat Cari Influencer: Cari KOL yang cocok secara otomatis, gak perlu lagi secara manual."
            />
            <BenefitItem
              index={1}
              Icon={MousePointerClick}
              description="Pilihan Lebih Tepat: Berdasarkan pada analisis, bukan perkiraan. Temukan influencer yang efektif untuk brand."
            />
            <BenefitItem
              index={2}
              Icon={Lightbulb}
              description="Ide Kampanye dari AI: Dapatkan inspirasi kreatif tanpa batas, menjadikan setiap kampanye unik dan menarik."
            />
          </div>
        </section>
        <section id="testimoni" className="container lg:px-44 pb-20">
          <div data-aos="zoom-in" className="border border-black rounded-3xl bg-primary text-white px-6 py-12 flex flex-col items-center shadow-solid">
            <Heading
              title="Testimoni"
              subtitle="Review dari Klien Kami"
              titleCn="text-white"
            />
            <div className="text-center flex flex-col items-center gap-4">
              <p className="font-bold text-xl lg:px-24">
                I had an instant connection with Dani, and loved talking to her! We talked about Worklife balance.
              </p>
              <div className="flex items-center gap-2 border-t pt-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-muted-foreground">
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Ferry Irwandi</span>
                  <span className="text-sm font-light">CEO Malaka</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="revenue" className="flex flex-col lg:flex-row">
          <div className="container bg-secondary py-20 lg:p-32 flex items-center justify-center">
            <div className="flex items-start justify-center w-full">
              <img
                src={assets.getImage("revenue")}
                className="w-24 absolute mr-72"
                alt=""
              />
              <div data-aos="fade-up" className="rounded-3xl shadow-solid bg-white p-6 space-y-2 z-20 mx-auto mt-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-sm">
                      Revenue Growth
                    </h2>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">
                        $24.000,50
                      </h3>
                      <span className="text-xs font-light">
                        / Month
                      </span>
                    </div>
                  </div>
                  <div className="border border-primary rounded p-1 self-start">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <img
                  data-aos="zoom-in"
                  src={assets.getImage("bar-chart")}
                  className="w-full"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="container bg-primary lg:px-44 py-20 text-white flex flex-col justify-center">
            <h2 data-aos="fade-right" className="text-xl font-bold mb-4">
              Langkah - langkah
            </h2>
            <ul className="list-decimal space-y-3">
              <li data-aos="fade-up" data-aos-delay="200" className="list-item">
                Temukan Influencer di Database Kami: Langsung temukan daftar influencer yang sesuai dengan kebutuhan.
              </li>
              <li data-aos="fade-up" data-aos-delay="400" className="list-item">
                Kembangkan Konsep Kampanye: Gunakan ide-ide kreatif dari platform kami untuk merancang kampanye yang menarik dan efektif.
              </li>
            </ul>
          </div>
        </section>
        <section id="join-us" className="container lg:px-44 py-20 flex flex-col md:items-center">
          <Heading
            title="Join Us"
            subtitle="What You Get By Joining Us"
          />
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Clock className="h-5 w-5" /> Cepat
              </div>
              <p className="text-sm font-light">
                Hemat waktu dan usaha dalam mencari dan menganalisa dengan influencer
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Presentation className="h-5 w-5" /> Optimal
              </div>
              <p className="text-sm font-light">
                Menentukan hasil optimal dari kampanye, apakah awareness, traffic atau konversi
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Megaphone className="h-5 w-5" /> Inovatif
              </div>
              <p className="text-sm font-light">
                Akses ke ide-ide kampanye yang segar dan inovatif berbasis AI
              </p>
            </div>
          </div>
        </section>
        <section id="get-kol" className="bg-secondary">
          <div data-aos="fade-up" className="container lg:px-80 py-20 text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Pilih KOL & Bikin Kampanye Keren Sekarang!
            </h1>
            <Button variant="shadow">
              Dapetin List KOLnya di Sini!
            </Button>
          </div>
        </section>
        <section id="about" className="container py-20 lg:px-44">
          <Heading
            title="About"
            subtitle="Tentang Kami"
          />
          <p data-aos="fade-up" className="text-lg leading-6">
            Kami adalah platform inovatif yang menyediakan solusi terbaik untuk strategi pemasaran influencer Anda. Menemukan influencer yang sesuai dengan brand Anda tidak pernah semudah ini. Dengan teknologi AI, kami menyediakan akses langsung ke database influencer dan ide-ide kampanye yang kreatif serta inovatif. Misi kami adalah menyederhanakan pencarian, meningkatkan efisiensi, dan menghasilkan hasil optimal untuk setiap kampanye Anda. Bergabunglah dengan kami sekarang dan jadilah bagian dari revolusi pemasaran influencer yang cerdas dan efektif!
          </p>
        </section>
        <section id="pricing" className="bg-primary text-white">
          <div className="container py-20 lg:px-44 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
            <div data-aos="fade-right" className="font-bold text-4xl">
              Rp 199.000/
              <span className="text-base">bulan</span>
            </div>
            <div data-aos="fade-left" className="space-y-4 lg:w-1/2">
              <div>
                bulanan/tahunan
              </div>
              <h1 className="text-2xl font-bold">Pricing plan</h1>
              <p>
                Akses Tak Terbatas di Database Influencer Tiktok Generate 8 Kampanye Influencer dengan Berbagai Objective per bulan
              </p>
            </div>
          </div>
        </section>
        <section id="faq" className="container py-20 lg:px-72 flex flex-col items-center">
          <h1 data-aos="zoom-in" className="text-2xl font-bold mb-5">
            FAQ
          </h1>
          <div className="w-full space-y-3">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="flex items-center justify-between"
            >
              <p className="text-lg">
                Apa itu ListKOL.com?
              </p>
              <div>
                <Plus className="h-5 w-5" />
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex items-center justify-between"
            >
              <p className="text-lg">
                Apa manfaat bergabung dengan ListKOL.com?
              </p>
              <div>
                <Plus className="h-5 w-5" />
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex items-center justify-between"
            >
              <p className="text-lg">
                Berapa biaya berlangganan ListKOL.com?
              </p>
              <div>
                <Plus className="h-5 w-5" />
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex items-center justify-between"
            >
              <p className="text-lg">
                Apakah ada batasan jumlah kampanye yang bisa saya buat setiap bulan?
              </p>
              <div>
                <Plus className="h-5 w-5" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-dark text-white">
        <div className="container py-10 lg:px-44">
          <p data-aos="zoom-in" className="text-sm border-b pb-5">
            Kami adalah platform inovatif yang menyediakan solusi terbaik untuk strategi pemasaran influencer Anda. Menemukan influencer yang sesuai dengan brand Anda tidak pernah semudah ini. Dengan teknologi AI, kami menyediakan akses langsung ke database influencer dan ide-ide kampanye yang kreatif serta inovatif. Misi kami adalah menyederhanakan pencarian, meningkatkan efisiensi, dan menghasilkan hasil optimal untuk setiap kampanye Anda. Bergabunglah dengan kami sekarang dan jadilah bagian dari revolusi pemasaran influencer yang cerdas dan efektif!
          </p>
          <div
            data-aos="fade-up"
            className="flex items-center justify-between mt-4"
          >
            <div className="space-x-2 md:space-x-4">
              {menus.map((menu) => (
                <a
                  key={menu.link}
                  href={menu.link}
                  className="text-xs md:text-sm"
                >
                  {menu.title}
                </a>
              ))}
            </div>
            <h6 className="w-fit text-right">
              Copyright 2024
            </h6>
          </div>
        </div>
      </footer>
    </>
  );
}

function BenefitItem({
  Icon,
  description,
  index,
}: {
  Icon: LucideIcon;
  description: string;
  index: number;
}) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={100 * index}
      className="border border-black rounded shadow-solid py-6 px-4 w-full md:w-1/3 flex flex-col gap-6"
    >
      <div className="bg-primary rounded h-10 w-10 border border-black flex items-center justify-center">
        <Icon className="h-full text-white" />
      </div>
      <p className="grow flex items-center font-semibold mb-6">
        {description}
      </p>
    </div>
  );
}

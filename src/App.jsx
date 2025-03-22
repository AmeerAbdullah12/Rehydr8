"use client"

import { useRef, useState, useEffect } from "react"
import { ArrowDown, Droplets, Mail, MapPin, Menu, Phone, X, Instagram, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const productContainerRef = useRef(null)
  const productRefs = useRef([])

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const productsRef = useRef(null)
  const contactRef = useRef(null)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Track which product is in the center of the viewport
  useEffect(() => {
    if (!productContainerRef.current || !isMobile) return

    const handleScroll = () => {
      const container = productContainerRef.current
      const containerCenter = container.offsetLeft + container.offsetWidth / 2

      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      productRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const distance = Math.abs(cardCenter - containerCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveProductIndex(closestIndex)
    }

    const container = productContainerRef.current
    container.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [isMobile])

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <main className="relative min-h-screen">
      {/* Mobile Menu Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-sky-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-sky-700" /> : <Menu className="h-6 w-6 text-sky-700" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="flex flex-col gap-8 text-center">
            <Button
              variant="ghost"
              className="text-2xl font-semibold hover:bg-sky-100 hover:text-sky-700 px-8 py-6"
              onClick={() => scrollToSection(homeRef)}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-2xl font-semibold hover:bg-sky-100 hover:text-sky-700 px-8 py-6"
              onClick={() => scrollToSection(aboutRef)}
            >
              About Us
            </Button>
            <Button
              variant="ghost"
              className="text-2xl font-semibold hover:bg-sky-100 hover:text-sky-700 px-8 py-6"
              onClick={() => scrollToSection(productsRef)}
            >
              Products
            </Button>
            <Button
              variant="ghost"
              className="text-2xl font-semibold hover:bg-sky-100 hover:text-sky-700 px-8 py-6"
              onClick={() => scrollToSection(contactRef)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-sky-100 to-sky-200 px-4 py-20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-300 rounded-full opacity-20"></div>
          <div className="absolute top-1/3 -left-20 w-64 h-64 bg-sky-400 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-sky-500 rounded-full opacity-20"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-4">
                Pure Refreshment, <br />
                <span className="text-sky-600">Naturally Sourced</span>
              </h1>
              <p className="text-lg md:text-xl text-sky-700 mb-8 max-w-xl">
                Experience the crisp, clean taste of nature with our premium mineral water, sourced from pristine
                mountain springs.
              </p>
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => scrollToSection(productsRef)}
              >
                Explore Our Products
              </Button>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-full mx-auto md:ml-4 mb-10">
                <img
                  src="/displayPicture.jpg"
                  alt="Crystal clear water bottle"
                  className=" w-100 h-100 sm:w-200 sm:h-200 object-contain"
                />
                {/* <div className="absolute inset-0 bg-sky-500/10 rounded-full blur-3xl -z-10"></div> */}
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/50 hover:bg-white/80 mr-10"
              onClick={() => scrollToSection(aboutRef)}
            >
              <ArrowDown className="h-6 w-6 text-sky-700" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="min-h-screen flex items-center bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-sky-900 mb-4 text-center">About Us</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-8 md:mb-12"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-semibold text-sky-800 mb-4">Our Story</h3>
              <p className="text-sky-700 mb-6 text-base md:text-lg">
                Rehydr8, Alkaline Mineral Water, Started by Nova Beverages in 2020, has been committed to bringing the
                purest mineral water to your table. Our journey began with a simple mission: to share the natural
                goodness of pristine mountain springs with the world.
              </p>
              <p className="text-sky-700 mb-6 text-base md:text-lg">
                We take pride in our sustainable practices and minimal environmental footprint. Our bottling facility
                uses renewable energy, and we're constantly innovating to reduce plastic usage and promote recycling.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-sky-50 p-4 rounded-lg text-center transform transition-transform hover:scale-105">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Droplets className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-sky-800">100% Natural</h4>
                  <p className="text-sm text-sky-600">No additives or processing</p>
                </div>
                <div className="bg-sky-50 p-4 rounded-lg text-center transform transition-transform hover:scale-105">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Droplets className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-sky-800">Eco-Friendly</h4>
                  <p className="text-sm text-sky-600">Sustainable practices</p>
                </div>
                <div className="bg-sky-50 p-4 rounded-lg text-center transform transition-transform hover:scale-105">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Droplets className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-sky-800">Premium Quality</h4>
                  <p className="text-sm text-sky-600">Rigorous testing standards</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/waterSource.jpg"
                  alt="Mountain spring source"
                  className="w-full h-auto rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-sky-500/10 rounded-lg blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        ref={productsRef}
        className="min-h-screen flex items-center bg-gradient-to-b from-sky-50 to-sky-100 px-4 py-16 md:py-20"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-sky-900 mb-4 text-center">Our Products</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-8 md:mb-12"></div>

          {/* Mobile Horizontal Scrollable Products */}
          <div ref={productContainerRef} className="md:hidden overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory">
            <div className="flex gap-4 w-max">
              {/* Product 1 */}
              <div ref={(el) => (productRefs.current[0] = el)} className="w-72 flex-shrink-0 snap-center">
                <Card
                  className={`bg-white/80 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                    activeProductIndex === 0
                      ? "transform scale-105 shadow-2xl z-10"
                      : "transform scale-95 opacity-80 shadow-xl"
                  }`}
                >
                  <div className="relative h-64">
                    <img src="/500mithoutBG.png" alt="Natural Spring Water" className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-sky-800 mb-2">Rehydr8 500 ml</h3>
                    <p className="text-sky-600 mb-4">
                      Our specialized water in 500 ml packing, sourced from pristine mountain springs. Perfect for
                      everyday hydration.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-sky-900">Rs. 50</span>
                      <a
                        href="https://wa.me/923159777509?text=Hi%2C%20Hafeez%20would%20like%20to%20order%20Rehydr8%20500%20ml"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-sky-600 hover:bg-sky-700 transition-transform hover:scale-105">
                          Order Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product 2 */}
              <div ref={(el) => (productRefs.current[1] = el)} className="w-72 flex-shrink-0 snap-center">
                <Card
                  className={`bg-white/80 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                    activeProductIndex === 1
                      ? "transform scale-105 shadow-2xl z-10"
                      : "transform scale-95 opacity-80 shadow-xl"
                  }`}
                >
                  <div className="relative h-64">
                    <img
                      src="/1.5withoutBG.png"
                      alt="Sparkling Mineral Water"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-sky-800 mb-2">Rehydr8 1.5L</h3>
                    <p className="text-sky-600 mb-4">
                      Naturally carbonated mineral water with a refreshing fizz. Available in bigger packaging with more
                      refreshment.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-sky-900">Rs. 100</span>
                      <a
                        href="https://wa.me/923159777509?text=Hi%2C%20I%20would%20like%20to%20order%20Rehydr8%201.5L"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-sky-600 hover:bg-sky-700 transition-transform hover:scale-105">
                          Order Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product 3 */}
              <div ref={(el) => (productRefs.current[2] = el)} className="w-72 flex-shrink-0 snap-center">
                <Card
                  className={`bg-white/80 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                    activeProductIndex === 2
                      ? "transform scale-105 shadow-2xl z-10"
                      : "transform scale-95 opacity-80 shadow-xl"
                  }`}
                >
                  <div className="relative h-64">
                    <img src="/medicineBottles.jpg" alt="Alkaline Water" className="w-full h-full object-contain" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-sky-800 mb-2">Medicine Bottles</h3>
                    <p className="text-sky-600 mb-4">
                      Nova Beverages now offer bottle manufacturing too. You will decide the size, we will ensure
                      quality.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-sky-900">$2.99</span>
                      <a
                        href="https://wa.me/923159777509?text=Hi%2C%20Hafeez%20would%20like%20to%20order%20Medicine%20Bottles"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-sky-600 hover:bg-sky-700 transition-transform hover:scale-105">
                          Order Now
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Scroll indicator for mobile */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeProductIndex === 0 ? "bg-sky-600" : "bg-sky-300"}`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeProductIndex === 1 ? "bg-sky-600" : "bg-sky-300"}`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeProductIndex === 2 ? "bg-sky-600" : "bg-sky-300"}`}
                ></div>
              </div>
            </div>
          </div>

          {/* Desktop Grid Products */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:translate-y-[-8px]">
              <div className="relative h-64">
                <img src="/500mithoutBG.png" alt="Natural Spring Water" className="w-full h-full object-contain" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-sky-800 mb-2">Rehydr8 500 ml</h3>
                <p className="text-sky-600 mb-4">
                  Our specialized water in 500 ml packing, sourced from pristine mountain springs. Perfect for everyday
                  hydration.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-sky-900">Rs. 50</span>
                  <a
                    href="https://wa.me/923159777509?text=Hi%2C%20Hafeez%20would%20like%20to%20order%20Rehydr8%20500%20ml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-sky-600 hover:bg-sky-700 transition-transform hover:scale-105">
                      Order Now
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:translate-y-[-8px]">
              <div className="relative h-64">
                <img src="/1.5withoutBG.png" alt="Sparkling Mineral Water" className="w-full h-full object-contain" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-sky-800 mb-2">Rehydr8 1.5L</h3>
                <p className="text-sky-600 mb-4">
                  Naturally carbonated mineral water with a refreshing fizz. Available in bigger packaging with more
                  refreshment.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-sky-900">Rs. 100</span>
                  <a
                    href="https://wa.me/923159777509?text=Hi%2C%20I%20would%20like%20to%20order%20Rehydr8%201.5L"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-sky-600 hover:bg-sky-700 transition-transform hover:scale-105">
                      Order Now
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 */}
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:translate-y-[-8px]">
              <div className="relative h-64">
                <img src="/medicineBottles.jpg" alt="Alkaline Water" className="w-full h-full object-contain" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-sky-800 mb-2">Medicine Bottles</h3>
                <p className="text-sky-600 mb-4">
                  Nova Beverages now offer bottle manufacturing too. You will decide the size, we will ensure quality.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-sky-900">$2.99</span>
                  <a
                    href="https://wa.me/923159777509?text=Hi%2C%20Hafeez%20would%20like%20to%20order%20Medicine%20Bottles"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-sky-600 hover:bg-sky-700 transition-transform hover:scale-105">
                      Order Now
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section ref={contactRef} className="min-h-screen flex items-center bg-white px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-sky-900 mb-4 text-center">Contact Us</h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-8 md:mb-12"></div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-sky-800 mb-6">Get In Touch</h3>
              <p className="text-sky-700 mb-8">
                Have questions about our products or services? We'd love to hear from you. Just reach out to us and our
                team will get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sky-800">Our Location</h4>
                    <p className="text-sky-600">85/B-2 Road B-6 Industrial Estate, Hayatabad, Peshawar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sky-800">Email Us</h4>
                    <p className="text-sky-600">info@aquapure-water.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sky-800">Call Us</h4>
                    <a href="tel:+923159777509" className="text-sky-600 hover:underline">
                      +92 315 9777509
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 cursor-pointer">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Instagram className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sky-800">Instagram</h4>
                    <a
                      href="https://www.instagram.com/your_account_name"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline"
                    >
                      Nova Beverages
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 cursor-pointer">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Facebook className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sky-800">Facebook</h4>
                    <a
                      href="https://www.facebook.com/profile.php?id=61573705081907"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline"
                    >
                      Nova Beverages
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <h3 className="text-xl font-bold mb-4">Nova Beverages</h3>
              <p className="text-sky-200 mb-4">
                Bringing the purest mineral water from nature to your table since 2020.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    className="text-sky-200 hover:text-white transition-colors"
                    onClick={() => scrollToSection(homeRef)}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className="text-sky-200 hover:text-white transition-colors"
                    onClick={() => scrollToSection(aboutRef)}
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    className="text-sky-200 hover:text-white transition-colors"
                    onClick={() => scrollToSection(productsRef)}
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button
                    className="text-sky-200 hover:text-white transition-colors"
                    onClick={() => scrollToSection(contactRef)}
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sky-200 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sky-200 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sky-200 hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sky-300">
            <p>© {new Date().getFullYear()} Nova Beverages. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}


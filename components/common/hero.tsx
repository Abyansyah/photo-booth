import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff69b42e_1px,transparent_1px),linear-gradient(to_bottom,#ff69b42e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-24">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Digital <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">Photo Booth</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-[42rem] leading-normal md:leading-relaxed">
                Create amazing photo booth strips directly from your device! Simply use your laptop, tablet, or phone to take photos and get stunning digital photo booth strips.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Gallery
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-2xl md:text-4xl font-bold text-primary">10k+</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-2xl md:text-4xl font-bold text-primary">50+</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Photo Templates</p>
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-2xl md:text-4xl font-bold text-primary">100%</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Online</p>
              </div>
            </div>
          </div>

          <div className="block lg:hidden mt-4">
            <div className="bg-card rounded-xl border p-4 shadow-lg">
              <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 gap-1 p-2">
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-2/3 rounded-lg shadow-lg overflow-hidden">
                      <Image width={600} height={400} src="/img/hero.jpg" alt="Person taking a selfie" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute bottom-0 right-0 w-1/2 h-3/4 bg-white rounded-lg shadow-lg overflow-hidden transform rotate-6">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center transform rotate-12 z-10">
                        <span className="text-xs">★</span>
                      </div>
                      <div className="absolute top-1/4 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center transform -rotate-12 z-10">
                        <span className="text-xs text-white">♥</span>
                      </div>
                      <div className="absolute bottom-1/4 -left-2 w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center transform rotate-45 z-10">
                        <span className="text-xs">✿</span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-300 rounded-full flex items-center justify-center z-10">
                        <span className="text-xs">✦</span>
                      </div>

                      {/* Photos */}
                      <div className="grid grid-rows-4 h-full">
                        <div className="bg-gray-100 border-b border-gray-200 p-1">
                          <div className="w-full h-full rounded overflow-hidden">
                            <img src="/placeholder.svg?height=100&width=100" alt="Photo booth image 1" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="bg-gray-100 border-b border-gray-200 p-1">
                          <div className="w-full h-full rounded overflow-hidden">
                            <img src="/placeholder.svg?height=100&width=100" alt="Photo booth image 2" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="bg-gray-100 border-b border-gray-200 p-1">
                          <div className="w-full h-full rounded overflow-hidden">
                            <img src="/placeholder.svg?height=100&width=100" alt="Photo booth image 3" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="bg-gray-100 p-1">
                          <div className="w-full h-full rounded overflow-hidden">
                            <img src="/placeholder.svg?height=100&width=100" alt="Photo booth image 4" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-medium text-xs">Photos from Your Device</div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop preview */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
            <div className="relative bg-card rounded-2xl border p-6 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Pinky Booth Digital</h3>
                    <p className="text-sm text-muted-foreground">Create photo strips from your device</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Try Now
                  </Button>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 gap-1 p-2">
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-0 w-3/4 h-2/3 rounded-lg shadow-lg overflow-hidden">
                        <Image width={600} height={400} src="/img/hero.jpg" alt="Person taking a selfie" className="w-full h-full object-cover" />
                      </div>

                      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-white rounded-lg shadow-lg overflow-hidden transform rotate-6">
                        <div className="absolute top-1 left-1 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center transform rotate-12 z-10">
                          <span className="text-sm">★</span>
                        </div>
                        <div className="absolute top-1/4 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center transform -rotate-12 z-10">
                          <span className="text-sm text-white">♥</span>
                        </div>
                        <div className="absolute bottom-1/3 -left-3 w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center transform rotate-45 z-10">
                          <span className="text-sm">✿</span>
                        </div>
                        <div className="absolute -bottom-3 -right-3 w-7 h-7 bg-green-300 rounded-full flex items-center justify-center z-10">
                          <span className="text-sm">✦</span>
                        </div>
                        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-purple-300 rounded-full flex items-center justify-center transform rotate-12 z-10">
                          <span className="text-xs">♪</span>
                        </div>

                        {/* Photos */}
                        <div className="grid grid-rows-4 h-full">
                          <div className="bg-gray-100 border-b border-gray-200 p-1">
                            <div className="w-full h-full rounded overflow-hidden">
                              <img src="/placeholder.svg?height=150&width=150" alt="Photo booth image 1" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="bg-gray-100 border-b border-gray-200 p-1">
                            <div className="w-full h-full rounded overflow-hidden">
                              <img src="/placeholder.svg?height=150&width=150" alt="Photo booth image 2" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="bg-gray-100 border-b border-gray-200 p-1">
                            <div className="w-full h-full rounded overflow-hidden">
                              <img src="/placeholder.svg?height=150&width=150" alt="Photo booth image 3" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="bg-gray-100 p-1">
                            <div className="w-full h-full rounded overflow-hidden">
                              <img src="/placeholder.svg?height=150&width=150" alt="Photo booth image 4" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-medium text-sm">Photos Directly from Your Device</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-2 rounded-full bg-primary/20" />
                      <div className="h-2 w-2/3 rounded-full bg-muted" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

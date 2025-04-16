import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQPage() {
  return (
    <section className="py-24">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">Find answers to common questions about our digital photo booth service.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-muted">
              <AccordionTrigger className="text-base font-medium hover:text-primary">How does the digital photo booth work?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our digital photo booth works directly in your web browser. Simply allow access to your camera, take photos, choose a template, and download your photo strip. No app installation required!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-muted">
              <AccordionTrigger className="text-base font-medium hover:text-primary">Can I use it on my phone?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">Yes! Our digital photo booth works on smartphones, tablets, and computers. As long as your device has a camera and a web browser, you&apos;re good to go.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-muted">
              <AccordionTrigger className="text-base font-medium hover:text-primary">How many photos can I take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">With our free plan, you can create up to 5 photo strips per day. Premium users get unlimited photo strips and access to all our templates.</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-muted">
              <AccordionTrigger className="text-base font-medium hover:text-primary">Can I customize the templates?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Premium users can customize templates with their own colors, text, and logos. Event package users get fully customized templates designed specifically for their event.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-muted">
              <AccordionTrigger className="text-base font-medium hover:text-primary">How do I share my photo strips?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                After creating your photo strip, you can download it, share it directly to social media, or get a unique link to share with friends and family. Premium users also get cloud storage for all their photo strips.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-muted">
              <AccordionTrigger className="text-base font-medium hover:text-primary">What if I don&apos;t like my photos?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No problem! You can retake your photos as many times as you want until you&apos;re happy with them. You can also replace individual photos in your strip without redoing the entire session.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-muted">
              <AccordionTrigger className="text-base font-medium hover:text-primary">Are there filters available?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! We offer several photo filters including grayscale, sepia, vintage, vibrant, and more. You can preview these filters in real-time before taking your photos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-base font-medium hover:text-primary">Can I add stickers or text to my photos?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                After taking your photos, you can customize your photo strip with various stickers, text elements, and background colors in our photo strip editor before downloading.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

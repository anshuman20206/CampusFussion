import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GALLERY_IMAGES } from '@/lib/constants';

export default function GalleryPage() {
  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Event Gallery</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A visual journey through our community's moments of collaboration, learning, and fun.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_IMAGES.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="group cursor-pointer overflow-hidden">
                <CardContent className="relative aspect-video p-0">
                  <Image
                    src={image.src}
                    data-ai-hint={image.dataAiHint}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 w-full p-4 text-white opacity-0 transition-transform duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                    <h3 className="font-bold">{image.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{image.title}</DialogTitle>
                <DialogDescription>{image.alt}</DialogDescription>
              </DialogHeader>
              <div className="relative mt-4 aspect-video">
                <Image src={image.src} alt={image.alt} fill className="object-contain rounded-md" />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

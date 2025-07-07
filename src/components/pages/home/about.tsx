import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold tracking-tight">
            Bringing GDG Principles to Campus
          </h2>
          <p className="mt-4 text-muted-foreground">
            Google Developer Groups (GDGs) are communities of developers interested in Google's developer technology. CampusConnect extends this spirit directly to students, creating a localized hub for learning, sharing, and building with the technologies of tomorrow.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our mission is to bridge the gap between academic learning and real-world development. We provide a platform for students to connect with peers, learn from industry experts, and gain hands-on experience through workshops and projects, all under the supportive umbrella of GDG.
          </p>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <Image
            src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-goog/events/GDG%2BIEC_P357Vi9.png"
            data-ai-hint="event logo"
            alt="GDG Chapter Event Logo"
            width={500}
            height={500}
            className=""
          />
        </div>
      </div>
    </section>
  );
}

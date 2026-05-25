import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Notes } from "@/components/sections/Notes";
import { Lectures } from "@/components/sections/Lectures";
import { Features } from "@/components/sections/Features";
import { Academic } from "@/components/sections/Academic";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PHYSIS — Pathway to Success | Premier Physics Coaching Institute" },
      {
        name: "description",
        content:
          "PHYSIS is a research-oriented physics coaching institute for HS and FYUGP students. Concept-based teaching, curated notes, video lectures, and academic mentorship.",
      },
      { property: "og:title", content: "PHYSIS — Pathway to Success" },
      { property: "og:description", content: "Premier physics coaching for HS and FYUGP scholars. Concept-first pedagogy, notes, lectures and PYQ archives." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "PHYSIS",
        description: "Premier physics coaching institute for HS and FYUGP scholars.",
        slogan: "Pathway to Success",
      }),
    }],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Notes />
      <Lectures />
      <Features />
      <Academic />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

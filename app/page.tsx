import Hero from '@/components/Hero';
import About from '@/components/About';
import SelectedWork from '@/components/SelectedWork';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-bg-border to-transparent mx-6 md:mx-12 lg:mx-20" />
);

export default function Home() {
  return (
    <main>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <SelectedWork />
      <Divider />
      <Skills />
      <Divider />
      <Timeline />
      <Divider />
      <Contact />
    </main>
  );
}

import Hero from '@/components/hero/Hero'
import IntroSection from '@/components/intro/IntroSection'
import InternshipSection from '@/components/internships/InternshipSection'
import ProjectsSection from '@/components/projects/ProjectsSection'
import NameStrip from '@/components/name/NameStrip'
import ActivitiesSection from '@/components/activities/ActivitiesSection'
import StudioSection from '@/components/studio/StudioSection'
import ConnectCard from '@/components/ui/ConnectCard'
import SiteFooter from '@/components/footer/SiteFooter'
import PaperRun from '@/components/paper/PaperRun'

export default function Page() {
  return (
    <>
      <main>
        {/* One continuous sheet of warm graph paper running the height of the document */}
        <PaperRun>
          <Hero />
          <IntroSection />
          <InternshipSection />
          <ProjectsSection />
          <NameStrip />
          <ActivitiesSection />
          <StudioSection />
          <SiteFooter />
        </PaperRun>
      </main>
      <ConnectCard />
    </>
  )
}


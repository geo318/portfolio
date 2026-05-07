import { PortfolioFrame } from "@/components/layout/portfolio-frame";
import { ApplicationNotes } from "@/components/sections/application-notes";
import { ArchitectureSection } from "@/components/sections/architecture-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FitSection } from "@/components/sections/fit-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LiveChatSection } from "@/components/sections/live-chat-section";
import { PerformanceSection } from "@/components/sections/performance-section";
import { PropertySection } from "@/components/sections/property-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { StackSection } from "@/components/sections/stack-section";
import { ThreeShowcaseSection } from "@/components/sections/three-showcase-section";

export function PortfolioPage() {
	return (
		<PortfolioFrame>
			<HeroSection />
			<FitSection />
			<StackSection />
			<ThreeShowcaseSection />
			<ArchitectureSection />
			<SelectedWorkSection />
			<PerformanceSection />
			<PropertySection />
			<ApplicationNotes />
			<LiveChatSection />
			<ContactSection />
		</PortfolioFrame>
	);
}

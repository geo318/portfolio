import { PortfolioFrame } from "@/components/layout/portfolio-frame";
import { ApplicationNotes } from "@/components/sections/application-notes";
import { ArchitectureSection } from "@/components/sections/architecture-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DeferredLiveChatSection } from "@/components/sections/deferred-live-chat-section";
import { DeferredThreeShowcaseSection } from "@/components/sections/deferred-three-showcase-section";
import { FitSection } from "@/components/sections/fit-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PerformanceSection } from "@/components/sections/performance-section";
import { PropertySection } from "@/components/sections/property-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { StackSection } from "@/components/sections/stack-section";

export function PortfolioPage() {
	return (
		<PortfolioFrame>
			<HeroSection />
			<FitSection />
			<StackSection />
			<DeferredThreeShowcaseSection />
			<ArchitectureSection />
			<SelectedWorkSection />
			<PerformanceSection />
			<PropertySection />
			<ApplicationNotes />
			<DeferredLiveChatSection />
			<ContactSection />
		</PortfolioFrame>
	);
}

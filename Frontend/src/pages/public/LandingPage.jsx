import React from 'react';
import NavbarPublic from '../../components/public/NavbarPublic';
import Footer from '../../components/public/Footer';
import Hero from '../../components/public/Hero';
import HowItWorks from '../../components/public/HowItWorks';
import ForBrands from '../../components/public/ForBrands';
import ForCreator from '../../components/public/ForCreator';
import CollaborationFlow from '../../components/public/CollaborationFlow';
import CTASection from '../../components/public/CTASection';
import { AnimatedSection } from '../../animation/AnimatedSection';

function LandingPage() {
    return (
        <>
            <AnimatedSection>
                <Hero />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
                <HowItWorks />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
                <ForBrands />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
                <ForCreator />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
                <CollaborationFlow />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
                <CTASection />
            </AnimatedSection>
        </>
    );
}

export default LandingPage;
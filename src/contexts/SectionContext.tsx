"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type SectionContextType = {
    activeSection: string;
    registerSection: (id: string) => void;
    setSectionInView: (id: string, inView: boolean) => void;
};

const SectionContext = createContext<SectionContextType>({
    activeSection: '',
    registerSection: () => { },
    setSectionInView: () => { },
});

export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeSection, setActiveSection] = useState('hero');
    // Keep track of which sections are currently in view (could be multiple if scrolling fast or small sections)
    const [sectionsInView, setSectionsInView] = useState<Set<string>>(new Set(['hero']));

    const registerSection = (_id: string) => {
        // Placeholder for any initialization if needed
    };

    const setSectionInView = (id: string, inView: boolean) => {
        setSectionsInView(prev => {
            const next = new Set(prev);
            if (inView) {
                next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    };

    // Determine the "Dominant" active section based on priority or order
    useEffect(() => {
        // Find the first section in priority list that is strictly in view
        // OR better yet, just update activeSection to the most recently added one if we assume standard scroll
        // But intersection observers usually trigger nicely.

        // Let's use a simple heuristic: The "latest" one that reported inView is likely where the user is focused 
        // if they are scrolling down. 
        // A better approach for "Scroll Transition" is typically the one that takes up the most space or the one currently near center.
        // For simplicity, we'll let the hooks update the state.

        // Strategy: iterate through priority list, return the first one that is currently in view.
        // This ensures if 'Hero' and 'About' are both in view, 'Hero' takes precedence until it fully leaves? 
        // Or actually, if we want transition to 'About' as soon as 'About' starts appearing...

        // Let's try: The LAST active section in the priority list is the one "entering" if scrolling down.
        // If scrolling up, we might want the reverse.

        // Actually, let's keep it simple: The `activeSection` will be set by the hook when it detects >50% visibility or similar threshold.
    }, [sectionsInView]);

    // Alternative: The hook itself sets the active section when it thinks it's dominant.
    // We will expose `setActiveSection` to the context so components can claim dominance.

    return (
        <SectionContext.Provider value={{
            activeSection,
            registerSection,
            setSectionInView
        }}>
            {children}
        </SectionContext.Provider>
    );
};

export const useSectionContext = () => useContext(SectionContext);

import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Hook for components to use
export const useSectionInView = (sectionId: string, margin: string = "-40% 0px -40% 0px") => {
    const { setSectionInView } = useSectionContext();
    const ref = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInView = useInView(ref, { margin: margin as any });

    useEffect(() => {
        setSectionInView(sectionId, isInView);
    }, [isInView, sectionId, setSectionInView]);

    return ref;
};

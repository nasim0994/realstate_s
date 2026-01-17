import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface MarqueeProps {
    baseVelocity: number;
}

function ParallaxText({ baseVelocity = 100 }: MarqueeProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });


    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((_, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 2500);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden tracking-[-2px] leading-[0.8] whitespace-nowrap flex flex-nowrap">
            <motion.div
                className="font-bold uppercase text-[8vw] md:text-[10vw] flex flex-nowrap gap-10 whitespace-nowrap py-2"
                style={{ x }}
            >
                <span className="text-outline">Luxury Living, Perfected Daily</span>
                <span className="text-outline">Luxury Living, Perfected Daily</span>
            </motion.div>
        </div>
    );
}

export default function InfiniteMarquee() {
    return (
        <section className="py-20 bg-base-100 overflow-hidden">
            <ParallaxText baseVelocity={-2} />
        </section>
    );
}
import { Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'react-router-dom'
import { LogoCloud } from './logo-cloud'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    const { user } = useAuth()

    return (
        <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-blue-600)]">
            <section>
                <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-8 lg:pt-12">
                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <TextEffect
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h1"
                            className="text-balance text-5xl font-medium md:text-6xl">
                            Your Weather, Your Way
                        </TextEffect>
                        <TextEffect
                            per="line"
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            delay={0.5}
                            as="p"
                            className="mx-auto mt-6 max-w-2xl text-pretty text-lg">
                            Track weather conditions across the globe with DevClimate. Get real-time updates, save your favorite locations, and stay prepared for any weather.
                        </TextEffect>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}
                            className="mt-12">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {!user ? (
                                    <Link to="/signup">
                                        <Button size="lg" className="flex items-center gap-2">
                                            <Cloud className="h-5 w-5" />
                                            Start Tracking Weather
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link to="/dashboard">
                                        <Button size="lg" className="flex items-center gap-2">
                                            <Cloud className="h-5 w-5" />
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            <div
                                aria-hidden
                                className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl to-transparent to-55% text-left">
                                <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border p-2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:-translate-x-6">
                                    <div className="relative h-96 overflow-hidden rounded-[1.5rem] border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                                </div>
                                <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] sm:translate-x-8">
                                    <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                                        <AppComponent />

                                        <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </div>
            </section>
            <LogoCloud />
        </main>
    )
}

const AppComponent = () => {
    return (
        <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4">
            <div className="flex items-center gap-1.5 text-blue-400">
                <Cloud className="size-5" />
                <div className="text-sm font-medium">Weather</div>
            </div>
            <div className="space-y-3">
                <div className="text-foreground border-b border-white/10 pb-3 text-sm font-medium">Track weather conditions across multiple cities with ease.</div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">22°C</span>
                            <span className="text-muted-foreground text-xs">New York</span>
                        </div>
                        <div className="flex h-5 items-center rounded bg-gradient-to-l from-blue-400 to-cyan-600 px-2 text-xs text-white">Sunny</div>
                    </div>
                    <div className="space-y-1">
                        <div className="space-x-1">
                            <span className="text-foreground align-baseline text-xl font-medium">18°C</span>
                            <span className="text-muted-foreground text-xs">London</span>
                        </div>
                        <div className="text-foreground bg-muted flex h-5 w-2/3 items-center rounded px-2 text-xs dark:bg-white/20">Cloudy</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

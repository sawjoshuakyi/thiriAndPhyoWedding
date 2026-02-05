import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from 'react-pageflip';

const storyPages = [
  {
    title: "How We Met",
    chapter: "Chapter One",
    image: "https://images.unsplash.com/photo-1766974888376-3697b53495f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc2Nzg2OTcyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Couple laughing together",
    text: [
      "We started as friends, and soon it became something more. Waiting outside the classroom with flowers, going on dates and officially starting our relationship in April 2020."
    ]
  },
  {
    title: "Falling in Love",
    chapter: "Chapter Two",
    image: "https://images.unsplash.com/photo-1506014299253-3725319c0f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHN8ZW58MXx8fHwxNzY3ODA4MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Couple holding hands",
    text: [
      "We love traveling, going on adventures together, and have celebrated each other’s milestones. We welcomed our sweet pup Momo into our lives, who quickly became the heart of our little family. "
    ]
  },
  {
    title: "The Proposal",
    chapter: "Chapter Three",
    image: "https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMG91dGRvb3JzfGVufDF8fHx8MTc2NzkwMzQ4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Romantic couple outdoors",
    text: [
      "Moving in together, celebrating our monthiversary with a proposal in November 2024, and now we’re excited to celebrate our wedding with you!"
    ]
  }
];

function MyBook() {
    // Track book state to hide the empty half when closed in landscape
    const bookRef = useRef<any>(null);
    const [meta, setMeta] = useState<{ isFirst: boolean; isLast: boolean; orientation: 'portrait' | 'landscape'; }>({
        isFirst: true,
        isLast: false,
        orientation: 'portrait'
    });
    // Temporary flag to smooth the front-cover opening flip
    const [opening, setOpening] = useState(false);

    const syncBookMeta = () => {
        const inst = bookRef.current?.pageFlip?.();
        if (!inst) return;
        const current = inst.getCurrentPageIndex?.() ?? 0;
        const total = inst.getPageCount?.() ?? 1;
        const orientation = inst.getOrientation?.() ?? 'portrait';
        setMeta({
            isFirst: current === 0,
            isLast: total > 0 && current === total - 1,
            orientation
        });
    };

    useEffect(() => {
        // Defer to ensure instance is ready
        const t = setTimeout(syncBookMeta, 0);
        return () => clearTimeout(t);
    }, []);

    const viewportClass = [
        'book-viewport',
        meta.orientation === 'landscape' ? 'landscape' : 'portrait',
        meta.isFirst ? 'closed-start' : '',
        meta.isLast ? 'closed-end' : '',
        opening ? 'opening' : ''
    ].filter(Boolean).join(' ');

    const handleFlip = () => {
        // If starting from the very first cover, temporarily disable clip for a smoother reveal
        if (meta.isFirst) {
            setOpening(true);
            // Clear after the flip animation; matches flippingTime
            setTimeout(() => setOpening(false), 1000);
        }
        syncBookMeta();
    };

    return (
        <div className="w-full flex justify-center">
            {/* Magical fantasy styles scoped to this component + closed-half fix */}
            <style>{`
              .magical-cover{position:relative;height:100%;display:flex;align-items:center;justify-content:center;color:#f6e27a;background:radial-gradient(120% 80% at 80% 10%,rgba(255,255,255,.08) 0%,rgba(255,255,255,0) 40%),linear-gradient(135deg,#152238 0%,#2a1b4a 45%,#5b2a8c 100%);border:2px solid rgba(246,226,122,.6);box-shadow:inset 0 0 0 2px rgba(255,255,255,.06), inset 0 0 24px rgba(246,226,122,.2)}
              .gold-title{font-family:var(--font-serif);letter-spacing:.06em;text-transform:uppercase;text-shadow:0 2px 12px rgba(0,0,0,.35);background:linear-gradient(180deg,#fff6bf,#e9c76c 45%,#b38b2f 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
              .cover-ornament{position:absolute;width:64px;height:64px;border:2px solid rgba(246,226,122,.5)}
              .cover-ornament.tl{top:14px;left:14px;border-right:none;border-bottom:none;border-radius:10px 0 0 0}
              .cover-ornament.tr{top:14px;right:14px;border-left:none;border-bottom:none;border-radius:0 10px 0 0}
              .cover-ornament.bl{bottom:14px;left:14px;border-right:none;border-top:none;border-radius:0 0 0 10px}
              .cover-ornament.br{bottom:14px;right:14px;border-left:none;border-top:none;border-radius:0 0 10px 0}
              .sparkles{position:absolute;inset:0;pointer-events:none}
              .sparkles i{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(255,255,255,.9);box-shadow:0 0 6px rgba(143,169,255,.9);animation:twinkle 2.6s linear infinite}
              .sparkles i:nth-child(3n){animation-duration:3.4s;opacity:.7}
              .sparkles i:nth-child(5n){animation-duration:4s;opacity:.55}
              @keyframes twinkle{0%{transform:scale(.8);opacity:.2}50%{transform:scale(1.4);opacity:1}100%{transform:scale(.8);opacity:.15}}
              .dropcap::first-letter{font-size:2rem;line-height:1;padding-right:.35rem;color:#2b5fc1;font-family:var(--font-serif)}

              /* Closed blank-half fix */
              .book-viewport{position:relative;width:fit-content}
              .book-viewport .my-flipbook{transition:clip-path .35s ease,transform .35s ease;will-change:clip-path,transform}
              /* Front cover closed (cover is on the right half, hide left half) */
              .book-viewport.landscape.closed-start .my-flipbook{clip-path:inset(0 0 0 50%);transform:translateX(-25%)}
              /* Front cover opening: temporarily show full width for smooth reveal */
              .book-viewport.landscape.closed-start.opening .my-flipbook{clip-path:none;transform:none}
              /* Back cover closed (cover is on the left half, hide right half) */
              .book-viewport.landscape.closed-end .my-flipbook{clip-path:inset(0 50% 0 0);transform:translateX(25%)}
            `}</style>

            <div className={viewportClass}>
                <HTMLFlipBook
                    ref={bookRef}
                    onFlip={handleFlip}
                    onChangeOrientation={syncBookMeta}
                    onInit={syncBookMeta}
                    width={350}
                    height={520}
                    minWidth={200}
                    maxWidth={500}
                    minHeight={300}
                    maxHeight={700}
                    className="my-flipbook shadow-2xl rounded-2xl"
                    style={{ margin: "0 auto" }}
                    size="fixed"
                    startPage={0}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={false}
                    startZIndex={0}
                    autoSize={true}
                    clickEventForward={false}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showCover={true}
                    mobileScrollSupport={true}
                    maxShadowOpacity={0.55}
                    showPageCorners={true}
                    disableFlipByClick={false}
                >
                    {/* Front Cover */}
                    <div className="demoPage h-full">
                        <div className="magical-cover rounded-md">
                            <span className="cover-ornament tl" />
                            <span className="cover-ornament tr" />
                            <span className="cover-ornament bl" />
                            <span className="cover-ornament br" />
                            <div className="text-center px-6">
                                <p className="tracking-widest text-xs opacity-90">A Magical Chronicle</p>
                                <h1 className="gold-title text-3xl mt-2">Our Story</h1>
                                <p className="mt-2" style={{ fontFamily:'var(--font-serif)' }}>Thiri &amp; Phyo</p>
                                <div className="mt-4 text-[12px] opacity-90">May 2, 2026</div>
                            </div>
                        </div>
                    </div>

                    {/* Chapter One - Title & Image (Left page style) */}
                    <div className="demoPage h-full">
                        <div className="h-full bg-[#fffef8] shadow-inner rounded-md border border-blue-100 flex flex-col relative" style={{ padding: '24px 28px' }}>
                            <header className="mb-3">
                                <p className="text-xs tracking-widest text-blue-700 uppercase">{storyPages[0].chapter}</p>
                                <h2 className="text-2xl text-blue-900" style={{ fontFamily: 'var(--font-serif)' }}>{storyPages[0].title}</h2>
                            </header>
                            <figure className="mt-2 mb-4">
                                <img src={storyPages[0].image} alt={storyPages[0].alt} className="w-full aspect-[3/2] object-cover rounded" />
                                <figcaption className="mt-2 text-xs text-blue-700/70">{storyPages[0].alt}</figcaption>
                            </figure>
                            <div className="mt-auto flex justify-between items-center pt-2 border-t border-blue-100">
                                <span className="text-xs text-blue-700/60">Chapter One</span>
                                <span className="text-xs text-blue-700/60">1</span>
                            </div>
                            <div className="sparkles">
                                <i style={{top:'12%',left:'18%'}}></i><i style={{top:'22%',right:'16%'}}></i><i style={{top:'48%',left:'12%'}}></i><i style={{bottom:'20%',right:'24%'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Chapter One - Text (Right page style) */}
                    <div className="demoPage h-full">
                        <div className="h-full bg-[#fffef8] shadow-inner rounded-md border border-blue-100 flex flex-col relative" style={{ padding: '28px 32px' }}>
                            <div className="prose max-w-none" style={{ fontFamily: 'var(--font-serif)' }}>
                                <p className="text-[15px] leading-7 text-gray-800 dropcap">{storyPages[0].text[0]}</p>
                                <p className="text-[15px] leading-7 text-gray-800 mt-3">{storyPages[0].text[1]}</p>
                            </div>
                            <div className="mt-auto flex justify-between items-center pt-2 border-t border-blue-100">
                                <span className="text-xs text-blue-700/60">Thiri &amp; Phyo</span>
                                <span className="text-xs text-blue-700/60">2</span>
                            </div>
                            <div className="sparkles">
                                <i style={{top:'10%',left:'70%'}}></i><i style={{top:'34%',left:'48%'}}></i><i style={{bottom:'22%',left:'18%'}}></i><i style={{bottom:'16%',right:'18%'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Chapter Two - Title & Image (Left page style) */}
                    <div className="demoPage h-full">
                        <div className="h-full bg-[#fffef8] shadow-inner rounded-md border border-blue-100 flex flex-col relative" style={{ padding: '24px 28px' }}>
                            <header className="mb-3">
                                <p className="text-xs tracking-widest text-blue-700 uppercase">{storyPages[1].chapter}</p>
                                <h2 className="text-2xl text-blue-900" style={{ fontFamily: 'var(--font-serif)' }}>{storyPages[1].title}</h2>
                            </header>
                            <figure className="mt-2 mb-4">
                                <img src={storyPages[1].image} alt={storyPages[1].alt} className="w-full aspect-[3/2] object-cover rounded" />
                                <figcaption className="mt-2 text-xs text-blue-700/70">{storyPages[1].alt}</figcaption>
                            </figure>
                            <div className="mt-auto flex justify-between items-center pt-2 border-t border-blue-100">
                                <span className="text-xs text-blue-700/60">Chapter Two</span>
                                <span className="text-xs text-blue-700/60">3</span>
                            </div>
                            <div className="sparkles">
                                <i style={{top:'8%',left:'24%'}}></i><i style={{top:'28%',right:'16%'}}></i><i style={{top:'52%',left:'10%'}}></i><i style={{bottom:'18%',right:'22%'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Chapter Two - Text (Right page style) */}
                    <div className="demoPage h-full">
                        <div className="h-full bg-[#fffef8] shadow-inner rounded-md border border-blue-100 flex flex-col relative" style={{ padding: '28px 32px' }}>
                            <div className="prose max-w-none" style={{ fontFamily: 'var(--font-serif)' }}>
                                <p className="text-[15px] leading-7 text-gray-800 dropcap">{storyPages[1].text[0]}</p>
                                <p className="text-[15px] leading-7 text-gray-800 mt-3">{storyPages[1].text[1]}</p>
                            </div>
                            <div className="mt-auto flex justify-between items-center pt-2 border-t border-blue-100">
                                <span className="text-xs text-blue-700/60">Thiri &amp; Phyo</span>
                                <span className="text-xs text-blue-700/60">4</span>
                            </div>
                            <div className="sparkles">
                                <i style={{top:'12%',left:'68%'}}></i><i style={{top:'36%',left:'46%'}}></i><i style={{bottom:'20%',left:'16%'}}></i><i style={{bottom:'14%',right:'20%'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Chapter Three - Title & Image (Left page style) */}
                    <div className="demoPage h-full">
                        <div className="h-full bg-[#fffef8] shadow-inner rounded-md border border-blue-100 flex flex-col relative" style={{ padding: '24px 28px' }}>
                            <header className="mb-3">
                                <p className="text-xs tracking-widest text-blue-700 uppercase">{storyPages[2].chapter}</p>
                                <h2 className="text-2xl text-blue-900" style={{ fontFamily: 'var(--font-serif)' }}>{storyPages[2].title}</h2>
                            </header>
                            <figure className="mt-2 mb-4">
                                <img src={storyPages[2].image} alt={storyPages[2].alt} className="w-full aspect-[3/2] object-cover rounded" />
                                <figcaption className="mt-2 text-xs text-blue-700/70">{storyPages[2].alt}</figcaption>
                            </figure>
                            <div className="mt-auto flex justify-between items-center pt-2 border-t border-blue-100">
                                <span className="text-xs text-blue-700/60">Chapter Three</span>
                                <span className="text-xs text-blue-700/60">5</span>
                            </div>
                            <div className="sparkles">
                                <i style={{top:'9%',left:'22%'}}></i><i style={{top:'26%',right:'18%'}}></i><i style={{top:'54%',left:'12%'}}></i><i style={{bottom:'18%',right:'24%'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Chapter Three - Text (Right page style) */}
                    <div className="demoPage h-full">
                        <div className="h-full bg-[#fffef8] shadow-inner rounded-md border border-blue-100 flex flex-col relative" style={{ padding: '28px 32px' }}>
                            <div className="prose max-w-none" style={{ fontFamily: 'var(--font-serif)' }}>
                                <p className="text-[15px] leading-7 text-gray-800 dropcap">{storyPages[2].text[0]}</p>
                                <p className="text-[15px] leading-7 text-gray-800 mt-3">{storyPages[2].text[1]}</p>
                            </div>
                            <div className="mt-auto flex justify-between items-center pt-2 border-t border-blue-100">
                                <span className="text-xs text-blue-700/60">Thiri &amp; Phyo</span>
                                <span className="text-xs text-blue-700/60">6</span>
                            </div>
                            <div className="sparkles">
                                <i style={{top:'8%',left:'66%'}}></i><i style={{top:'32%',left:'44%'}}></i><i style={{bottom:'22%',left:'14%'}}></i><i style={{bottom:'12%',right:'22%'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Back Cover */}
                    <div className="demoPage h-full">
                        <div className="magical-cover rounded-md">
                            <span className="cover-ornament tl" />
                            <span className="cover-ornament tr" />
                            <span className="cover-ornament bl" />
                            <span className="cover-ornament br" />
                            <div className="text-center px-6 opacity-90">
                                <div className="mt-3 text-[12px]">Thank you for being part of our story</div>
                            </div>
                        </div>
                    </div>
                </HTMLFlipBook>
            </div>
        </div>
    );
}

// Mobile-only photo cards version of the story
function MobileStoryCards() {
  return (
    <div className="w-full px-3 space-y-6">
      {/* Swipeable photo gallery (no text) */}
      <div className="block md:hidden">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-3 px-3">
          {storyPages.map((page, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-72 rounded-xl border border-blue-100 bg-white shadow-sm overflow-hidden"
            >
              <img src={page.image} alt={page.alt} className="w-full h-44 object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Vertical timeline for deeper read */}
      <ol className="space-y-4">
        {storyPages.map((page, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <img
              src={page.image}
              alt={page.alt}
              className="w-20 h-20 rounded-md object-cover border border-blue-100"
            />
            <div className="flex-1">
              <p className="text-[10px] tracking-widest text-blue-700 uppercase">{page.chapter}</p>
              <h4 className="text-base text-blue-900" style={{ fontFamily: 'var(--font-serif)' }}>{page.title}</h4>
              <p className="text-[12px] leading-5 text-gray-800 mt-1" style={{ fontFamily: 'var(--font-serif)' }}>{page.text[0]}</p>
              <p className="text-[12px] leading-5 text-gray-800 mt-1" style={{ fontFamily: 'var(--font-serif)' }}>{page.text[1]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function OurStory() {
  return (
    <section id="our-story" className="py-16 sm:py-20 md:py-28 px-0 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-4 sm:mb-6 tracking-wide px-2" style={{ fontFamily: 'var(--font-serif)' }}>
          Our Story
        </h2>
        <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
        {/* Desktop flipbook (md and up) */}
        <div className="hidden md:block w-full">
          <MyBook />
        </div>
        {/* Mobile layout (below md): compact carousel + timeline */}
        <div className="block md:hidden w-full">
          <MobileStoryCards />
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

// ─── Story data (also used by mobile carousel) ────────────────────────────────
const chapters = [
  {
    chapter: "Chapter One",
    title: "How We Met",
    date: "April 2020",
    mainPhoto: "/images/chapter1.jpg",
    sidePhoto: "/images/PT-20.jpg",
    mainCaption: "The beginning of us 💛",
    sideCaption: "Our first adventures",
    story:
      "It started with friendship — and a little courage. Waiting outside the classroom with a bouquet of flowers, heart hammering, hoping she'd say yes. She did. April 2020 became the start of something neither of us expected, something that felt like it had always been inevitable.",
    story2:
      "Looking back, it's funny how ordinary the day seemed — and how quietly extraordinary it turned out to be.",
  },
  {
    chapter: "Chapter Two",
    title: "Falling in Love",
    date: "2020 – 2024",
    mainPhoto: "/images/chapter2.jpg",
    sidePhoto: "/images/PT-38.jpg",
    extraPhoto: "/images/PT-59.jpg",
    mainCaption: "Every adventure, together",
    sideCaption: "And then there was Momo 🐾",
    extraCaption: "Making memories",
    story:
      "Four years of milestones, road trips, lazy Sundays, and inside jokes that no one else could ever understand. We welcomed Momo — our sweet, chaotic little pup — who instantly became the third and most important member of the family.",
    story2:
      "We discovered that love isn't one grand moment. It's the thousand small ones: cooking dinner together, cheering each other on, finding home in another person.",
  },
  {
    chapter: "Chapter Three",
    title: "The Proposal",
    date: "November 2024",
    mainPhoto: "/images/chapter3.jpg",
    sidePhoto: "/images/PT-63.jpg",
    extraPhoto: "/images/DSC02219.jpg",
    mainCaption: "She said yes ✨",
    sideCaption: "November 2024",
    extraCaption: "Now forever begins",
    story:
      "November 2024. After years of building a life together — a home, a dog, a thousand shared memories — Phyo got down on one knee. The answer was never in doubt, but hearing it still felt like the whole world pausing for one perfect breath.",
    story2:
      "And now, on May 2nd, 2026, we get to do the best thing imaginable: celebrate it all with every person we love.",
  },
];

// All photos in order for the mobile carousel
const allPhotos = [
  { src: "/images/DSC02363.jpg",  caption: "Thiri & Phyo" },
  { src: "/images/chapter1.jpg",  caption: "How We Met — April 2020" },
  { src: "/images/chapter2.jpg",  caption: "Falling in Love" },
  { src: "/images/PT-38.jpg",     caption: "A night out together 🍽️" },
  { src: "/images/PT-59.jpg",     caption: "Making memories" },
  { src: "/images/chapter3.jpg",  caption: "The Proposal" },
  { src: "/images/PT-63.jpg",     caption: "" },
  { src: "/images/DSC02219.jpg",  caption: "Now forever begins" },
  { src: "/images/PT-20.jpg",     caption: "" },
];

// ─── Shared style constants ────────────────────────────────────────────────────
const PAPER    = "#faf5eb";
const BORDER   = "#ddd0b3";
const BROWN    = "#3b2410";
const GOLD     = "#c9a96e";
const TEXTDARK = "#2e1f10";
const TEXTMID  = "#7a5c3a";
const STAMP    = "#8b6635";

// Inline SVG tape strip (yellow translucent)
const tapeStyle = (rotate: number, top: string, left: string): React.CSSProperties => ({
  position: "absolute",
  width: 54,
  height: 17,
  background: "rgba(255,238,140,0.72)",
  border: "1px solid rgba(200,175,60,0.4)",
  borderRadius: 2,
  transform: `rotate(${rotate}deg)`,
  top,
  left,
  zIndex: 10,
});

// Corner mount (one of 4 corners)
const cornerStyle = (pos: { top?: string; bottom?: string; left?: string; right?: string }, borders: string[]): React.CSSProperties => ({
  position: "absolute",
  width: 14,
  height: 14,
  borderTop: borders.includes("t") ? `2px solid ${BROWN}` : undefined,
  borderBottom: borders.includes("b") ? `2px solid ${BROWN}` : undefined,
  borderLeft: borders.includes("l") ? `2px solid ${BROWN}` : undefined,
  borderRight: borders.includes("r") ? `2px solid ${BROWN}` : undefined,
  ...pos,
});

// Ruled-lines background (very faint)
const ruledBg: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity: 0.045,
  backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 22px,#5a3e28 22px,#5a3e28 23px)",
};

// ─── Desktop flipbook ─────────────────────────────────────────────────────────
function MyBook() {
  const bookRef = useRef<any>(null);
  const [meta, setMeta] = useState({ isFirst: true, isLast: false, orientation: "portrait" as "portrait" | "landscape" });
  // `revealing` is true from the first user interaction until the clip has fully
  // transitioned away, preventing the cover from blinking out mid-animation.
  const [revealing, setRevealing] = useState(false);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncMeta = () => {
    const inst = bookRef.current?.pageFlip?.();
    if (!inst) return;
    const cur   = inst.getCurrentPageIndex?.() ?? 0;
    const total = inst.getPageCount?.() ?? 1;
    setMeta({ isFirst: cur === 0, isLast: total > 0 && cur === total - 1, orientation: inst.getOrientation?.() ?? "portrait" });
  };

  useEffect(() => { const t = setTimeout(syncMeta, 0); return () => clearTimeout(t); }, []);

  // Fires as soon as the user starts folding a corner — the earliest possible moment.
  const handleStateChange = (e: any) => {
    const state: string = e?.data ?? e ?? "";
    if (state === "user_fold" || state === "fold_corner" || state === "flipping") {
      // Start revealing immediately so the clip is gone before the page lifts
      if (revealTimer.current) clearTimeout(revealTimer.current);
      setRevealing(true);
    } else if (state === "read") {
      // Flip finished — sync the page index first, then fade out the override
      // after the CSS transition has had time to complete (350 ms).
      syncMeta();
      revealTimer.current = setTimeout(() => setRevealing(false), 400);
    }
  };

  const handleFlip = () => { /* syncMeta is handled by onChangeState→"read" */ };

  const vpClass = ["book-viewport",
    meta.orientation === "landscape" ? "landscape" : "portrait",
    meta.isFirst  ? "closed-start" : "",
    meta.isLast   ? "closed-end"   : "",
    revealing     ? "revealing"    : "",
  ].filter(Boolean).join(" ");

  return (
    <div className="w-full flex justify-center select-none">
      <style>{`
        .book-viewport{position:relative;width:fit-content}
        .book-viewport .my-flipbook{transition:clip-path .35s ease,transform .35s ease;will-change:clip-path,transform}

        /* Cover closed: show only the right half (where the front cover lives) */
        .book-viewport.landscape.closed-start .my-flipbook{clip-path:inset(0 0 0 50%);transform:translateX(-25%)}
        /* Revealing: interpolate to fully open — inset(0 0 0 0%) is smoothly animatable */
        .book-viewport.landscape.closed-start.revealing .my-flipbook{clip-path:inset(0 0 0 0%);transform:translateX(0)}

        /* Back cover closed */
        .book-viewport.landscape.closed-end .my-flipbook{clip-path:inset(0 50% 0 0);transform:translateX(25%)}
        .book-viewport.landscape.closed-end.revealing .my-flipbook{clip-path:inset(0 0% 0 0);transform:translateX(0)}

        .demoPage{background:${PAPER}}
      `}</style>

      <div className={vpClass}>
        <HTMLFlipBook
          ref={bookRef}
          onFlip={handleFlip}
          onChangeState={handleStateChange}
          onChangeOrientation={syncMeta}
          onInit={syncMeta}
          width={340} height={510}
          minWidth={200} maxWidth={480}
          minHeight={300} maxHeight={680}
          className="my-flipbook shadow-2xl"
          style={{ margin: "0 auto" }}
          size="fixed"
          startPage={0}
          drawShadow
          flippingTime={1000}
          usePortrait={false}
          startZIndex={0}
          autoSize
          clickEventForward={false}
          useMouseEvents
          swipeDistance={30}
          showCover
          mobileScrollSupport
          maxShadowOpacity={0.55}
          showPageCorners
          disableFlipByClick={false}
        >

          {/* ══ PAGE 0 — FRONT COVER ══════════════════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflow:"hidden",
              background:"linear-gradient(155deg,#3b2410 0%,#5c3720 45%,#3b2410 100%)" }}>
              {/* Leather grain */}
              <div style={{ position:"absolute", inset:0, opacity:.09,
                backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.18) 2px,rgba(0,0,0,.18) 4px),
                  repeating-linear-gradient(90deg,transparent,transparent 7px,rgba(0,0,0,.06) 7px,rgba(0,0,0,.06) 9px)` }} />
              {/* Border frames */}
              <div style={{ position:"absolute", inset:10, border:`1px solid rgba(201,169,110,.45)`, borderRadius:3, pointerEvents:"none" }} />
              <div style={{ position:"absolute", inset:16, border:`1px solid rgba(201,169,110,.2)`,  borderRadius:3, pointerEvents:"none" }} />

              {/* Cover photo */}
              <div style={{ position:"relative", zIndex:1, marginBottom:16,
                padding:"7px 7px 22px 7px", background:"#fff",
                boxShadow:"0 5px 22px rgba(0,0,0,.5)", transform:"rotate(-1.5deg)" }}>
                <img src="/images/DSC02363.jpg" alt="Thiri & Phyo"
                  style={{ width:155, height:115, objectFit:"cover", display:"block" }} />
                <p style={{ fontFamily:"var(--font-serif)", fontSize:9.5, color:STAMP,
                  textAlign:"center", marginTop:5, fontStyle:"italic" }}>Thiri &amp; Phyo</p>
              </div>

              {/* Title block */}
              <div style={{ textAlign:"center", zIndex:1, padding:"0 24px" }}>
                <p style={{ color:GOLD, fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", marginBottom:6, opacity:.9 }}>
                  A Love Story
                </p>
                <h1 style={{ fontFamily:"var(--font-serif)", fontSize:30, letterSpacing:".04em", lineHeight:1.15,
                  background:`linear-gradient(180deg,#f5e6c8,${GOLD} 55%,#8b6635)`,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  Our Story
                </h1>
                <div style={{ width:56, height:1, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, margin:"10px auto" }} />
                <p style={{ fontFamily:"var(--font-serif)", color:GOLD, fontSize:12 }}>Thiri &amp; Phyo</p>
                <p style={{ color:"rgba(201,169,110,.6)", fontSize:9.5, marginTop:4 }}>May 2, 2026</p>
              </div>
              <div style={{ position:"absolute", bottom:24, color:GOLD, fontSize:17, opacity:.6, zIndex:1 }}>✦</div>
            </div>
          </div>

          {/* ══ PAGE 1 — CHAPTER ONE : PHOTOS ════════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", background:PAPER, border:`1px solid ${BORDER}`,
              display:"flex", flexDirection:"column", padding:"16px 15px 12px", overflow:"hidden" }}>
              <div style={ruledBg} />

              {/* Chapter header */}
              <div style={{ marginBottom:8, position:"relative", zIndex:1 }}>
                <p style={{ fontSize:8.5, color:STAMP, letterSpacing:".22em", textTransform:"uppercase", fontFamily:"var(--font-serif)" }}>
                  {chapters[0].chapter}
                </p>
                <h2 style={{ fontFamily:"var(--font-serif)", fontSize:17, color:BROWN, lineHeight:1.2 }}>{chapters[0].title}</h2>
                <span style={{ display:"inline-block", border:`1.5px solid ${STAMP}`, borderRadius:2,
                  padding:"1px 6px", fontSize:7.5, color:STAMP, fontFamily:"var(--font-serif)",
                  letterSpacing:".1em", transform:"rotate(-1deg)", transformOrigin:"left center", marginTop:2 }}>
                  {chapters[0].date}
                </span>
              </div>

              {/* Main photo with tape + corner mounts */}
              <div style={{ position:"relative", zIndex:1, flex:"1 1 auto", minHeight:0, marginBottom:6 }}>
                <div style={tapeStyle(-3, "-7px", "calc(50% - 27px)")} />
                <div style={{ position:"relative", display:"inline-block", width:"100%", height:"100%" }}>
                  <span style={cornerStyle({ top:0, left:0 }, ["t","l"])} />
                  <span style={cornerStyle({ top:0, right:0 }, ["t","r"])} />
                  <span style={cornerStyle({ bottom:0, left:0 }, ["b","l"])} />
                  <span style={cornerStyle({ bottom:0, right:0 }, ["b","r"])} />
                  <img src={chapters[0].mainPhoto} alt={chapters[0].mainCaption}
                    style={{ width:"100%", height:210, objectFit:"cover", display:"block", transform:"rotate(-.5deg)", background:"#e0d5c0" }} />
                </div>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:8.5, color:TEXTMID, fontStyle:"italic", textAlign:"center", marginTop:4 }}>
                  {chapters[0].mainCaption}
                </p>
              </div>

              {/* Footer */}
              <div style={{ marginTop:6, borderTop:`1px solid ${BORDER}`, paddingTop:4,
                display:"flex", justifyContent:"space-between", position:"relative", zIndex:1 }}>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>Chapter One</span>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>1</span>
              </div>
            </div>
          </div>

          {/* ══ PAGE 2 — CHAPTER ONE : STORY ═════════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", background:PAPER, border:`1px solid ${BORDER}`,
              display:"flex", flexDirection:"column", padding:"22px 22px 14px 26px", overflow:"hidden" }}>
              <div style={ruledBg} />
              {/* Left margin rule */}
              <div style={{ position:"absolute", top:0, bottom:0, left:18, width:1, background:GOLD, opacity:.2 }} />

              <div style={{ flex:1, zIndex:1, display:"flex", flexDirection:"column", gap:14 }}>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:13, lineHeight:1.85, color:TEXTDARK }}>
                  <span style={{ float:"left", fontSize:"2.6em", lineHeight:1, paddingRight:".3rem", color:STAMP, fontFamily:"var(--font-serif)", fontWeight:"bold" }}>
                    {chapters[0].story.charAt(0)}
                  </span>
                  {chapters[0].story.slice(1)}
                </p>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:13, lineHeight:1.85, color:TEXTDARK, fontStyle:"italic" }}>
                  {chapters[0].story2}
                </p>
              </div>

              <div style={{ textAlign:"center", zIndex:1, margin:"12px 0 6px" }}>
                <span style={{ color:GOLD, fontSize:13, letterSpacing:".4em", opacity:.55 }}>· · · ✦ · · ·</span>
              </div>
              <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:4, display:"flex", justifyContent:"space-between", zIndex:1 }}>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>Thiri &amp; Phyo</span>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>2</span>
              </div>
            </div>
          </div>

          {/* ══ PAGE 3 — CHAPTER TWO : PHOTOS ════════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", background:PAPER, border:`1px solid ${BORDER}`,
              display:"flex", flexDirection:"column", padding:"16px 15px 12px", overflow:"hidden" }}>
              <div style={ruledBg} />

              <div style={{ marginBottom:8, position:"relative", zIndex:1 }}>
                <p style={{ fontSize:8.5, color:STAMP, letterSpacing:".22em", textTransform:"uppercase", fontFamily:"var(--font-serif)" }}>
                  {chapters[1].chapter}
                </p>
                <h2 style={{ fontFamily:"var(--font-serif)", fontSize:17, color:BROWN, lineHeight:1.2 }}>{chapters[1].title}</h2>
                <span style={{ display:"inline-block", border:`1.5px solid ${STAMP}`, borderRadius:2,
                  padding:"1px 6px", fontSize:7.5, color:STAMP, fontFamily:"var(--font-serif)",
                  letterSpacing:".1em", transform:"rotate(-1deg)", transformOrigin:"left center", marginTop:2 }}>
                  {chapters[1].date}
                </span>
              </div>

              {/* Main photo */}
              <div style={{ position:"relative", zIndex:1, flex:"1 1 auto", minHeight:0, marginBottom:6 }}>
                <div style={tapeStyle(-4, "-7px", "calc(50% - 27px)")} />
                <div style={{ position:"relative", display:"inline-block", width:"100%", height:"100%" }}>
                  <span style={cornerStyle({ top:0, left:0 }, ["t","l"])} />
                  <span style={cornerStyle({ top:0, right:0 }, ["t","r"])} />
                  <span style={cornerStyle({ bottom:0, left:0 }, ["b","l"])} />
                  <span style={cornerStyle({ bottom:0, right:0 }, ["b","r"])} />
                  <img src={chapters[1].mainPhoto} alt={chapters[1].mainCaption}
                    style={{ width:"100%", height:210, objectFit:"cover", display:"block", transform:"rotate(.5deg)", background:"#e0d5c0" }} />
                </div>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:8.5, color:TEXTMID, fontStyle:"italic", textAlign:"center", marginTop:4 }}>
                  {chapters[1].mainCaption}
                </p>
              </div>

              <div style={{ marginTop:6, borderTop:`1px solid ${BORDER}`, paddingTop:4,
                display:"flex", justifyContent:"space-between", position:"relative", zIndex:1 }}>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>Chapter Two</span>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>3</span>
              </div>
            </div>
          </div>

          {/* ══ PAGE 4 — CHAPTER TWO : STORY ═════════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", background:PAPER, border:`1px solid ${BORDER}`,
              display:"flex", flexDirection:"column", padding:"22px 22px 14px 26px", overflow:"hidden" }}>
              <div style={ruledBg} />
              <div style={{ position:"absolute", top:0, bottom:0, left:18, width:1, background:GOLD, opacity:.2 }} />

              <div style={{ flex:1, zIndex:1, display:"flex", flexDirection:"column", gap:14 }}>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:13, lineHeight:1.85, color:TEXTDARK }}>
                  <span style={{ float:"left", fontSize:"2.6em", lineHeight:1, paddingRight:".3rem", color:STAMP, fontFamily:"var(--font-serif)", fontWeight:"bold" }}>
                    {chapters[1].story.charAt(0)}
                  </span>
                  {chapters[1].story.slice(1)}
                </p>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:13, lineHeight:1.85, color:TEXTDARK, fontStyle:"italic" }}>
                  {chapters[1].story2}
                </p>
              </div>

              <div style={{ textAlign:"center", zIndex:1, margin:"12px 0 6px" }}>
                <span style={{ color:GOLD, fontSize:13, letterSpacing:".4em", opacity:.55 }}>· · · ✦ · · ·</span>
              </div>
              <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:4, display:"flex", justifyContent:"space-between", zIndex:1 }}>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>Thiri &amp; Phyo</span>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>4</span>
              </div>
            </div>
          </div>

          {/* ══ PAGE 5 — CHAPTER THREE : PHOTOS ══════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", background:PAPER, border:`1px solid ${BORDER}`,
              display:"flex", flexDirection:"column", padding:"16px 15px 12px", overflow:"hidden" }}>
              <div style={ruledBg} />

              <div style={{ marginBottom:8, position:"relative", zIndex:1 }}>
                <p style={{ fontSize:8.5, color:STAMP, letterSpacing:".22em", textTransform:"uppercase", fontFamily:"var(--font-serif)" }}>
                  {chapters[2].chapter}
                </p>
                <h2 style={{ fontFamily:"var(--font-serif)", fontSize:17, color:BROWN, lineHeight:1.2 }}>{chapters[2].title}</h2>
                <span style={{ display:"inline-block", border:`1.5px solid ${STAMP}`, borderRadius:2,
                  padding:"1px 6px", fontSize:7.5, color:STAMP, fontFamily:"var(--font-serif)",
                  letterSpacing:".1em", transform:"rotate(-1deg)", transformOrigin:"left center", marginTop:2 }}>
                  {chapters[2].date}
                </span>
              </div>

              {/* Main photo */}
              <div style={{ position:"relative", zIndex:1, marginBottom:6 }}>
                <div style={tapeStyle(-3, "-7px", "calc(50% - 27px)")} />
                <div style={{ position:"relative", display:"inline-block", width:"100%" }}>
                  <span style={cornerStyle({ top:0, left:0 }, ["t","l"])} />
                  <span style={cornerStyle({ top:0, right:0 }, ["t","r"])} />
                  <span style={cornerStyle({ bottom:0, left:0 }, ["b","l"])} />
                  <span style={cornerStyle({ bottom:0, right:0 }, ["b","r"])} />
                  <img src={chapters[2].mainPhoto} alt={chapters[2].mainCaption}
                    style={{ width:"100%", height:145, objectFit:"cover", display:"block", transform:"rotate(-.5deg)", background:"#e0d5c0" }} />
                </div>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:8.5, color:TEXTMID, fontStyle:"italic", textAlign:"center", marginTop:4 }}>
                  {chapters[2].mainCaption}
                </p>
              </div>

              {/* Two small photos */}
              <div style={{ display:"flex", gap:8, zIndex:1 }}>
                <div style={{ flex:1, position:"relative" }}>
                  <div style={tapeStyle(2, "-7px", "calc(50% - 27px)")} />
                  <div style={{ position:"relative" }}>
                    <span style={cornerStyle({ top:0, left:0 }, ["t","l"])} />
                    <span style={cornerStyle({ top:0, right:0 }, ["t","r"])} />
                    <span style={cornerStyle({ bottom:0, left:0 }, ["b","l"])} />
                    <span style={cornerStyle({ bottom:0, right:0 }, ["b","r"])} />
                    <img src={chapters[2].sidePhoto} alt={chapters[2].sideCaption}
                      style={{ width:"100%", height:75, objectFit:"cover", display:"block", transform:"rotate(1.5deg)", background:"#e0d5c0" }} />
                  </div>
                  <p style={{ fontFamily:"var(--font-serif)", fontSize:7.5, color:TEXTMID, fontStyle:"italic", textAlign:"center", marginTop:3 }}>
                    {chapters[2].sideCaption}
                  </p>
                </div>
                <div style={{ flex:1, position:"relative" }}>
                  <div style={tapeStyle(-3, "-7px", "calc(50% - 27px)")} />
                  <div style={{ position:"relative" }}>
                    <span style={cornerStyle({ top:0, left:0 }, ["t","l"])} />
                    <span style={cornerStyle({ top:0, right:0 }, ["t","r"])} />
                    <span style={cornerStyle({ bottom:0, left:0 }, ["b","l"])} />
                    <span style={cornerStyle({ bottom:0, right:0 }, ["b","r"])} />
                    <img src={chapters[2].extraPhoto} alt={chapters[2].extraCaption}
                      style={{ width:"100%", height:75, objectFit:"cover", display:"block", transform:"rotate(-2deg)", background:"#e0d5c0" }} />
                  </div>
                  <p style={{ fontFamily:"var(--font-serif)", fontSize:7.5, color:TEXTMID, fontStyle:"italic", textAlign:"center", marginTop:3 }}>
                    {chapters[2].extraCaption}
                  </p>
                </div>
              </div>

              <div style={{ marginTop:6, borderTop:`1px solid ${BORDER}`, paddingTop:4,
                display:"flex", justifyContent:"space-between", position:"relative", zIndex:1 }}>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>Chapter Three</span>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>5</span>
              </div>
            </div>
          </div>

          {/* ══ PAGE 6 — CHAPTER THREE : STORY ═══════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", background:PAPER, border:`1px solid ${BORDER}`,
              display:"flex", flexDirection:"column", padding:"22px 22px 14px 26px", overflow:"hidden" }}>
              <div style={ruledBg} />
              <div style={{ position:"absolute", top:0, bottom:0, left:18, width:1, background:GOLD, opacity:.2 }} />

              <div style={{ flex:1, zIndex:1, display:"flex", flexDirection:"column", gap:14 }}>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:13, lineHeight:1.85, color:TEXTDARK }}>
                  <span style={{ float:"left", fontSize:"2.6em", lineHeight:1, paddingRight:".3rem", color:STAMP, fontFamily:"var(--font-serif)", fontWeight:"bold" }}>
                    {chapters[2].story.charAt(0)}
                  </span>
                  {chapters[2].story.slice(1)}
                </p>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:13, lineHeight:1.85, color:TEXTDARK, fontStyle:"italic" }}>
                  {chapters[2].story2}
                </p>
              </div>

              <div style={{ textAlign:"center", zIndex:1, margin:"12px 0 6px" }}>
                <span style={{ color:GOLD, fontSize:13, letterSpacing:".4em", opacity:.55 }}>· · · ✦ · · ·</span>
              </div>
              <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:4, display:"flex", justifyContent:"space-between", zIndex:1 }}>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>Thiri &amp; Phyo</span>
                <span style={{ fontSize:7.5, color:"#a08060", fontFamily:"var(--font-serif)" }}>6</span>
              </div>
            </div>
          </div>

          {/* ══ PAGE 7 — BACK COVER ═══════════════════════════════════════════ */}
          <div className="demoPage h-full">
            <div style={{ position:"relative", height:"100%", display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", overflow:"hidden",
              background:"linear-gradient(155deg,#3b2410 0%,#5c3720 45%,#3b2410 100%)" }}>
              <div style={{ position:"absolute", inset:0, opacity:.09,
                backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.18) 2px,rgba(0,0,0,.18) 4px)" }} />
              <div style={{ position:"absolute", inset:10, border:"1px solid rgba(201,169,110,.4)", borderRadius:3, pointerEvents:"none" }} />

              {/* Closing photo */}
              <div style={{ position:"relative", zIndex:1, marginBottom:20,
                padding:"6px 6px 20px 6px", background:"#fff",
                boxShadow:"0 4px 18px rgba(0,0,0,.45)", transform:"rotate(1.5deg)" }}>
                <img src="/images/PT-20.jpg" alt="Together always"
                  style={{ width:140, height:105, objectFit:"cover", display:"block" }} />
                <p style={{ fontFamily:"var(--font-serif)", fontSize:9, color:STAMP,
                  textAlign:"center", marginTop:5, fontStyle:"italic" }}>Together, always</p>
              </div>

              <div style={{ textAlign:"center", zIndex:1, padding:"0 24px" }}>
                <p style={{ fontFamily:"var(--font-serif)", color:GOLD, fontSize:11, fontStyle:"italic", lineHeight:1.7 }}>
                  "Thank you for being<br />part of our story."
                </p>
                <div style={{ width:36, height:1, background:GOLD, margin:"10px auto", opacity:.5 }} />
                <p style={{ color:"rgba(201,169,110,.55)", fontSize:9, letterSpacing:".22em" }}>MAY 2, 2026</p>
              </div>
            </div>
          </div>

        </HTMLFlipBook>
      </div>

    </div>
  );
}

// ─── Mobile photo carousel ─────────────────────────────────────────────────────
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const total = allPhotos.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // touch swipe
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchStart.current = null;
  };

  return (
    <div className="w-full px-4 max-w-sm mx-auto">
      {/* Photo frame */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position:"relative", background:"#fff",
          padding:"10px 10px 36px 10px",
          boxShadow:"0 8px 32px rgba(0,0,0,0.2)",
          transform:"rotate(-0.5deg)",
          borderRadius:2 }}
      >
        <img
          key={current}
          src={allPhotos[current].src}
          alt={allPhotos[current].caption}
          style={{ width:"100%", height:280, objectFit:"cover", display:"block", background:"#e0d5c0" }}
        />
        {/* Polaroid caption area */}
        <p style={{ fontFamily:"var(--font-serif)", fontSize:13, color:STAMP,
          textAlign:"center", marginTop:6, fontStyle:"italic", minHeight:20 }}>
          {allPhotos[current].caption}
        </p>

        {/* Tape on top */}
        <div style={{ position:"absolute", top:-9, left:"50%", transform:"translateX(-50%) rotate(-2deg)",
          width:60, height:20, background:"rgba(255,238,140,0.75)",
          border:"1px solid rgba(200,175,60,0.4)", borderRadius:2 }} />
      </div>

      {/* Navigation arrows */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:20 }}>
        <button onClick={prev}
          style={{ width:40, height:40, borderRadius:"50%", border:`1.5px solid ${BORDER}`,
            background:PAPER, color:STAMP, fontSize:18, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 2px 6px rgba(0,0,0,0.1)" }}>
          ‹
        </button>

        {/* Dot indicators */}
        <div style={{ display:"flex", gap:6 }}>
          {allPhotos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? 18 : 7, height:7, borderRadius:4,
                background: i === current ? STAMP : BORDER,
                border:"none", padding:0, cursor:"pointer",
                transition:"all 0.25s ease" }} />
          ))}
        </div>

        <button onClick={next}
          style={{ width:40, height:40, borderRadius:"50%", border:`1.5px solid ${BORDER}`,
            background:PAPER, color:STAMP, fontSize:18, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 2px 6px rgba(0,0,0,0.1)" }}>
          ›
        </button>
      </div>

      {/* Counter */}
      <p style={{ textAlign:"center", marginTop:10, fontSize:11, color:"#a08060",
        fontFamily:"var(--font-serif)", fontStyle:"italic" }}>
        {current + 1} / {total}
      </p>
    </div>
  );
}

// ─── Section export ────────────────────────────────────────────────────────────
export function OurStory() {
  return (
    <section id="our-story" className="relative overflow-hidden py-16 sm:py-20 md:py-28 px-0"
      style={{ background: "linear-gradient(to bottom, #fff4f6 0%, rgba(250,245,235,0.6) 50%, #ffffff 100%)" }}>
      {/* Sakura branch decorations */}
      <img src="/images/sakura1-Picsart-BackgroundRemover.jpg" alt="" aria-hidden="true"
        style={{ position:"absolute", top:0, right:0, width:"18rem", maxWidth:"35vw", opacity:0.22, pointerEvents:"none", userSelect:"none" }} />
      <img src="/images/sakura_bottom2.jpg" alt="" aria-hidden="true"
        style={{ position:"absolute", bottom:0, left:0, width:"16rem", maxWidth:"30vw", opacity:0.15, pointerEvents:"none", userSelect:"none" }} />

      <div className="flex flex-col items-center relative">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-4 sm:mb-6 tracking-wide px-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Our Story
        </h2>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          <span style={{ fontSize:"1.1rem" }}>🌸</span>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        </div>

        {/* Desktop: flipbook */}
        <div className="hidden md:block w-full">
          <MyBook />
        </div>

        {/* Mobile: photo carousel */}
        <div className="block md:hidden w-full pb-4">
          <MobileCarousel />
        </div>
      </div>
    </section>
  );
}

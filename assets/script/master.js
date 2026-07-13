 /* ===== Accordion ===== */
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');

      header.addEventListener('click', () => {
        const open = item.classList.contains('active');

        items.forEach(other => {
          other.classList.remove('active');
          other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          other.querySelector('.accordion-body').style.maxHeight = '0';
        });

        if (!open) {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });

      header.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });

    /* ===== Cursor Glow ===== */
    const glow = document.getElementById('cursorGlow');
    let mx = 0, my = 0, gx = 0, gy = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function loop() {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.left = gx + 'px';
      glow.style.top  = gy + 'px';
      requestAnimationFrame(loop);
    })();

    const revealEls = document.querySelectorAll(
      '.footer-brand, .footer-col, .footer-bottom'
    );
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition =
        `all 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`;
      obs.observe(el);
    });


    window.addEventListener('resize', () => {
      items.forEach(item => {
        if (item.classList.contains('active')) {
          item.querySelector('.accordion-body').style.maxHeight =
            item.querySelector('.accordion-body').scrollHeight + 'px';
        }
      });
    });
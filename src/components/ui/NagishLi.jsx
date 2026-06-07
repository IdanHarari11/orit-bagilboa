'use client';

import { useEffect } from 'react';

const NAGISHLI_SCRIPT_ID = 'nagishli-script';
const LOAD_DELAY_MS = 3500;

function dedupeNagishLi() {
  const tags = document.querySelectorAll('nagishli#NagishLiTag, #NagishLiTag');
  tags.forEach((tag, index) => {
    if (index > 0) tag.remove();
  });
}

function positionNagishLiBar() {
  dedupeNagishLi();

  const bar = document.querySelector('#NagishLiBar');
  if (!bar) return;

  bar.style.position = 'fixed';
  bar.style.bottom = '20px';
  bar.style.right = '20px';
  bar.style.left = 'auto';
  bar.style.zIndex = '9999';
  bar.style.top = 'auto';
}

function loadNagishLiScript() {
  if (typeof window === 'undefined') return;
  if (document.querySelector('#NagishLiBar')) {
    positionNagishLiBar();
    return;
  }
  if (document.getElementById(NAGISHLI_SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = NAGISHLI_SCRIPT_ID;
  script.src = '/js/nagishli.js';
  script.async = true;
  document.body.appendChild(script);
  script.onload = () => {
    setTimeout(positionNagishLiBar, 50);
  };
}

function scheduleNagishLiLoad() {
  const load = () => loadNagishLiScript();

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load, { timeout: LOAD_DELAY_MS });
    return;
  }

  window.setTimeout(load, LOAD_DELAY_MS);
}

export default function NagishLi() {
  useEffect(() => {
    scheduleNagishLiLoad();

    const loadOnInteraction = () => {
      loadNagishLiScript();
      window.removeEventListener('pointerdown', loadOnInteraction);
      window.removeEventListener('keydown', loadOnInteraction);
      window.removeEventListener('scroll', loadOnInteraction);
    };

    window.addEventListener('pointerdown', loadOnInteraction, { passive: true });
    window.addEventListener('keydown', loadOnInteraction);
    window.addEventListener('scroll', loadOnInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', loadOnInteraction);
      window.removeEventListener('keydown', loadOnInteraction);
      window.removeEventListener('scroll', loadOnInteraction);
    };
  }, []);

  return null;
}

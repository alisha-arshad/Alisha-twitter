// ══════════════════════════════════════════
//  AWAZ — script.js
// ══════════════════════════════════════════

// ── DATA ──
const ME = {
  name: 'Waqas Arshad',
  handle: '@waqas_arshad',
  init: 'WA',
  grad: 'linear-gradient(135deg,#f5c842,#ff8c00)'
};

const USERS = {
  waqas:    { name:'Waqas Arshad',   handle:'@waqas_arshad',   init:'WA', grad:'linear-gradient(135deg,#f5c842,#ff8c00)',   v:true  },
  ayan:     { name:'Ayan Raza',       handle:'@ayan_raza',       init:'AY', grad:'linear-gradient(135deg,#ec4899,#a855f7)',   v:false },
  aliza:    { name:'Aliza Khan',      handle:'@aliza_khan',      init:'AL', grad:'linear-gradient(135deg,#22d3a5,#3b82f6)',   v:true  },
  laiba:    { name:'Laiba Mirza',     handle:'@laiba_mirza',     init:'LA', grad:'linear-gradient(135deg,#f97316,#ef4444)',   v:false },
  hussnain: { name:'Hussnain Butt',   handle:'@hussnain_butt',   init:'HU', grad:'linear-gradient(135deg,#a78bfa,#ec4899)',   v:true  },
  arshad:   { name:'Arshad Mehmood',  handle:'@arshad_official', init:'AM', grad:'linear-gradient(135deg,#34d399,#059669)',   v:false },
};

let tweets = [
  {
    id: 1, user: 'hussnain', time: '1m',
    text: 'Yaar Pakistan mein AI ki revolution aa gayi hai! 🔥 Agar abhi nahi seekha to pachtaoge. #AIRevolution #Pakistan 🇵🇰',
    likes: 312, cmt: 54, rt: 88, liked: false, rted: false, type: 'text'
  },
  {
    id: 2, user: 'aliza', time: '5m',
    text: 'Lahore ki thandi raat, chai ki pyaali aur yeh zabardast manzar... Life is good 🌙✨ @ayan_raza tu bhi aa jata yaar!',
    likes: 589, cmt: 103, rt: 245, liked: false, rted: false, type: 'text'
  },
  {
    id: 3, user: 'ayan', time: '12m',
    text: 'New track drop kar raha hun agle hafte! 🎵🎶 Guess karo kaunsa genre hai?\n\n#Music #PakistaniArtist',
    likes: 1204, cmt: 387, rt: 562, liked: false, rted: false, type: 'poll',
    poll: { opts: ['Pop 🎤', 'Hip-Hop 🎧', 'Sufi 🎵', 'Rock 🎸'], votes: [41, 28, 19, 12] }
  },
  {
    id: 4, user: 'laiba', time: '24m',
    text: 'Final year project submit ho gayi! 😭🎉 4 saal ki mehnat rang layi. Computer Science complete! @waqas_arshad @hussnain_butt dua karo! #BSCS #Graduation',
    likes: 2341, cmt: 498, rt: 891, liked: false, rted: false, type: 'text'
  },
  {
    id: 5, user: 'arshad', time: '38m',
    text: 'Kisi ne @ayan_raza ka naya song suna? Ekdum fire hai! 🔥🙌',
    likes: 178, cmt: 29, rt: 47, liked: false, rted: false, type: 'quote',
    qt: { user: 'ayan', text: 'New track drop kar raha hun agle hafte! 🎵 Guess karo kaunsa genre?' }
  },
  {
    id: 6, user: 'waqas', time: '1h',
    text: 'Chai peena band karna chahta hun... lekin phir chai pi leta hun. Ye life cycle kabhi nahi tutega ☕😂 #ChaiLover #PakistaniProblems',
    likes: 4567, cmt: 812, rt: 1203, liked: false, rted: false, type: 'text'
  },
  {
    id: 7, user: 'hussnain', time: '2h',
    text: 'Stack Overflow band hone ki khabren aa rahi hain lekin developers ke liye ye sirf ek naya AI dor ki shuruwat hai! Code likhna asan hua hai. Kya aap AI tools use karte ho? 🤖 #Tech #Dev',
    likes: 892, cmt: 234, rt: 445, liked: false, rted: false, type: 'text'
  },
  {
    id: 8, user: 'aliza', time: '3h',
    text: 'Ghar ghar mein startup! Pakistan ka future bohat roshan lagta hai 🚀 Hamare naujawan kuch naya kar rahe hain #Startup #Pakistan #Innovation',
    likes: 1123, cmt: 187, rt: 392, liked: false, rted: false, type: 'text'
  },
];

const suggestions = [
  { key: 'ayan',     following: false },
  { key: 'aliza',    following: true  },
  { key: 'laiba',    following: false },
  { key: 'hussnain', following: true  },
  { key: 'arshad',   following: false },
];

const trends = [
  { cat: 'Pakistan · Trending',    tag: '#ChaiLover',    cnt: '45.2K Posts' },
  { cat: 'Technology · Trending',  tag: '#AIRevolution', cnt: '89.7K Posts' },
  { cat: 'Music',                   tag: '#AyanNewTrack', cnt: '12.1K Posts' },
  { cat: 'Cricket · Live',          tag: '#PAKvIND',      cnt: '289K Posts'  },
  { cat: 'Education',               tag: '#BSCS2025',     cnt: '8.4K Posts'  },
];

let nextId = 100;

// ── HELPERS ──
function fmt(txt) {
  return txt
    .replace(/#(\w+)/g, '<span class="ht">#$1</span>')
    .replace(/@(\w+)/g, '<span class="mn">@$1</span>')
    .replace(/\n/g, '<br>');
}

function numFmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
  return n;
}

// ── RENDER TWEET ──
function renderTweet(tw) {
  const u = USERS[tw.user];
  let extra = '';

  if (tw.type === 'poll') {
    const total = tw.poll.votes.reduce((a, b) => a + b, 0);
    extra = `<div class="poll">
      ${tw.poll.opts.map((o, i) => {
        const pct = Math.round(tw.poll.votes[i] / total * 100);
        return `<div class="poll-option">
          <div class="poll-bar-wrap">
            <div class="poll-bar" style="width:${pct}%"></div>
            <span class="poll-label">${o}</span>
            <span class="poll-pct">${pct}%</span>
          </div>
        </div>`;
      }).join('')}
      <div class="poll-meta">${total} votes · Kal band hoga</div>
    </div>`;
  }

  if (tw.type === 'quote' && tw.qt) {
    const qu = USERS[tw.qt.user];
    extra = `<div class="qt">
      <div class="qt-head">
        <div class="avatar" style="width:20px;height:20px;font-size:9px;font-weight:800;color:#fff;border-radius:50%;background:${qu.grad};flex-shrink:0">${qu.init}</div>
        <span class="qt-name">${qu.name}</span>
        <span class="qt-handle">${qu.handle}</span>
      </div>
      <div class="qt-body">${fmt(tw.qt.text)}</div>
    </div>`;
  }

  return `
  <div class="tweet" id="tw${tw.id}">
    <div class="avatar sz-md" style="background:${u.grad}">${u.init}</div>
    <div class="tweet-right">
      <div class="tweet-head">
        <span class="tw-name">${u.name}</span>
        ${u.v ? '<div class="tw-badge">✓</div>' : ''}
        <span class="tw-handle">${u.handle}</span>
        <span class="tw-dot">·</span>
        <span class="tw-time">${tw.time}</span>
        <button class="tw-menu" onclick="event.stopPropagation()">⋯</button>
      </div>
      <div class="tw-body">${fmt(tw.text)}</div>
      ${extra}
      <div class="tw-actions">
        <button class="act cmt" onclick="event.stopPropagation();doComment(${tw.id})">
          <span class="act-icon">💬</span>${numFmt(tw.cmt)}
        </button>
        <button class="act rt ${tw.rted ? 'rted' : ''}" onclick="event.stopPropagation();doRT(${tw.id})">
          <span class="act-icon">🔁</span>${numFmt(tw.rt)}
        </button>
        <button class="act like ${tw.liked ? 'liked' : ''}" onclick="event.stopPropagation();doLike(${tw.id})">
          <span class="act-icon">${tw.liked ? '❤️' : '🤍'}</span>${numFmt(tw.likes)}
        </button>
        <button class="act sh" onclick="event.stopPropagation();toast('Link copy ho gaya! 🔗')">
          <span class="act-icon">↗️</span>
        </button>
      </div>
    </div>
  </div>`;
}

function renderFeed() {
  document.getElementById('feed').innerHTML = tweets.map(renderTweet).join('');
}

function renderTrends() {
  document.getElementById('trendList').innerHTML = trends.map(t => `
    <div class="trend-item" onclick="toast('${t.tag} ke results load ho rahe hain... 🔍')">
      <div class="trend-cat">${t.cat}</div>
      <div class="trend-tag">${t.tag}</div>
      <div class="trend-count">${t.cnt}</div>
    </div>`).join('');
}

function renderSuggestions() {
  document.getElementById('sugList').innerHTML = suggestions.map((s, i) => {
    const u = USERS[s.key];
    return `<div class="sug-item">
      <div class="avatar sz-sm" style="background:${u.grad}">${u.init}</div>
      <div class="sug-info">
        <div class="sug-name">${u.name}</div>
        <div class="sug-handle">${u.handle}</div>
      </div>
      <button class="fol-btn ${s.following ? 'ing' : ''}" onclick="toggleFollow(${i},this)">
        ${s.following ? 'Following ✓' : 'Follow'}
      </button>
    </div>`;
  }).join('');
}

// ── ACTIONS ──
function doLike(id) {
  const tw = tweets.find(t => t.id === id);
  if (!tw) return;
  tw.liked = !tw.liked;
  tw.likes += tw.liked ? 1 : -1;
  renderFeed();
}

function doRT(id) {
  const tw = tweets.find(t => t.id === id);
  if (!tw) return;
  tw.rted = !tw.rted;
  tw.rt += tw.rted ? 1 : -1;
  renderFeed();
  if (tw.rted) toast('Post retweet ho gaya! 🔁');
}

function doComment(id) {
  const tw = tweets.find(t => t.id === id);
  if (!tw) return;
  const u = USERS[tw.user];
  const reply = prompt(`${u.name} ko jawab do:`);
  if (reply && reply.trim()) {
    tw.cmt++;
    const newTw = {
      id: nextId++, user: 'waqas', time: 'abhi',
      text: `Reply to ${u.handle}: ${reply.trim()}`,
      likes: 0, cmt: 0, rt: 0, liked: false, rted: false, type: 'text'
    };
    tweets.unshift(newTw);
    renderFeed();
    toast('Jawab post ho gaya! ✅');
  }
}

function toggleFollow(i, btn) {
  suggestions[i].following = !suggestions[i].following;
  btn.textContent = suggestions[i].following ? 'Following ✓' : 'Follow';
  btn.classList.toggle('ing', suggestions[i].following);
  const u = USERS[suggestions[i].key];
  toast(suggestions[i].following
    ? `${u.name} ko follow kar liya! 🎉`
    : `${u.name} ko unfollow kiya`);
}

// ── COMPOSER ──
function onType() {
  const ta   = document.getElementById('comp');
  const len  = ta.value.length;
  const pct  = len / 280;
  const circ = document.getElementById('ringCircle');
  const num  = document.getElementById('ringNum');
  const offset = 69.1 * (1 - pct);
  circ.setAttribute('stroke-dashoffset', offset);
  circ.style.stroke = pct > 0.9 ? 'var(--danger)' : pct > 0.75 ? '#f97316' : 'var(--gold)';
  num.textContent = len;
  document.getElementById('sendBtn').disabled = len === 0;
}

function onMType() {
  const ta  = document.getElementById('mcomp');
  const rem = 280 - ta.value.length;
  const cnt = document.getElementById('mcount');
  cnt.textContent  = rem;
  cnt.style.color  = rem < 20 ? 'var(--danger)' : rem < 50 ? '#f97316' : 'var(--muted)';
  document.getElementById('mSend').disabled = ta.value.trim().length === 0;
}

function createPost(text) {
  const newTw = {
    id: nextId++, user: 'waqas', time: 'abhi',
    text: text, likes: 0, cmt: 0, rt: 0,
    liked: false, rted: false, type: 'text'
  };
  tweets.unshift(newTw);
  renderFeed();
  toast('Aapka post live ho gaya! 🎉');
}

function doPost() {
  const ta = document.getElementById('comp');
  if (!ta.value.trim()) return;
  createPost(ta.value.trim());
  ta.value = '';
  onType();
}

function postModal() {
  const ta = document.getElementById('mcomp');
  if (!ta.value.trim()) return;
  createPost(ta.value.trim());
  ta.value = '';
  onMType();
  closeModal();
}

// ── EMOJI ──
function toggleEmoji() {
  document.getElementById('emojiTray').classList.toggle('open');
}

function ei(e) {
  const ta = document.getElementById('comp');
  ta.value += e;
  onType();
  ta.focus();
}

// ── MODAL ──
function openModal() {
  document.getElementById('overlay').classList.add('open');
  setTimeout(() => document.getElementById('mcomp').focus(), 120);
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
}

function overlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

// ── NAV ──
function navClick(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}

function switchTab(el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function refresh() {
  renderFeed();
  toast('Feed refresh ho gaya! ✨');
}

// ── TOAST ──
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'n' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) openModal();
});

// ── INIT ──
renderFeed();
renderTrends();
renderSuggestions();

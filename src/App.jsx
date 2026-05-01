import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Shield,
  Lock,
  MessageCircle,
  Eye,
  ArrowUp,
  Smartphone,
  Monitor,
  Apple,
  Globe,
  Bell,
  Zap,
  Server,
  XCircle,
  Smartphone as PhoneDevice,
  Computer,
  User,
  Key,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Smooth scroll helper
   ═══════════════════════════════════════════════════════ */
const smoothScrollTo = (targetY, duration = 1000) => {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  const ease = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now) => {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const handleNavClick = (e, targetId) => {
  e.preventDefault();
  const el = document.querySelector(targetId);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    smoothScrollTo(y);
    window.history.pushState(null, "", targetId);
  }
};

/* ═══════════════════════════════════════════════════════
   EQ Bars
   ═══════════════════════════════════════════════════════ */
const NavEQBar = ({ animName, delay }) => (
  <span
    className="block h-[14px] w-[2px]"
    style={{
      background:
        "linear-gradient(to top, var(--eq-bar-bottom), var(--eq-bar-top))",
      animation: `${animName} infinite alternate`,
      transformOrigin: "bottom",
      animationDelay: delay,
    }}
  />
);

/* ═══════════════════════════════════════════════════════
   App Interface Mockup
   ═══════════════════════════════════════════════════════ */
const AppInterface = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedChat, setSelectedChat] = useState(0);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 560, h: 560 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSize({ w, h: Math.round(w * 0.85) });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const s = (v) => Math.round((v / 560) * size.w);
  const isMobile = size.w < 400;

  const chats = [
    {
      name: "Алексей",
      id: "a1b2c3...",
      lastMsg: "Привет! Как дела?",
      time: "14:32",
      unread: 2,
      online: true,
    },
    {
      name: "Группа: Работа",
      id: "d4e5f6...",
      lastMsg: "Встреча в 16:00",
      time: "14:15",
      unread: 0,
      online: false,
      group: true,
    },
    {
      name: "Мария",
      id: "g7h8i9...",
      lastMsg: "Отправила файл 🔒",
      time: "13:48",
      unread: 1,
      online: true,
    },
    {
      name: "Дмитрий",
      id: "j0k1l2...",
      lastMsg: "Ок, понял",
      time: "Вчера",
      unread: 0,
      online: false,
    },
    {
      name: "Анна",
      id: "m3n4o5...",
      lastMsg: "Спасибо!",
      time: "Вчера",
      unread: 0,
      online: false,
    },
  ];

  const chatMessages = [
    [
      {
        text: "Привет! Как дела?",
        from: "them",
        time: "14:30",
        encrypted: true,
      },
      {
        text: "Привет! Всё отлично, спасибо. Ты уже попробовал Silentium?",
        from: "me",
        time: "14:31",
        encrypted: true,
      },
      {
        text: "Да! Очень удобный, шифрование на уровне 🔒",
        from: "them",
        time: "14:32",
        encrypted: true,
      },
    ],
    [
      {
        text: "Коллеги, напоминание — встреча в 16:00",
        from: "them",
        time: "14:10",
        encrypted: false,
        sender: "Олег",
      },
      {
        text: "Подключусь через Silentium, ссылка в закрепе",
        from: "them",
        time: "14:12",
        encrypted: false,
        sender: "Ирина",
      },
      { text: "Принято! 🔒", from: "me", time: "14:15", encrypted: true },
    ],
    [
      {
        text: "Привет! Отправила тебе документ",
        from: "them",
        time: "13:40",
        encrypted: true,
      },
      {
        text: "Вижу, зашифровано и доставлено ✅",
        from: "me",
        time: "13:42",
        encrypted: true,
      },
      {
        text: "Отправила файл 🔒",
        from: "them",
        time: "13:48",
        encrypted: true,
      },
    ],
    [
      {
        text: "Ты слышал про Silentium?",
        from: "me",
        time: "Вчера, 18:30",
        encrypted: true,
      },
      {
        text: "Да, говорят полностью P2P без серверов",
        from: "them",
        time: "Вчера, 18:45",
        encrypted: true,
      },
      {
        text: "Ок, понял",
        from: "them",
        time: "Вчера, 19:00",
        encrypted: true,
      },
    ],
    [
      {
        text: "Спасибо за рекомендацию! Установила Silentium",
        from: "them",
        time: "Вчера, 21:10",
        encrypted: true,
      },
      {
        text: "Пожалуйста! Теперь общаемся только тут 🔒",
        from: "me",
        time: "Вчера, 21:15",
        encrypted: true,
      },
      { text: "Спасибо!", from: "them", time: "Вчера, 21:18", encrypted: true },
    ],
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[min(100%,560px)] select-none"
      style={{
        animation: "siteReveal 0.55s cubic-bezier(0.16,1,0.3,1) 0.12s both",
      }}
    >
      {/* Window frame */}
      <div
        className="overflow-hidden rounded-sm border shadow-[0_28px_80px_var(--shadow-elev)]"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        {/* Chrome bar */}
        <div
          className="flex h-9 shrink-0 items-center gap-2 border-b px-3"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface-chrome)",
          }}
        >
          <span className="flex gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--chrome-dot-a)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "rgba(139,92,246,0.4)" }}
            />
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "rgba(139,92,246,0.25)" }}
            />
          </span>
          <span
            className="mx-auto font-display text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--foreground)", opacity: 0.5 }}
          >
            SILENTIUM
          </span>
          <span className="w-9" />
        </div>

        <div className="flex" style={{ height: size.h - s(36) }}>
          {/* Sidebar */}
          {!isMobile && (
            <div
              className="flex w-[42%] flex-col border-r"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-raised)",
              }}
            >
              {/* Tabs */}
              <div
                className="flex border-b"
                style={{ borderColor: "var(--border)" }}
              >
                {["chats", "contacts", "settings"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 py-2 font-display text-[9px] font-bold uppercase tracking-[0.12em] transition-colors"
                    style={{
                      color:
                        activeTab === tab
                          ? "var(--foreground)"
                          : "var(--text-subtle)",
                      borderBottom:
                        activeTab === tab
                          ? "2px solid var(--accent)"
                          : "2px solid transparent",
                    }}
                  >
                    {tab === "chats"
                      ? "Чаты"
                      : tab === "contacts"
                        ? "Контакты"
                        : "Настройки"}
                  </button>
                ))}
              </div>

              {/* Chat list */}
              <div className="flex-1 overflow-y-auto">
                {chats.map((chat, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedChat(i)}
                    className="flex cursor-pointer items-center gap-2 border-b px-3 py-2.5 transition-colors"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor:
                        selectedChat === i
                          ? "rgba(139,92,246,0.08)"
                          : "transparent",
                    }}
                  >
                    <div
                      className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "var(--accent)",
                        opacity: 0.15,
                      }}
                    >
                      <span
                        className="font-display text-[10px] font-bold"
                        style={{ color: "var(--accent)" }}
                      >
                        {chat.name[0]}
                      </span>
                      {chat.online && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border"
                          style={{
                            backgroundColor: "#10b981",
                            borderColor: "var(--surface-raised)",
                          }}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-display text-[11px] font-semibold truncate"
                          style={{ color: "var(--foreground)" }}
                        >
                          {chat.group ? "👥 " : ""}
                          {chat.name}
                        </span>
                        <span
                          className="text-[9px]"
                          style={{ color: "var(--text-subtle)" }}
                        >
                          {chat.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span
                          className="text-[10px] truncate"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {chat.encrypted ? "🔒 " : ""}
                          {chat.lastMsg}
                        </span>
                        {chat.unread > 0 && (
                          <span
                            className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                            style={{
                              backgroundColor: "var(--accent)",
                              color: "#fff",
                            }}
                          >
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main chat area */}
          <div
            className="flex flex-1 flex-col"
            style={{ backgroundColor: "var(--background)" }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-2 border-b px-3 py-2"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-raised)",
              }}
            >
              <div
                className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--accent)", opacity: 0.15 }}
              >
                <span
                  className="font-display text-[10px] font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {chats[selectedChat].name[0]}
                </span>
                {chats[selectedChat].online && (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border"
                    style={{
                      backgroundColor: "#10b981",
                      borderColor: "var(--surface-raised)",
                    }}
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="font-display text-[11px] font-semibold truncate"
                  style={{ color: "var(--foreground)" }}
                >
                  {chats[selectedChat].name}
                </p>
                <p
                  className="text-[9px]"
                  style={{
                    color: chats[selectedChat].online
                      ? "#10b981"
                      : "var(--text-subtle)",
                  }}
                >
                  {chats[selectedChat].online ? "В сети" : "Был(а) недавно"}
                </p>
              </div>
              <Lock
                size={12}
                strokeWidth={1.5}
                style={{ color: "var(--accent)", opacity: 0.6 }}
              />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              {/* Encryption notice */}
              <div className="mb-3 flex items-center justify-center">
                <span
                  className="rounded-sm border px-2 py-1 text-[9px]"
                  style={{
                    borderColor: "rgba(139,92,246,0.15)",
                    backgroundColor: "rgba(139,92,246,0.05)",
                    color: "var(--accent)",
                  }}
                >
                  🔒 End-to-End зашифровано
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {chatMessages[selectedChat].map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[85%] rounded-sm px-3 py-2"
                      style={{
                        backgroundColor:
                          msg.from === "me"
                            ? "var(--accent)"
                            : "var(--surface-raised)",
                        color: msg.from === "me" ? "#fff" : "var(--foreground)",
                      }}
                    >
                      {msg.sender && (
                        <p
                          className="mb-0.5 text-[9px] font-semibold"
                          style={{ color: "var(--accent)" }}
                        >
                          {msg.sender}
                        </p>
                      )}
                      <p className="text-[11px] leading-relaxed">{msg.text}</p>
                      <div
                        className={`mt-1 flex items-center gap-1 text-[8px] ${msg.from === "me" ? "opacity-70" : "opacity-40"}`}
                      >
                        <span>{msg.time}</span>
                        {msg.from === "me" && <span>✓✓</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <div
              className="flex items-center gap-2 border-t px-3 py-2"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-raised)",
              }}
            >
              <div
                className="flex-1 rounded-sm border px-3 py-1.5"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--background)",
                }}
              >
                <span
                  className="text-[10px]"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Сообщение...
                </span>
              </div>
              <div
                className="flex h-7 w-7 items-center justify-center rounded-sm"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <span
                  className="text-[10px] font-bold"
                  style={{ color: "#fff" }}
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   Window Chrome Bar
   ═══════════════════════════════════════════════════════ */
const ChromeBar = ({ title, variant = "default" }) => (
  <div
    className="flex h-7 shrink-0 items-center gap-1.5 border-b border-[color:var(--border)] px-2.5 md:h-8 md:gap-2 md:px-3"
    style={{ background: "var(--surface-chrome)" }}
  >
    <span className="flex shrink-0 gap-1" aria-hidden="true">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--chrome-dot-a)" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background:
            variant === "silentium"
              ? "rgba(139,92,246,0.4)"
              : "var(--chrome-dot-c)",
        }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background:
            variant === "silentium"
              ? "rgba(139,92,246,0.25)"
              : "var(--chrome-dot-c)",
        }}
      />
    </span>
    {variant === "silentium" ? (
      <>
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/42 md:text-[11px]" />
        <span className="ml-auto w-[52px] shrink-0" aria-hidden="true" />
      </>
    ) : (
      <span className="min-w-0 truncate font-display text-[9px] font-bold uppercase tracking-[0.12em] text-foreground/30 md:text-[10px]">
        {title}
      </span>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════
   Feature Card
   ═══════════════════════════════════════════════════════ */
const FeatureCard = ({ name, glowBg, icon, description }) => (
  <article
    className="group flex min-h-0 flex-col overflow-hidden border border-[color:var(--border)] bg-surface-raised transition-[border-color,box-shadow] duration-300 hover:border-foreground/14"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <ChromeBar title={name} />
    <div className="flex items-center justify-center flex-1 px-3 py-3 md:px-4 md:py-4">
      <div className="relative flex w-full items-center justify-center py-0.5">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[2.85rem] w-[2.85rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[14px] sm:h-[3.1rem] sm:w-[3.1rem] sm:blur-[16px] md:blur-[18px]"
          style={{ background: glowBg }}
          aria-hidden="true"
        />
        <div className="relative z-[1] flex flex-col items-center gap-2">
          <div
            className="flex aspect-square w-full max-w-[3rem] items-center justify-center opacity-[0.92] transition-[opacity,filter] duration-300 group-hover:opacity-100 sm:max-w-[3.4rem] md:max-w-[3.6rem]"
            style={{ color: "var(--foreground)" }}
          >
            {icon}
          </div>
          <p className="font-display text-[9px] font-bold uppercase tracking-[0.12em] text-foreground/35 sm:text-[10px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  </article>
);

/* ═══════════════════════════════════════════════════════
   Center Card
   ═══════════════════════════════════════════════════════ */
const CenterCard = () => (
  <article
    className="group flex min-h-0 flex-col overflow-hidden border border-[color:var(--border)] bg-surface-raised transition-[border-color,box-shadow] duration-300 hover:border-[rgba(139,92,246,0.2)]"
    style={{ boxShadow: "var(--shadow-card-elev)" }}
  >
    <ChromeBar variant="silentium" />
    <div className="flex items-center justify-center flex-1 p-0">
      <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-center gap-3 px-5 py-4 text-center md:gap-4 md:px-8 md:py-5">
        <div
          className="pointer-events-none absolute left-1/2 top-[40%] z-0 h-[75%] w-[min(72%,240px)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(139,92,246,0.15)] bg-[rgba(139,92,246,0.04)] sm:h-12 sm:w-12 md:h-14 md:w-14">
          <Shield
            size={20}
            strokeWidth={1.5}
            className="text-[rgba(139,92,246,0.8)] sm:size-5 md:size-6"
          />
        </div>
        <div className="relative z-[1] flex flex-col items-center gap-1.5 md:gap-2">
          <p className="font-display text-lg font-extrabold tracking-[-0.03em] text-foreground sm:text-xl md:text-2xl">
            Silentium
          </p>
          <p className="max-w-[20rem] font-display text-[9px] font-bold uppercase leading-relaxed tracking-[0.15em] text-foreground/38 sm:text-[10px] md:max-w-[24rem] md:tracking-[0.17em]">
            Полная анонимность
          </p>
        </div>
      </div>
    </div>
  </article>
);

/* ═══════════════════════════════════════════════════════
   Section Divider
   ═══════════════════════════════════════════════════════ */
const SectionDivider = ({ num }) => (
  <div
    className="relative z-10 flex h-14 w-full items-center justify-center px-6 md:h-16"
    aria-hidden="true"
  >
    <div className="h-px max-w-[min(100%,72rem)] flex-1 bg-gradient-to-r from-transparent via-foreground/18 to-transparent" />
    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
      <span className="h-1 w-1 bg-foreground/50" />
      <span className="font-mono text-[10px] tabular-nums tracking-[0.35em] text-foreground/25">
        {num}
      </span>
      <span className="h-1 w-1 bg-foreground/50" />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   Cookie / Toast Banner
   ═══════════════════════════════════════════════════════ */
const CookieBanner = ({ visible, onClose, title, body }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!visible) {
      setProgress(100);
      return;
    }
    const timer = setTimeout(() => onClose(), 4200);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.max(0, 100 - (elapsed / 4200) * 100);
      setProgress(p);
      if (p > 0) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-4 z-[100] w-[min(calc(100vw-2rem),21rem)] md:bottom-8 md:left-8"
      style={{ animation: "toastIn 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      <div className="pointer-events-auto overflow-hidden rounded-sm border border-foreground/18 bg-surface-raised shadow-[0_22px_56px_var(--shadow-elev)]">
        <div className="relative">
          <div className="flex gap-3 pl-5 pr-2 py-4 md:pl-6 md:pr-3">
            <div className="min-w-0 flex-1">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/38">
                Уведомление
              </p>
              <p className="font-display mt-1 text-sm font-semibold leading-snug text-foreground">
                {title}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-foreground/48">
                {body}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-0.5 shrink-0 self-start rounded-lg p-1.5 text-foreground/40 transition-[color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-foreground/10 hover:text-foreground active:scale-90"
              aria-label="Закрыть"
            >
              <X size={17} strokeWidth={1.5} />
            </button>
          </div>
          <div
            className="h-px w-full bg-foreground/[0.08]"
            aria-hidden="true"
          />
          <div className="relative h-1 bg-foreground/10">
            <div
              className="absolute inset-y-0 left-0 bg-foreground/55"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   Download Modal
   ═══════════════════════════════════════════════════════ */
const DownloadModal = ({ isOpen, onClose, onPlatformClick }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const platforms = [
    {
      id: "ios",
      name: "iOS",
      description: "iPhone, iPad",
      icon: <Apple size={22} strokeWidth={1.25} />,
    },
    {
      id: "android",
      name: "Android",
      description: "Телефон",
      icon: <Smartphone size={22} strokeWidth={1.25} />,
    },
    {
      id: "desktop",
      name: "Компьютер",
      description: "Win / Mac / Linux",
      icon: <Monitor size={22} strokeWidth={1.25} />,
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-[90] cursor-default bg-black/60"
        onClick={onClose}
        style={{ animation: "fadeIn 0.32s ease-out both" }}
      />
      <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto relative w-full max-w-md rounded-sm border border-[color:var(--border)] bg-surface-raised p-5 shadow-[0_32px_96px_-24px_var(--shadow-elev),inset_0_1px_0_0_var(--border)] md:p-7"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: "modalIn 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 p-2 text-foreground/45 transition-colors hover:bg-foreground/10 hover:text-foreground md:right-4 md:top-4"
            aria-label="Закрыть"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40">
            Платформа
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold text-foreground">
            Ваша ОС
          </h2>
          <p className="mt-2 text-sm text-foreground/48">
            Выберите тип устройства — мы подстроим уведомление под него.
          </p>
          <div className="mt-5 space-y-2">
            {platforms.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onPlatformClick(p.name);
                  onClose();
                }}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-sm border border-[color:var(--border)] bg-foreground/[0.03] p-3.5 text-left transition-[border-color,background-color] duration-300 hover:border-[rgba(139,92,246,0.3)] hover:bg-foreground/[0.07]"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[color:var(--border)] bg-foreground/[0.06] transition-colors group-hover:border-[rgba(139,92,246,0.22)]"
                  style={{ color: "var(--foreground)" }}
                >
                  {p.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold text-foreground">
                    {p.name}
                  </p>
                  <p className="text-xs text-foreground/42">{p.description}</p>
                </div>
                <span className="text-foreground/30 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════
   Scroll-to-top button
   ═══════════════════════════════════════════════════════ */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 480);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        smoothScrollTo(0);
        window.location.hash &&
          window.history.pushState(
            null,
            document.title,
            window.location.pathname + window.location.search,
          );
      }}
      className="font-display fixed bottom-6 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-sm border border-foreground/25 bg-surface text-foreground transition-[color,background-color,border-color,transform] duration-300 hover:border-[rgba(139,92,246,0.5)] hover:bg-[rgba(139,92,246,0.15)] active:scale-95 md:bottom-8 md:right-[4.25rem]"
      aria-label="Наверх"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
};

/* ═══════════════════════════════════════════════════════
   Main App
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("silentium-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ visible: false, title: "", body: "" });

  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("silentium-theme", theme);
    } catch {}
  }, [theme]);
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", "features", "security", "download"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      smoothScrollTo(y);
      window.history.pushState(null, "", targetId);
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  const navItems = [
    { id: "hero", label: "Главная", sub: "Начало", href: "#hero" },
    { id: "features", label: "Возможности", sub: "Функции", href: "#features" },
    {
      id: "security",
      label: "Безопасность",
      sub: "Протокол",
      href: "#security",
    },
    { id: "download", label: "Скачать", sub: "ОС", href: "#download" },
  ];

  const [tooltipIdx, setTooltipIdx] = useState(0);
  useEffect(() => {
    setTooltipIdx(navItems.findIndex((n) => n.id === activeSection));
  }, [activeSection]);

  const handlePlatformClick = (name) => {
    setToast({
      visible: true,
      title: `Платформа: ${name}`,
      body: "Записали. О запуске сообщим на сайте и в Telegram.",
    });
  };

  const features = [
    {
      name: "Шифрование",
      glowBg:
        "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.13) 0%, rgba(139,92,246,0.04) 45%, transparent 62%)",
      description: "E2E",
      icon: <Lock size={24} strokeWidth={1.2} />,
    },
    {
      name: "Без метаданных",
      glowBg:
        "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.13) 0%, rgba(59,130,246,0.04) 45%, transparent 62%)",
      description: "Zero",
      icon: <Eye size={24} strokeWidth={1.2} className="opacity-60" />,
    },
    {
      name: "Анонимность",
      glowBg:
        "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.13) 0%, rgba(16,185,129,0.04) 45%, transparent 62%)",
      description: "Full",
      icon: <Shield size={24} strokeWidth={1.2} />,
    },
    {
      name: "Мгновенно",
      glowBg:
        "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.13) 0%, rgba(245,158,11,0.04) 45%, transparent 62%)",
      description: "Fast",
      icon: <Zap size={24} strokeWidth={1.2} />,
    },
    {
      name: "Без серверов",
      glowBg:
        "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.11) 0%, rgba(239,68,68,0.04) 45%, transparent 62%)",
      description: "P2P",
      icon: <Globe size={24} strokeWidth={1.2} />,
    },
  ];

  const securityFeatures = [
    {
      number: "01 / 04",
      title: "End-to-End",
      description:
        "Каждое сообщение шифруется на устройстве отправителя и расшифровывается только у получателя.",
      icon: <Lock size={22} strokeWidth={1.2} />,
    },
    {
      number: "02 / 04",
      title: "Без логов",
      description:
        "Мы не храним и не передаём никакие метаданные — ни кому, никогда.",
      icon: <Eye size={22} strokeWidth={1.2} className="opacity-60" />,
    },
    {
      number: "03 / 04",
      title: "P2P-архитектура",
      description:
        "Прямое соединение между устройствами без промежуточных серверов.",
      icon: <Globe size={22} strokeWidth={1.2} />,
    },
    {
      number: "04 / 04",
      title: "Анонимный ID",
      description:
        "Никаких телефонов и email — только криптографический идентификатор.",
      icon: <Shield size={22} strokeWidth={1.2} />,
    },
  ];

  const downloads = [
    {
      title: "iOS",
      subtitle: "iPhone и iPad",
      icon: (
        <Apple size={26} strokeWidth={1.2} className="text-foreground/90" />
      ),
    },
    {
      title: "Android",
      subtitle: "Телефон или планшет",
      icon: (
        <Smartphone
          size={26}
          strokeWidth={1.2}
          className="text-foreground/90"
        />
      ),
    },
    {
      title: "Компьютер",
      subtitle: "Windows, macOS, Linux",
      icon: (
        <Monitor size={26} strokeWidth={1.2} className="text-foreground/90" />
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Unbounded:wght@500;600;700;800&display=swap');

        .font-display { font-family: 'Unbounded', Arial, sans-serif; }
        .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }

        @keyframes navEqA { 0% { transform: translateZ(0) scaleY(0.38); } 38% { transform: translateZ(0) scaleY(0.92); } 72% { transform: translateZ(0) scaleY(0.52); } 100% { transform: translateZ(0) scaleY(1); } }
        @keyframes navEqB { 0% { transform: translateZ(0) scaleY(0.55); } 28% { transform: translateZ(0) scaleY(1); } 55% { transform: translateZ(0) scaleY(0.4); } 100% { transform: translateZ(0) scaleY(0.78); } }
        @keyframes navEqC { 0% { transform: translateZ(0) scaleY(0.42); } 22% { transform: translateZ(0) scaleY(0.62); } 61% { transform: translateZ(0) scaleY(1); } 100% { transform: translateZ(0) scaleY(0.48); } }
        @keyframes siteReveal { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes vinylSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ambientDriftA { from { transform: translate(0) scale(1); } to { transform: translate(3%, 4%) scale(1.04); } }
        @keyframes ambientDriftB { from { transform: translate(0) scale(1); } to { transform: translate(-4%, -2%) scale(1.03); } }
        @keyframes scrollHint { 0%, 100% { opacity: 0.35; transform: scaleX(0.85); } 50% { opacity: 1; transform: scaleX(1); } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(28px) scale(0.94); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes heroSoundHintIn { 0% { opacity: 0.06; } 50% { opacity: 0.18; } 100% { opacity: 0.06; } }
      `}</style>

      <div
        className="isolate relative min-h-screen selection:bg-[var(--selection-bg)] selection:text-[var(--selection-text)]"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Background grid */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse 120% 80% at 50% -20%, var(--grid-glow), transparent 55%), radial-gradient(circle at center, transparent 0%, var(--ambient-vignette) 100%), linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
            backgroundPosition: "50%, 50%, -1px -1px, -1px -1px",
            backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px",
          }}
          aria-hidden="true"
        />

        {/* Grain overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
          style={{
            opacity: "var(--grain-opacity)",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* Progress bar */}
        <div
          className="pointer-events-none fixed left-0 top-0 z-[55] h-0.5 w-full origin-left"
          style={{
            backgroundColor: "var(--accent)",
            opacity: 0.5,
            transform: `scaleX(${scrolled ? 1 : 0})`,
          }}
          aria-hidden="true"
        />

        {/* ══════════════════════════════════════════════════
            HEADER
            ══════════════════════════════════════════════════ */}
        <header
          className={`pointer-events-none fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${scrolled ? "border-b" : "border-b border-transparent bg-transparent"}`}
          style={{
            backgroundColor: scrolled ? "var(--nav-bar-bg)" : "transparent",
            borderColor: scrolled ? "var(--border)" : "transparent",
            backdropFilter: scrolled ? "blur(16px) saturate(1.06)" : "none",
          }}
        >
          <div className="pointer-events-auto mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-5 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 md:px-8 md:py-5">
            <a
              href="#hero"
              className="relative z-10 flex shrink-0 items-center gap-3 font-display text-lg font-extrabold tracking-tight md:justify-self-start md:text-xl"
              style={{ color: "var(--foreground)" }}
            >
              SILENTIUM
              <span
                className="flex h-[14px] items-end gap-[3px]"
                aria-hidden="true"
                title="Signal"
              >
                <NavEQBar
                  animName="navEqA 2.47s cubic-bezier(.45,.05,.2,1)"
                  delay="0s"
                />
                <NavEQBar
                  animName="navEqB 1.83s cubic-bezier(.35,.15,.15,1)"
                  delay="-0.4s"
                />
                <NavEQBar
                  animName="navEqC 2.91s cubic-bezier(.5,0,.15,1)"
                  delay="-0.85s"
                />
              </span>
            </a>

            <nav
              className="hidden items-center justify-center gap-0.5 md:col-start-2 md:row-start-1 md:flex md:justify-self-center"
              aria-label="Navigation"
            >
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "#features")}
                className="px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:opacity-100"
                style={{ color: "var(--foreground)", opacity: 0.45 }}
              >
                Возможности
              </a>
              <a
                href="#security"
                onClick={(e) => handleNavClick(e, "#security")}
                className="px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:opacity-100"
                style={{ color: "var(--foreground)", opacity: 0.45 }}
              >
                Безопасность
              </a>
              <a
                href="#download"
                onClick={(e) => handleNavClick(e, "#download")}
                className="px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:opacity-100"
                style={{ color: "var(--foreground)", opacity: 0.45 }}
              >
                Скачать
              </a>
            </nav>

            <div className="relative z-10 flex shrink-0 items-center justify-end gap-2 md:col-start-3 md:row-start-1 md:justify-self-end">
              {/* Theme toggle */}
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border transition-[border-color,background-color,color,transform] duration-300 md:h-11 md:w-11"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--foreground) 15%, transparent)",
                  color: "var(--foreground)",
                }}
                onClick={toggleTheme}
                aria-label="Сменить тему"
              >
                {isDark ? (
                  <Sun size={18} strokeWidth={1.5} />
                ) : (
                  <Moon size={18} strokeWidth={1.5} />
                )}
              </button>

              {/* LOGIN BUTTON */}
              <button
                type="button"
                className="hidden h-10 shrink-0 items-center justify-center rounded-sm px-4 font-display text-xs font-bold uppercase tracking-[0.14em] transition-[color,background-color,transform] duration-300 md:inline-flex md:h-11"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
                onClick={() => {}}
              >
                Войти
              </button>

              {/* Mobile menu */}
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-sm border transition-colors md:hidden"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--foreground) 15%, transparent)",
                  color: "var(--foreground)",
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X size={22} strokeWidth={1.5} />
                ) : (
                  <Menu size={22} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div
              className="border-t px-5 py-4 md:hidden"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
              }}
            >
              <div className="flex flex-col gap-1">
                <a
                  href="#features"
                  onClick={(e) => handleNavClick(e, "#features")}
                  className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:opacity-100"
                  style={{ color: "var(--foreground)", opacity: 0.45 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Возможности
                </a>
                <a
                  href="#security"
                  onClick={(e) => handleNavClick(e, "#security")}
                  className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:opacity-100"
                  style={{ color: "var(--foreground)", opacity: 0.45 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Безопасность
                </a>
                <a
                  href="#download"
                  onClick={(e) => handleNavClick(e, "#download")}
                  className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:opacity-100"
                  style={{ color: "var(--foreground)", opacity: 0.45 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Скачать
                </a>
                <div
                  className="border-t my-2"
                  style={{ borderColor: "var(--border)" }}
                />
                <a
                  href="#"
                  className="mx-auto mt-2 block w-fit rounded-sm bg-[color:var(--foreground)] px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.14em] transition-[color,background-color] duration-300"
                  style={{ color: "var(--background)" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Войти
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ══════════════════════════════════════════════════
            SIDE NAVIGATION
            ══════════════════════════════════════════════════ */}
        <nav
          className="font-display fixed right-3 top-1/2 z-40 hidden w-28 -translate-y-1/2 md:block lg:right-5"
          aria-label="Section navigation"
        >
          <div className="absolute right-[15px] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-foreground/12 to-transparent" />
          <div className="relative flex flex-col items-end gap-4 pr-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative flex items-center justify-end"
                title={item.label}
              >
                <span className="sr-only">{item.label}</span>
                <span
                  className="block h-2 w-2 rounded-full border transition-[transform,background-color,border-color,box-shadow] duration-300"
                  style={{
                    ...(activeSection === item.id
                      ? {
                          transform: "scale(1.5)",
                          borderColor: "var(--accent)",
                          backgroundColor: "var(--accent)",
                          boxShadow: `0 0 12px var(--accent-glow)`,
                        }
                      : {
                          transform: "scale(1)",
                          borderColor:
                            "color-mix(in srgb, var(--foreground) 30%, transparent)",
                          backgroundColor: "var(--background)",
                        }),
                  }}
                />
              </a>
            ))}
          </div>
          <aside
            className="pointer-events-none absolute right-[4.5rem] top-1/2 z-50 max-w-[120px] -translate-y-1/2 text-right"
            aria-live="polite"
          >
            <span className="sr-only">
              Секция: {navItems[tooltipIdx]?.label}, {navItems[tooltipIdx]?.sub}
            </span>
            <div
              className="w-full overflow-hidden rounded-sm"
              style={{ height: "56px" }}
            >
              <div
                className="flex flex-col will-change-transform"
                style={{
                  transform: `translate3d(0, ${-tooltipIdx * 56}px, 0)`,
                  transition:
                    "transform 340ms cubic-bezier(0.17, 0.84, 0.38, 1)",
                }}
              >
                {navItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full flex-shrink-0 flex-col items-end justify-center gap-0.5 text-right"
                    style={{ height: "56px" }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[9px] leading-tight"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </nav>

        {/* ══════════════════════════════════════════════════
            HERO
            ══════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-[100dvh] overflow-hidden pt-[4.5rem] md:pt-24"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute"
              style={{
                top: "20%",
                left: "5%",
                width: "min(70vmin, 700px)",
                height: "min(70vmin, 700px)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)",
                animation: "ambientDriftA 24s ease-in-out infinite alternate",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: "-8%",
                right: "-15%",
                width: "min(55vmin, 520px)",
                height: "min(55vmin, 520px)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 62%)",
                animation: "ambientDriftB 28s ease-in-out infinite alternate",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                zIndex: 4,
                background:
                  "radial-gradient(ellipse 75% 60% at 50% 35%, transparent 0%, var(--ambient-vignette) 72%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1200px] items-center gap-10 px-5 pb-16 md:min-h-[calc(100dvh-6rem)] md:grid-cols-[1fr_min(52vw,600px)] md:gap-16 md:px-8 lg:pb-24">
            <div
              className="max-w-xl md:max-w-none"
              style={{
                animation: "siteReveal 0.6s cubic-bezier(0.16,1,0.3,1) both",
              }}
            >
              <p
                className="font-display text-[0.625rem] font-bold uppercase tracking-[0.28em]"
                style={{ color: "var(--kicker)" }}
              >
                Никакой слежки. Никаких следов.
              </p>

              <h1
                className="font-display mt-5 flex flex-wrap items-end gap-[0.03em] text-[clamp(3.2rem,11vw,6.2rem)] font-extrabold leading-[0.82] tracking-[-0.045em] md:mt-6"
                style={{ color: "var(--foreground)" }}
                aria-label="Silentium"
              >
                <span style={{ marginRight: "-0.06em" }}>S</span>
                <span
                  className="hero-i relative inline-flex h-[0.78em] w-[0.55em] flex-shrink-0 items-center justify-center"
                  aria-hidden="true"
                  style={{ marginLeft: "-0.06em", marginRight: "-0.12em" }}
                >
                  <span
                    className="absolute left-1/2 top-0 h-full w-[28%] -translate-x-1/2 rounded-[3px] border-[2px]"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--accent) 20%, transparent)",
                      boxShadow: `0 0 10px color-mix(in srgb, var(--accent) 15%, transparent)`,
                    }}
                  />
                </span>
                <span>L</span>
                <span>E</span>
                <span>N</span>
                <span>T</span>
                <span>I</span>
                <span>U</span>
                <span>M</span>
              </h1>

              <p
                className="font-display mt-6 max-w-md text-base font-medium leading-snug md:text-lg"
                style={{ color: "var(--text-muted)" }}
              >
                Анонимный мессенджер нового поколения. Шифрование на уровне
                протокола, P2P-архитектура без серверов, полная приватность без
                compromises.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <button
                  className="relative overflow-hidden rounded-none border-0 px-10 py-4 font-display text-xs font-extrabold uppercase tracking-[0.2em] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                  tabIndex={0}
                  onClick={() => setShowModal(true)}
                >
                  Выбрать ОС
                </button>
                <button
                  className="relative overflow-hidden rounded-none border bg-transparent px-10 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-foreground/[0.06]"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--foreground) 25%, transparent)",
                    color: "var(--foreground)",
                  }}
                  tabIndex={0}
                  onClick={() => {
                    const el = document.querySelector("#features");
                    if (el)
                      smoothScrollTo(
                        el.getBoundingClientRect().top + window.scrollY - 64,
                      );
                  }}
                >
                  Возможности ↓
                </button>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[min(100%,460px)] items-center justify-center md:mx-0 md:max-w-none">
              <AppInterface />
            </div>
          </div>

          <div
            className="absolute bottom-8 left-5 flex items-center gap-4 md:left-8"
            style={{
              animation: "scrollHint 2.4s ease-in-out infinite",
              transformOrigin: "0",
            }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.25em]"
              style={{ color: "var(--text-subtle)" }}
            >
              ВНИЗ
            </span>
            <span className="block h-px w-14 bg-gradient-to-r from-foreground/40 to-transparent opacity-90" />
          </div>
        </section>

        <SectionDivider num="01" />

        {/* ══════════════════════════════════════════════════
            FEATURES
            ══════════════════════════════════════════════════ */}
        <section
          id="features"
          className="relative scroll-mt-16 overflow-hidden py-16 md:py-24"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute left-1/2 top-[42%] h-[min(90vw,42rem)] w-[min(110vw,64rem)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
              style={{
                background:
                  "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 68%)",
              }}
            />
          </div>

          <p
            className="absolute left-2 top-20 opacity-[0.6] md:left-6"
            aria-hidden="true"
            style={{
              fontSize: "clamp(4rem, 14vw, 9rem)",
              lineHeight: "1",
              letterSpacing: "-0.04em",
              color: "var(--section-index-color)",
              fontFamily: "'Unbounded', Arial, sans-serif",
              fontWeight: 800,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            01
          </p>

          <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8">
            <header className="mb-11 max-w-2xl md:mb-14">
              <p
                className="font-display text-[0.625rem] font-bold uppercase tracking-[0.28em]"
                style={{ color: "var(--kicker)" }}
              >
                Возможности
              </p>
              <div
                className="mt-3 h-px w-11 bg-gradient-to-r from-foreground/45 to-transparent"
                aria-hidden="true"
              />
              <h2
                className="font-display mt-6 text-[clamp(1.65rem,4.2vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em] md:mt-7"
                style={{ color: "var(--foreground)" }}
              >
                Всё для тишины
              </h2>
              <p
                className="font-display mt-4 max-w-lg text-[0.8125rem] font-medium leading-relaxed md:mt-5 md:text-base"
                style={{ color: "var(--text-label)" }}
              >
                Не просто шифрование — архитектура, в которой приватность
                встроена в каждый уровень.
              </p>
            </header>

            {/* Desktop */}
            <div className="relative mx-auto hidden w-full max-w-[820px] flex-col items-center gap-5 md:flex md:max-w-none md:gap-5">
              <div className="flex w-full items-center justify-center gap-6 lg:gap-10">
                <div className="flex w-[min(148px,16vw)] flex-shrink-0 flex-col gap-5 lg:w-[min(160px,14vw)] lg:gap-6">
                  {features.slice(0, 2).map((p) => (
                    <FeatureCard key={p.name} {...p} />
                  ))}
                </div>
                <CenterCard />
                <div className="flex w-[min(148px,16vw)] flex-shrink-0 flex-col gap-5 lg:w-[min(160px,14vw)] lg:gap-6">
                  {features.slice(2, 4).map((p) => (
                    <FeatureCard key={p.name} {...p} />
                  ))}
                </div>
              </div>
              <div className="w-full max-w-[200px] self-center lg:max-w-[220px]">
                <FeatureCard {...features[4]} />
              </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-3 sm:gap-4 md:hidden">
              <article
                className="mx-auto aspect-[8/5] w-full max-w-[min(100%,520px)] flex min-h-0 flex-col overflow-hidden border shadow-[0_28px_80px_var(--shadow-elev)]"
                style={{
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-card-elev)",
                }}
              >
                <ChromeBar variant="silentium" />
                <div className="flex items-center justify-center flex-1 p-0">
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-5 py-4 text-center">
                    <div
                      className="pointer-events-none absolute left-1/2 top-[40%] z-0 h-[75%] w-[min(72%,240px)] -translate-x-1/2 -translate-y-1/2"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 65%)",
                      }}
                    />
                    <div className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(139,92,246,0.15)] bg-[rgba(139,92,246,0.04)] sm:h-12 sm:w-12">
                      <Shield
                        size={20}
                        strokeWidth={1.5}
                        className="text-[rgba(139,92,246,0.8)]"
                      />
                    </div>
                    <div className="relative z-[1] flex flex-col items-center gap-1.5 sm:gap-2">
                      <p className="font-display text-lg font-extrabold tracking-[-0.03em] text-foreground sm:text-xl">
                        Silentium
                      </p>
                      <p className="max-w-[20rem] font-display text-[9px] font-bold uppercase leading-relaxed tracking-[0.15em] text-foreground/38 sm:text-[10px]">
                        Полная анонимность
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              <div className="grid grid-cols-2 gap-3">
                {features.slice(0, 2).map((p) => (
                  <FeatureCard key={p.name} {...p} />
                ))}
                {features.slice(2, 4).map((p) => (
                  <FeatureCard key={p.name} {...p} />
                ))}
              </div>
              <div className="mx-auto w-full max-w-[220px]">
                <FeatureCard {...features[4]} />
              </div>
            </div>
          </div>
        </section>

        <SectionDivider num="02" />

        {/* ══════════════════════════════════════════════════
            SECURITY
            ══════════════════════════════════════════════════ */}
        <section
          id="security"
          className="relative scroll-mt-16 overflow-hidden py-16 md:py-24"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute left-1/2 top-[42%] h-[min(90vw,42rem)] w-[min(110vw,64rem)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
              style={{
                background:
                  "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 68%)",
              }}
            />
          </div>

          <p
            className="absolute bottom-8 right-4 md:right-10"
            aria-hidden="true"
            style={{
              fontSize: "clamp(4rem, 14vw, 9rem)",
              lineHeight: "1",
              letterSpacing: "-0.04em",
              color: "var(--section-index-color)",
              fontFamily: "'Unbounded', Arial, sans-serif",
              fontWeight: 800,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            02
          </p>

          <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8">
            <header className="mb-12 max-w-2xl md:mb-14">
              <p
                className="font-display text-[0.625rem] font-bold uppercase tracking-[0.28em]"
                style={{ color: "var(--kicker)" }}
              >
                Протокол безопасности
              </p>
              <h2
                className="font-display mt-4 text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
                style={{ color: "var(--foreground)" }}
              >
                Четыре стены тишины.
              </h2>
              <p
                className="font-display mt-4 max-w-md text-sm leading-relaxed md:text-base"
                style={{ color: "var(--text-muted)" }}
              >
                Не маркетинговые обещания — технические решения, на которых
                держится Silentium.
              </p>
            </header>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-3">
              {securityFeatures.map((f) => (
                <li key={f.number}>
                  <article
                    className="group relative h-full overflow-hidden border p-6 shadow-[inset_0_1px_0_0_var(--border)] transition-[border-color,background-color] duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] md:p-8"
                    style={{
                      borderColor: "var(--bento-border)",
                      backgroundColor: "var(--bento-bg)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--bento-border-hover)";
                      e.currentTarget.style.backgroundColor =
                        "var(--bento-bg-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--bento-border)";
                      e.currentTarget.style.backgroundColor = "var(--bento-bg)";
                    }}
                  >
                    <span
                      className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] tabular-nums"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      {f.number}
                    </span>
                    <div
                      className="mb-5 flex h-11 w-11 items-center justify-center border md:mb-6 md:h-12 md:w-12"
                      style={{
                        borderColor:
                          "color-mix(in srgb, var(--accent) 25%, transparent)",
                        backgroundColor:
                          "color-mix(in srgb, var(--accent) 8%, transparent)",
                        color: "var(--accent)",
                      }}
                    >
                      {f.icon}
                    </div>
                    <h3
                      className="font-display text-lg font-bold md:text-xl"
                      style={{ color: "var(--foreground)" }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="mt-3 max-w-prose text-sm leading-relaxed md:text-[15px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <SectionDivider num="03" />

        {/* ══════════════════════════════════════════════════
            DOWNLOAD
            ══════════════════════════════════════════════════ */}
        <section
          id="download"
          className="relative scroll-mt-16 overflow-hidden py-16 md:py-24"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute left-1/2 top-[42%] h-[min(90vw,42rem)] w-[min(110vw,64rem)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
              style={{
                background:
                  "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 68%)",
              }}
            />
          </div>

          <p
            className="absolute bottom-20 left-4 opacity-70 md:left-8"
            aria-hidden="true"
            style={{
              fontSize: "clamp(4rem, 14vw, 9rem)",
              lineHeight: "1",
              letterSpacing: "-0.04em",
              color: "var(--section-index-color)",
              fontFamily: "'Unbounded', Arial, sans-serif",
              fontWeight: 800,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            03
          </p>

          <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-8">
            <header className="mb-10 text-center md:mb-12">
              <p
                className="font-display text-[0.625rem] font-bold uppercase tracking-[0.28em]"
                style={{ color: "var(--kicker)" }}
              >
                Доступ
              </p>
              <h2
                className="font-display mt-4 text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl"
                style={{ color: "var(--foreground)" }}
              >
                Установка.
              </h2>
              <p
                className="font-display mx-auto mt-4 max-w-md text-sm md:text-base"
                style={{ color: "var(--text-muted)" }}
              >
                iOS, Android или компьютер — отметьте платформу, чтобы не
                пропустить запуск под вашу систему.
              </p>
            </header>

            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {downloads.map((d) => (
                <div
                  key={d.title}
                  className="group flex flex-col border p-6 text-center shadow-[inset_0_1px_0_0_var(--border)] transition-[border-color,background-color] duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{
                    borderColor: "var(--bento-border)",
                    backgroundColor: "var(--bento-bg)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--bento-border-hover)";
                    e.currentTarget.style.backgroundColor =
                      "var(--bento-bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--bento-border)";
                    e.currentTarget.style.backgroundColor = "var(--bento-bg)";
                  }}
                >
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center border"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--accent) 20%, transparent)",
                      backgroundColor:
                        "color-mix(in srgb, var(--accent) 8%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {d.icon}
                  </div>
                  <h3
                    className="font-display mt-5 text-base font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="font-display mt-1 text-xs"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {d.subtitle}
                  </p>
                  <button
                    className="relative mt-6 w-full overflow-hidden rounded-none border bg-transparent py-3 font-display text-xs font-extrabold uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-white active:scale-[0.98]"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--accent) 30%, transparent)",
                      color: "var(--accent)",
                    }}
                    tabIndex={0}
                    onClick={() => setShowModal(true)}
                  >
                    Окно
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FOOTER
            ══════════════════════════════════════════════════ */}
        <footer
          className="relative border-t px-5 py-16 md:px-8 md:py-24"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--background)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p
                  className="font-display text-4xl font-extrabold tracking-tight md:text-6xl"
                  style={{ color: "var(--foreground)" }}
                >
                  SILENTIUM
                </p>
                <p
                  className="font-display mt-4 max-w-sm text-sm leading-relaxed"
                  style={{ color: "var(--text-label)" }}
                >
                  © 2026 Silentium Inc. Все права защищены.
                </p>
              </div>
              <div className="flex flex-wrap gap-10 md:justify-end">
                <a
                  href="https://t.me/Silentium_messenger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:opacity-100"
                  style={{ color: "var(--text-muted)" }}
                >
                  Telegram
                </a>
                <a
                  href="https://discord.gg/Z282bnM36B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:opacity-100"
                  style={{ color: "var(--text-muted)" }}
                >
                  Discord
                </a>
              </div>
            </div>

            <div className="mx-auto mt-16 px-2 text-center md:mt-28">
              <p
                className="font-display mx-auto font-extrabold leading-[0.92]"
                style={{
                  fontSize: "clamp(3rem, 13vw, 8rem)",
                  letterSpacing: "0.12em",
                  color: "var(--footer-glow)",
                  textShadow:
                    "0 0 28px var(--accent-glow), 0 0 64px var(--accent-glow)",
                }}
                aria-hidden="true"
              >
                SILENT
              </p>
              <p className="sr-only">Silent — будьте в тишине</p>
            </div>
          </div>
        </footer>

        {/* ══════════════════════════════════════════════════
            OVERLAYS: Modal, Toast, Scroll-to-top
            ══════════════════════════════════════════════════ */}
        <DownloadModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onPlatformClick={handlePlatformClick}
        />
        <CookieBanner
          visible={toast.visible}
          onClose={() => setToast({ ...toast, visible: false })}
          title={toast.title}
          body={toast.body}
        />
        <ScrollToTop />
      </div>
    </>
  );
}

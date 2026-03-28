"use client"
import { useState } from "react"
import { hardwareTrack } from "@/data/roadmap"
import type { Section, RoadmapNode } from "@/data/roadmap"

// ─── Color map ────────────────────────────────────────────────────────────────
const colors: Record<string, { bg: string; border: string; text: string; dot: string; badge: string }> = {
  blue:   { bg: "#EFF6FF", border: "#3B82F6", text: "#1D4ED8", dot: "#3B82F6", badge: "#DBEAFE" },
  purple: { bg: "#F5F3FF", border: "#7C3AED", text: "#5B21B6", dot: "#7C3AED", badge: "#EDE9FE" },
  teal:   { bg: "#F0FDF9", border: "#0D9488", text: "#0F766E", dot: "#0D9488", badge: "#CCFBF1" },
  coral:  { bg: "#FFF7ED", border: "#EA580C", text: "#C2410C", dot: "#EA580C", badge: "#FFEDD5" },
  amber:  { bg: "#FFFBEB", border: "#D97706", text: "#B45309", dot: "#D97706", badge: "#FEF3C7" },
}

// ─── Node Card ────────────────────────────────────────────────────────────────
function NodeCard({ node, sectionColor, index }: { node: RoadmapNode; sectionColor: string; index: number }) {
  const [open, setOpen] = useState(false)
  const c = colors[sectionColor] || colors.blue
  const isReq = node.type === "required"

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
      {/* dot */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%", flexShrink: 0, marginTop: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 600,
        background: isReq ? c.dot : "#E5E7EB",
        color: isReq ? "#fff" : "#6B7280",
        border: `1.5px solid ${isReq ? c.border : "#D1D5DB"}`,
      }}>
        {index + 1}
      </div>

      {/* card */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          flex: 1, cursor: "pointer",
          background: open ? c.bg : "#fff",
          border: `1px solid ${open ? c.border : "#E5E7EB"}`,
          borderLeft: `3px solid ${isReq ? c.border : "#D1D5DB"}`,
          borderRadius: "0 10px 10px 0",
          padding: "10px 14px",
          transition: "all .15s",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{node.title}</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {node.estimatedDays && (
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{node.estimatedDays} hari</span>
            )}
            <span style={{
              fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 500,
              background: isReq ? c.badge : "#F3F4F6",
              color: isReq ? c.text : "#6B7280",
            }}>
              {isReq ? "Wajib" : "Eksplorasi"}
            </span>
            <span style={{ fontSize: 11, color: "#9CA3AF", transform: open ? "rotate(180deg)" : "none", transition: ".2s" }}>▾</span>
          </div>
        </div>

        <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.55, margin: "0 0 8px" }}>
          {node.description}
        </p>

        {/* learn flow */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          {node.learnFlow.map((step, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, padding: "2px 8px", background: "#F3F4F6", borderRadius: 8, color: "#6B7280" }}>
                {step}
              </span>
              {i < node.learnFlow.length - 1 && <span style={{ fontSize: 10, color: "#D1D5DB" }}>→</span>}
            </span>
          ))}
        </div>

        {/* expanded concepts */}
        {open && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #E5E7EB" }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 7 }}>
              Konsep yang dipelajari
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {node.concepts.map((c, i) => (
                <span key={i} style={{
                  fontSize: 11, padding: "3px 9px",
                  background: "#F9FAFB", border: "1px solid #E5E7EB",
                  borderRadius: 8, color: "#374151",
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Checkpoint Banner ────────────────────────────────────────────────────────
function CheckpointBanner({ checkpoint }: { checkpoint: NonNullable<Section["checkpoint"]> }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      background: "#FFFBEB", border: "1px solid #FCD34D",
      borderRadius: 10, padding: "11px 14px", marginTop: 12, marginBottom: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#92400E", margin: 0 }}>
            ▶ {checkpoint.title}
          </p>
          <p style={{ fontSize: 11, color: "#B45309", margin: "2px 0 0", opacity: .85 }}>
            {checkpoint.subtitle}
          </p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            fontSize: 11, padding: "4px 12px",
            background: "#fff", border: "1px solid #FCD34D",
            borderRadius: 8, color: "#92400E", cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {open ? "Tutup" : "Contoh soal"}
        </button>
      </div>
      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #FDE68A" }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: "#B45309", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>
            Contoh soal ({checkpoint.passingScore}% passing score)
          </p>
          {checkpoint.sampleQuestions.map((q, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <span style={{ fontSize: 11, color: "#B45309", fontWeight: 600, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ fontSize: 12, color: "#78350F", lineHeight: 1.5 }}>{q}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
function SectionBlock({ section }: { section: Section }) {
  const [collapsed, setCollapsed] = useState(false)
  const c = colors[section.color] || colors.blue
  const required = section.nodes.filter(n => n.type === "required")
  const explore = section.nodes.filter(n => n.type === "explore")

  return (
    <div style={{ marginBottom: 32 }}>
      {/* section header */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 12, cursor: "pointer",
        }}
      >
        <div style={{ width: 4, height: 20, background: c.dot, borderRadius: 2 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: c.text, textTransform: "uppercase", letterSpacing: ".08em", margin: 0 }}>
            {section.label}
          </p>
          {section.sublabel && (
            <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{section.sublabel}</p>
          )}
        </div>
        <span style={{ fontSize: 12, color: "#D1D5DB", transform: collapsed ? "rotate(-90deg)" : "none", transition: ".2s" }}>▾</span>
      </div>

      {!collapsed && (
        <>
          {required.length > 0 && (
            <>
              {required.map((node, i) => (
                <NodeCard key={node.id} node={node} sectionColor={section.color} index={i} />
              ))}
            </>
          )}

          {section.checkpoint && <CheckpointBanner checkpoint={section.checkpoint} />}

          {explore.length > 0 && (
            <>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".07em", margin: "16px 0 8px 42px" }}>
                Topik eksplorasi — bebas pilih
              </p>
              {explore.map((node, i) => (
                <NodeCard key={node.id} node={node} sectionColor={section.color} index={required.length + i} />
              ))}
            </>
          )}
        </>
      )}

      <div style={{ height: 1, background: "#F3F4F6", marginTop: 8 }} />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RoadmapPage() {
  const track = hardwareTrack

  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Nav */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #E5E7EB",
        padding: "0 24px", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#111827", letterSpacing: "-.02em" }}>
            <span style={{ color: "#2563EB" }}>kota</span>cloud
          </span>
          <span style={{ color: "#D1D5DB", fontSize: 14 }}>/</span>
          <span style={{ fontSize: 13, color: "#6B7280" }}>roadmap</span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
          <a href="#" style={{ color: "#2563EB", fontWeight: 500, textDecoration: "none" }}>Hardware</a>
          <span style={{ color: "#D1D5DB", fontSize: 12, alignSelf: "center" }}>Platform (segera)</span>
          <span style={{ color: "#D1D5DB", fontSize: 12, alignSelf: "center" }}>SATSET (segera)</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "32px 24px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#2563EB", textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 8px" }}>
            Jalur pembelajaran resmi · Kota Cloud
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 10px", letterSpacing: "-.02em" }}>
            {track.title}
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65, maxWidth: 560, margin: "0 0 24px" }}>
            {track.description}
          </p>
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { num: track.sections.length - 1 + " jalur", label: "eksplorasi" },
              { num: track.totalWeeks, label: "estimasi durasi" },
              { num: track.totalTopics + "+", label: "topik" },
              { num: track.certificates, label: "checkpoint kuis" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ background: "#fff", borderBottom: "1px solid #F3F4F6", padding: "8px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { color: "#3B82F6", label: "Wajib (urut)" },
            { color: "#D1D5DB", label: "Eksplorasi (bebas pilih)" },
            { color: "#D97706", label: "Checkpoint kuis" },
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>
        {track.sections.map(section => (
          <SectionBlock key={section.id} section={section} />
        ))}

        {/* Footer note */}
        <div style={{
          marginTop: 16, padding: "16px 20px",
          background: "#EFF6FF", border: "1px solid #BFDBFE",
          borderRadius: 10,
        }}>
          <p style={{ fontSize: 13, color: "#1D4ED8", margin: 0, fontWeight: 500 }}>
            Roadmap ini terus diperbarui seiring perkembangan produk Kota Cloud.
          </p>
          <p style={{ fontSize: 12, color: "#3B82F6", margin: "4px 0 0", opacity: .8 }}>
            Jalur Platform dan SATSET akan dibuka segera. Kontribusi topik? Buka issue di GitHub.
          </p>
        </div>
      </div>
    </div>
  )
}

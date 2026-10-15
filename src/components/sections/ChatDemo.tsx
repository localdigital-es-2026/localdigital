import { site } from "@/content/site";
import { demoWhatsappUrl } from "@/lib/links";
import { ExternalLink } from "@/components/layout/ExternalLink";
import { TagPill } from "./TagPill";
import type { SectionProps } from "./types";

/** Conversaciones de ejemplo con aspecto de WhatsApp, siempre marcadas como «Ejemplo» (RF-17, RF-18). */
export function ChatDemo({ section, tone }: SectionProps<"chatDemo">) {
  const demoUrl = demoWhatsappUrl(site);
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <h2>{section.title}</h2>
        <p className="text-lg">{section.intro}</p>
        <div className="grid items-start gap-6 md:grid-cols-2">
          {section.chats.map((chat) => (
            <figure key={chat.tag} data-chat className="flex flex-col gap-3 rounded-3xl border border-line bg-background p-4">
              <figcaption className="flex items-center gap-2">
                <TagPill tag={chat.tag} />
                <span className="rounded-full border border-ink px-3 py-0.5 text-xs font-semibold">Ejemplo</span>
              </figcaption>
              <ol className="flex flex-col gap-2">
                {chat.messages.map((message, index) => (
                  <li
                    key={index}
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      message.from === "asistente" ? "self-end bg-[#dbe7ee] text-[#1d1d1f]" : "self-start bg-surface"
                    }`}
                  >
                    <span className="sr-only">{message.from === "asistente" ? "Asistente:" : "Alumno:"} </span>
                    {message.text}
                    {message.time && <span className="ml-2 text-xs">{message.time}</span>}
                  </li>
                ))}
              </ol>
            </figure>
          ))}
        </div>
        {demoUrl && section.demoLinkText && (
          <ExternalLink href={demoUrl} className="text-sm underline">
            {section.demoLinkText}
          </ExternalLink>
        )}
      </div>
    </section>
  );
}

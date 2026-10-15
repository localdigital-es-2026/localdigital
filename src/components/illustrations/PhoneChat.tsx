import type { HeroChat } from "@/content/types";

/**
 * Móvil dibujado con una conversación de WhatsApp de ejemplo (RF-52, D-36): HTML y CSS, sin
 * imágenes. Rotulado «Ejemplo» (RF-17) y descrito para lectores de pantalla. Se recorta por abajo,
 * como el producto que asoma en las portadas de apple.com.
 */
export function PhoneChat({ chat }: { chat: HeroChat }) {
  return (
    <div
      role="img"
      aria-label={chat.description}
      data-phone-chat
      className="mx-auto h-[500px] w-[300px] rounded-t-[52px] bg-[#1d1d1f] px-3 pt-3 shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:h-[560px] md:w-[320px]"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-t-[40px] bg-[#efeae2] text-left">
        <div className="flex items-center gap-2.5 border-b border-[#e5e5ea] bg-white px-4 pb-3 pt-9">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25d366] text-[15px] font-semibold text-white">
            {chat.contact.slice(0, 1)}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold">{chat.contact}</span>
            <span className="text-xs text-[#1a7f45]">en línea</span>
          </span>
          <span className="ml-auto rounded-full border border-[#1d1d1f] px-2 py-0.5 text-[11px] font-semibold">Ejemplo</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 px-3 py-4 text-sm leading-snug">
          {chat.messages.map((message, index) => (
            <span
              key={index}
              data-chat-message
              className={`block max-w-[80%] px-2.5 py-2 ${
                message.from === "asistente"
                  ? "self-end rounded-[12px_4px_12px_12px] bg-[#d9fdd3]"
                  : "self-start rounded-[4px_12px_12px_12px] bg-white"
              }`}
            >
              {message.text} <span className="text-[10px] text-[#6e6e73]">{message.time}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializamos Resend con la API Key guardada en variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nombre, negocio, contacto, mensaje } = await request.json();

    // Validamos que los datos mínimos existan
    if (!nombre || !negocio || !contacto) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Enviamos el email usando Resend
    // Nota: Por defecto, si no tienes dominio validado en Resend, 
    // puedes enviar desde 'onboarding@resend.dev' a tu propio correo verificado.
    const { data, error } = await resend.emails.send({
      from: 'Local Digital Contacto <onboarding@resend.dev>',
      to: ['localdigital.es@gmail.com'],
      subject: `🚀 Nuevo Lead: ${nombre} (${negocio})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6366f1;">Nuevo contacto desde Local Digital</h2>
          <p>Has recibido un nuevo mensaje desde el formulario de la web.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Negocio:</strong> ${negocio}</p>
          <p><strong>Contacto (Email/Tel):</strong> ${contacto}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #6366f1;">
            ${mensaje || 'Sin mensaje adicional.'}
          </blockquote>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Enviado automáticamente desde localdigital.es</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error al enviar con Resend:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

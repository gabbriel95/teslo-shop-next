import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

// Rutas que requieren autenticación
const authenticatedRoutes = ["/checkout/address"];

// Rutas que requieren rol de administrador
const adminRoutes = ["/admin"];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = authenticatedRoutes.includes(nextUrl.pathname);
      const isOnAdminRoute = adminRoutes.includes(nextUrl.pathname);

      if (isOnProtectedRoute || isOnAdminRoute) {
        if (isLoggedIn) {
          // Verificar si es una ruta de administrador
          if (isOnAdminRoute) {
            return auth?.user?.role === "admin"; // Permitir solo si el usuario es administrador
          }
          return true; // Permitir acceso a rutas autenticadas si está logueado
        }
        return false; // No permitir si no está logueado
      }
      return true; // Permitir acceso a rutas públicas
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) throw new Error("Invalid data entered");

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) throw new Error("User not found");

        // Comparar los passwords
        if (!bcryptjs.compareSync(password, user.password))
          throw new Error("Invalid password");

        // Regresar el usuario e información del usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

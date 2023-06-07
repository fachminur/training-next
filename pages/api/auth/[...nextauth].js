import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        return { ...credentials };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      //   console.log('session server', token);
      session.user = { ...token, users: JSON.parse(token.users) };
      return session;
    },
    async jwt({ token, user, trigger, session, account, profile, isNewUser }) {
      //   console.log('user dari jwt', user);
      //   console.log('next auth token', token);
      //   console.log('users', user['users']);
      //   const arr = JSON.parse(user['users']);

      if (trigger === 'update') {
        // console.log('session refresh', session);
        return {
          ...token,
          user: session.user,
          accessToken: session.user.accessToken,
          refreshToken: session.user.refreshToken,
        };
      }

      return {
        ...token,
        ...user,
      };
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
};
export default NextAuth(authOptions);

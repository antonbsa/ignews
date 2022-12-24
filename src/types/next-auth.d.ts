import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    activeSubscription: {
      data: {
      status: string,
      id: string,
      price_id: string,
      userId: {
        id: string,
        collection: {
          id: string,
        }
      },
      ref:{
        id: string,
        collection: {
          id: string,
        },
      },
      ts: number
      }
    }
  }
}
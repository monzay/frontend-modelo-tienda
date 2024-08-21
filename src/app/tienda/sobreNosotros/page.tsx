import React from 'react'

const Page = () => {
  return (
<div style={{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto" data-v0-t="card">
      <div className="flex items-center gap-6 p-6">
        <span className="relative flex shrink-0 overflow-hidden rounded-full h-20 w-20">
          <img className="aspect-square h-full w-full" alt="Owner" src="/placeholder-user.jpg" />
        </span>
        <div className="grid gap-2">
          <h3 className="text-2xl font-bold">Joel Martinez</h3>
          <p className="text-muted-foreground text-lg">Owner, Acme Clothing Co.</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+1 (555) 555-5555</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-5 w-5"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <span>john@acmeclothing.com</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-5 w-5"
            >
              <line x1="2" x2="5" y1="12" y2="12"></line>
              <line x1="19" x2="22" y1="12" y2="12"></line>
              <line x1="12" x2="12" y1="2" y2="5"></line>
              <line x1="12" x2="12" y1="19" y2="22"></line>
              <circle cx="12" cy="12" r="7"></circle>
            </svg>
            <span>123 Main St, Anytown USA</span>
          </div>
        </div>
      </div>
      <div className="p-6 px-6 pb-6">
        <p className="text-muted-foreground text-lg">Hola, si tienes alguna duda o problema, no dudes en contactarnos para asegurarte de recibir un buen servicio, ya que nos preocupamos por nuestros clientes.</p>
        <div className="mt-4 flex items-center gap-4">
          <a className="text-primary hover:underline" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <span className="sr-only">Twitter</span>
          </a>
          <a className="text-primary hover:underline" href="#"></a>
        </div>
      </div>
    </div>
</div>
  )
}

export default Page
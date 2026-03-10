import "./globals.css";

export const metadata = {
  title: "Dell Resolve",
  description: "Assistência técnica especializada em notebooks Dell em São Paulo"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
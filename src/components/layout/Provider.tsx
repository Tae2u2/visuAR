"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Provider;

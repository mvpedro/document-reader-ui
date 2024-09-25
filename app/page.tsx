"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Bem-vindo ao AssistenteJurídico AI</h1>
        <p className="text-xl text-center mb-12">
          Sua ferramenta de inteligência artificial para otimizar o trabalho jurídico
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Análise de Documentos"
          description="Faça upload de documentos jurídicos para análise rápida e precisa."
        />
        {/* <FeatureCard
          title="Pesquisa Jurídica"
          description="Realize pesquisas jurídicas eficientes com a ajuda da IA."
        />
        <FeatureCard
          title="Assistente de Redação"
          description="Obtenha sugestões para aprimorar seus textos jurídicos."
        /> */}
      </div>

      <div className="text-center mt-12">
        <Link href="/auth">
          <Button size="lg">Começar Agora</Button>
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
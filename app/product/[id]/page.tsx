"use client"

import { ProductDetailPage } from "@/components/product-detail-page"
import { use } from "react"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  return <ProductDetailPage id={resolvedParams.id} />
}

"use client"

import { ProductDetailPage } from "@/components/product-detail-page"
import { useParams } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  return <ProductDetailPage id={id} />
}

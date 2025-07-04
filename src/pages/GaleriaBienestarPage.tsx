
"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import MainLayout from "@/components/layout/MainLayout"
import EventCard from "@/components/galeria-bienestar/EventCard"
import EventsPagination from "@/components/galeria-bienestar/EventsPagination"
import { mockEvents } from "@/data/eventosMock"
import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Image, GalleryVertical, Home, ArrowDownUp, FilterIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const GaleriaBienestarPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"date-desc" | "date-asc">("date-desc")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const uniqueCategories = useMemo(() => {
    const categories = new Set(mockEvents.map((event) => event.category).filter(Boolean) as string[])
    return ["all", ...Array.from(categories).sort((a, b) => a.localeCompare(b))]
  }, [])

  const processedEvents = useMemo(() => {
    let events = mockEvents.map((event) => ({ ...event }))

    if (filterCategory !== "all") {
      events = events.filter((event) => event.category === filterCategory)
    }

    if (sortOrder === "date-desc") {
      events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortOrder === "date-asc") {
      events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    return events.map((event, index) => ({
      ...event,
      _sortKey: `${sortOrder}-${filterCategory}-${index}`,
    }))
  }, [sortOrder, filterCategory])

  const totalPages = Math.ceil(processedEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const eventsToDisplay = processedEvents.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    window.scrollTo(0, 0)
    setCurrentPage(1) // Reset to first page when filters change
  }, [sortOrder, filterCategory])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <MainLayout>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8 py-10">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center space-x-2 text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Inicio
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1 font-medium text-foreground">
                <GalleryVertical className="h-4 w-4" />
                Galería de Bienestar
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto pt-6 pb-2 px-4 md:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Image className="h-8 w-8 text-primary-prosalud-dark" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-prosalud-dark tracking-tight">
              Galería de Bienestar
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 mb-4">
            Explora los momentos y actividades que hemos compartido juntos, fortaleciendo nuestra comunidad ProSalud.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center sm:justify-start items-center">
          <div className="flex flex-col items-start gap-1.5 w-full sm:w-auto">
            <Label htmlFor="sort-order" className="text-sm font-medium text-muted-foreground flex items-center">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Ordenar por
            </Label>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "date-desc" | "date-asc")}>
              <SelectTrigger id="sort-order" className="w-full sm:w-[180px] bg-background">
                <SelectValue placeholder="Seleccionar orden..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Más recientes</SelectItem>
                <SelectItem value="date-asc">Más antiguos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-1.5 w-full sm:w-auto">
            <Label htmlFor="filter-category" className="text-sm font-medium text-muted-foreground flex items-center">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filtrar por categoría
            </Label>
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value)}>
              <SelectTrigger id="filter-category" className="w-full sm:w-[220px] bg-background">
                <SelectValue placeholder="Seleccionar categoría..." />
              </SelectTrigger>
              <SelectContent>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Todas las categorías" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {eventsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {eventsToDisplay.map((event) => (
              <EventCard key={`${event.id}-${event._sortKey}`} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No hay eventos para mostrar con los filtros seleccionados.</p>
          </div>
        )}

        {totalPages > 1 && (
          <EventsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default GaleriaBienestarPage

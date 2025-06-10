'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

interface BaseSlide {
  id: string;
  type: 'title' | 'text' | 'image' | 'chart';
}

interface TitleSlide extends BaseSlide {
  type: 'title';
  content: {
    title: string;
    subtitle: string;
  };
}

interface TextSlide extends BaseSlide {
  type: 'text';
  content: {
    text: string;
  };
}

interface ImageSlide extends BaseSlide {
  type: 'image';
  content: {
    imageUrl: string;
    caption?: string;
  };
}

interface ChartSlide extends BaseSlide {
  type: 'chart';
  content: {
    chartType: 'bar' | 'line' | 'pie';
    data: Record<string, number>;
    title?: string;
  };
}

type Slide = TitleSlide | TextSlide | ImageSlide | ChartSlide;

interface PitchDeck {
  id: string;
  title: string;
  slides: Slide[];
}

export default function Editor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [pitchDeck, setPitchDeck] = useState<PitchDeck | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null)

  useEffect(() => {
    // TODO: Fetch pitch deck from API
    // Mock data for now
    if (params.id === 'new') {
      setPitchDeck({
        id: 'new',
        title: 'Untitled Pitch Deck',
        slides: [
          {
            id: '1',
            type: 'title',
            content: {
              title: 'Untitled Slide',
              subtitle: 'Add your subtitle here',
            },
          },
        ],
      })
    } else {
      setPitchDeck({
        id: params.id,
        title: 'My Pitch Deck',
        slides: [
          {
            id: '1',
            type: 'title',
            content: {
              title: 'Welcome',
              subtitle: 'This is a sample slide',
            },
          },
        ],
      })
    }
    setIsLoading(false)
  }, [params.id])

  const handleAddSlide = (type: Slide['type']) => {
    if (!pitchDeck) return;

    let newSlide: Slide;
    switch (type) {
      case 'title':
        newSlide = {
          id: Date.now().toString(),
          type: 'title',
          content: {
            title: 'New Slide',
            subtitle: 'Add your subtitle here',
          },
        };
        break;
      case 'text':
        newSlide = {
          id: Date.now().toString(),
          type: 'text',
          content: {
            text: 'Add your text here',
          },
        };
        break;
      case 'image':
        newSlide = {
          id: Date.now().toString(),
          type: 'image',
          content: {
            imageUrl: '',
            caption: 'Add your caption here',
          },
        };
        break;
      case 'chart':
        newSlide = {
          id: Date.now().toString(),
          type: 'chart',
          content: {
            chartType: 'bar',
            data: {},
            title: 'New Chart',
          },
        };
        break;
    }

    setPitchDeck({
      ...pitchDeck,
      slides: [...pitchDeck.slides, newSlide],
    });
    setSelectedSlide(newSlide.id);
  };

  const handleDeleteSlide = (slideId: string) => {
    if (!pitchDeck) return

    setPitchDeck({
      ...pitchDeck,
      slides: pitchDeck.slides.filter(slide => slide.id !== slideId),
    })
    setSelectedSlide(null)
  }

  const handleMoveSlide = (slideId: string, direction: 'up' | 'down') => {
    if (!pitchDeck) return

    const currentIndex = pitchDeck.slides.findIndex(slide => slide.id === slideId)
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === pitchDeck.slides.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const newSlides = [...pitchDeck.slides]
    const [movedSlide] = newSlides.splice(currentIndex, 1)
    newSlides.splice(newIndex, 0, movedSlide)

    setPitchDeck({
      ...pitchDeck,
      slides: newSlides,
    })
  }

  const handleUpdateSlide = (slideId: string, content: Partial<TitleSlide['content']> | Partial<TextSlide['content']> | Partial<ImageSlide['content']> | Partial<ChartSlide['content']>) => {
    if (!pitchDeck) return;

    setPitchDeck({
      ...pitchDeck,
      slides: pitchDeck.slides.map(slide => {
        if (slide.id !== slideId) return slide;
        switch (slide.type) {
          case 'title': {
            const prev = slide.content as TitleSlide['content'];
            const c = content as Partial<TitleSlide['content']>;
            return {
              ...slide,
              content: {
                title: c.title ?? prev.title,
                subtitle: c.subtitle ?? prev.subtitle,
              },
            };
          }
          case 'text': {
            const prev = slide.content as TextSlide['content'];
            const c = content as Partial<TextSlide['content']>;
            return {
              ...slide,
              content: {
                text: c.text ?? prev.text,
              },
            };
          }
          case 'image': {
            const prev = slide.content as ImageSlide['content'];
            const c = content as Partial<ImageSlide['content']>;
            return {
              ...slide,
              content: {
                imageUrl: c.imageUrl ?? prev.imageUrl,
                caption: c.caption ?? prev.caption,
              },
            };
          }
          case 'chart': {
            const prev = slide.content as ChartSlide['content'];
            const c = content as Partial<ChartSlide['content']>;
            return {
              ...slide,
              content: {
                chartType: c.chartType ?? prev.chartType,
                data: c.data ?? prev.data,
                title: c.title ?? prev.title,
              },
            };
          }
          default:
            return slide;
        }
      }),
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="mb-4">
            <input
              type="text"
              value={pitchDeck?.title}
              onChange={(e) => setPitchDeck(pitchDeck ? { ...pitchDeck, title: e.target.value } : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Untitled Pitch Deck"
            />
          </div>

          <div className="space-y-2">
            {pitchDeck?.slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`p-3 rounded-md cursor-pointer ${
                  selectedSlide === slide.id ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSlide(slide.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Slide {index + 1}</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMoveSlide(slide.id, 'up')
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ArrowUpIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMoveSlide(slide.id, 'down')
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ArrowDownIcon className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteSlide(slide.id)
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleAddSlide('title')}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Title Slide
            </button>
            <button
              onClick={() => handleAddSlide('text')}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Text Slide
            </button>
            <button
              onClick={() => handleAddSlide('image')}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Image Slide
            </button>
            <button
              onClick={() => handleAddSlide('chart')}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Chart Slide
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {selectedSlide && pitchDeck && (
            <div className="max-w-4xl mx-auto">
              {pitchDeck.slides.find(slide => slide.id === selectedSlide)?.type === 'title' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={(pitchDeck.slides.find(slide => slide.id === selectedSlide)?.content as TitleSlide['content']).title || ''}
                    onChange={(e) => handleUpdateSlide(selectedSlide, {
                      title: e.target.value,
                    })}
                    className="w-full text-4xl font-bold px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter title"
                  />
                  <input
                    type="text"
                    value={(pitchDeck.slides.find(slide => slide.id === selectedSlide)?.content as TitleSlide['content']).subtitle || ''}
                    onChange={(e) => handleUpdateSlide(selectedSlide, {
                      subtitle: e.target.value,
                    })}
                    className="w-full text-xl px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter subtitle"
                  />
                </div>
              )}
              {/* Add other slide type editors here */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
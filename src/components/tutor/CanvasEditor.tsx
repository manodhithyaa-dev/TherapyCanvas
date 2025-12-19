import { useState, useRef, useCallback, useEffect } from 'react';
import { CanvasElement, Asset } from '@/types/therapy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Type,
  Square,
  Circle,
  Trash2,
  Copy,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Target,
  Download,
  Image,
  FileText
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CanvasEditorProps {
  elements: CanvasElement[];
  onElementsChange: (elements: CanvasElement[]) => void;
  onAddAsset: (asset: Asset, x: number, y: number) => void;
}

export function CanvasEditor({ elements, onElementsChange, onAddAsset }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf'>('png');

  const selectedElement = elements.find(el => el.id === selectedId);
  const editingElement = elements.find(el => el.id === editingId);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const exportCanvas = async (format: 'png' | 'pdf') => {
    if (!canvasRef.current) return;

    try {
      // Temporarily reset zoom to 1 for export to avoid scaling issues
      const currentZoom = zoom;
      setZoom(1);
      
      // Wait for zoom to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvasElement = canvasRef.current;
      
      if (format === 'png') {
        const canvas = await html2canvas(canvasElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
        });
        
        const link = document.createElement('a');
        link.download = `canvas-export-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else {
        const canvas = await html2canvas(canvasElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`canvas-export-${Date.now()}.pdf`);
      }
      
      // Restore original zoom
      setZoom(currentZoom);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedId(null);
      setEditingId(null);
    }
  };

  const handleElementMouseDown = (e: React.MouseEvent, element: CanvasElement) => {
    if (editingId === element.id) return;
    
    e.stopPropagation();
    setSelectedId(element.id);
    setDraggedId(element.id);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleElementDoubleClick = (e: React.MouseEvent, element: CanvasElement) => {
    if (element.type === 'text') {
      e.stopPropagation();
      setEditingId(element.id);
      setSelectedId(element.id);
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedId || !canvasRef.current || editingId) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = (e.clientX - canvasRect.left - dragOffset.x) / zoom;
    const newY = (e.clientY - canvasRect.top - dragOffset.y) / zoom;

    onElementsChange(
      elements.map(el =>
        el.id === draggedId
          ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) }
          : el
      )
    );
  }, [draggedId, dragOffset, zoom, elements, onElementsChange, editingId]);

  const handleMouseUp = () => {
    setDraggedId(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingId) {
      onElementsChange(
        elements.map(el =>
          el.id === editingId
            ? { ...el, content: e.target.value }
            : el
        )
      );
    }
  };

  const handleEditInputBlur = () => {
    setEditingId(null);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const assetData = e.dataTransfer.getData('asset');
    if (assetData && canvasRef.current) {
      const asset = JSON.parse(assetData) as Asset;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      onAddAsset(asset, x, y);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const addTextElement = () => {
    const newElement: CanvasElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 100,
      y: 100,
      width: 150,
      height: 40,
      content: 'Text',
      style: {
        fontSize: 20,
        fontColor: 'hsl(var(--foreground))',
      },
    };
    onElementsChange([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const addShapeElement = (shape: 'rectangle' | 'circle') => {
    const newElement: CanvasElement = {
      id: `shape-${Date.now()}`,
      type: 'shape',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      content: shape,
      style: {
        backgroundColor: 'hsl(var(--muted))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 2,
        borderRadius: shape === 'circle' ? 50 : 8,
      },
    };
    onElementsChange([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const addDropZone = () => {
    const newElement: CanvasElement = {
      id: `dropzone-${Date.now()}`,
      type: 'shape',
      x: 100,
      y: 100,
      width: 120,
      height: 120,
      content: 'rectangle',
      style: {
        backgroundColor: 'hsl(var(--muted) / 0.5)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 3,
        borderRadius: 12,
      },
      isDropZone: true,
    };
    onElementsChange([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const deleteElement = () => {
    if (selectedId) {
      onElementsChange(elements.filter(el => el.id !== selectedId));
      setSelectedId(null);
      setEditingId(null);
    }
  };

  const duplicateElement = () => {
    if (selectedElement) {
      const newElement: CanvasElement = {
        ...selectedElement,
        id: `${selectedElement.type}-${Date.now()}`,
        x: selectedElement.x + 20,
        y: selectedElement.y + 20,
      };
      onElementsChange([...elements, newElement]);
      setSelectedId(newElement.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-muted/30">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-card border-b border-border">
        <div className="flex items-center gap-1 border-r border-border pr-3 mr-2">
          <Button variant="ghost" size="icon-sm" onClick={addTextElement} title="Add Text">
            <Type className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => addShapeElement('rectangle')} title="Add Rectangle">
            <Square className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => addShapeElement('circle')} title="Add Circle">
            <Circle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={addDropZone} title="Add Drop Zone">
            <Target className="w-4 h-4" />
          </Button>
        </div>

        {selectedId && (
          <div className="flex items-center gap-1 border-r border-border pr-3 mr-2">
            <Button variant="ghost" size="icon-sm" onClick={duplicateElement} title="Duplicate">
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={deleteElement} title="Delete">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )}

        {/* Export Section */}
        <div className="flex items-center gap-1 border-r border-border pr-3 mr-2">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'png' | 'pdf')}
            className="text-sm border border-border bg-card rounded-md px-2 py-1 text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </select>
          <Button 
            variant="ghost" 
            size="icon-sm" 
            onClick={() => exportCanvas(exportFormat)}
            title="Export Canvas"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setZoom(1)}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-6 relative">
        <div
          ref={canvasRef}
          className="relative bg-card rounded-2xl shadow-medium canvas-grid mx-auto"
          style={{
            width: 800 * zoom,
            height: 600 * zoom,
            minWidth: 800 * zoom,
            minHeight: 600 * zoom,
          }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {elements.map((element) => {
            const isSelected = selectedId === element.id;
            const isEditing = editingId === element.id;
            
            return (
              <div
                key={element.id}
                className={`absolute cursor-move select-none transition-shadow group ${
                  isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                } ${element.isDropZone ? 'border-dashed' : ''}`}
                style={{
                  left: element.x * zoom,
                  top: element.y * zoom,
                  width: element.width * zoom,
                  height: element.height * zoom,
                  backgroundColor: element.style?.backgroundColor,
                  borderColor: element.style?.borderColor,
                  borderWidth: element.style?.borderWidth,
                  borderRadius: element.style?.borderRadius,
                  borderStyle: element.isDropZone ? 'dashed' : 'solid',
                }}
                onMouseDown={(e) => handleElementMouseDown(e, element)}
                onDoubleClick={(e) => handleElementDoubleClick(e, element)}
              >
                {element.type === 'text' && !isEditing && (
                  <div
                    className="w-full h-full flex items-center justify-center font-semibold p-2 box-border"
                    style={{
                      fontSize: Math.max(12, (element.style?.fontSize || 16) * zoom),
                      color: element.style?.fontColor,
                      lineHeight: 1.2,
                      wordBreak: 'break-word',
                      overflow: 'hidden',
                    }}
                  >
                    {element.content}
                  </div>
                )}
                
                {element.type === 'image' && (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <span style={{ fontSize: 40 * zoom }}>{element.content}</span>
                  </div>
                )}
                
                {element.isDropZone && (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground opacity-50">
                    <Target className="w-6 h-6" />
                  </div>
                )}

                {/* Editable Input Overlay */}
                {isEditing && element.type === 'text' && (
                  <Input
                    ref={editInputRef}
                    className="absolute inset-0 border-none bg-transparent text-inherit rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 p-1 h-full"
                    style={{
                      fontSize: Math.max(12, (element.style?.fontSize || 16) * zoom),
                      fontFamily: 'inherit',
                      lineHeight: 1.2,
                      color: element.style?.fontColor,
                    }}
                    value={element.content}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputBlur}
                    onKeyDown={handleEditKeyDown}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedElement && !editingId && (
        <div className="p-4 bg-card border-t border-border">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Width</label>
              <Input
                type="number"
                value={selectedElement.width}
                onChange={(e) =>
                  onElementsChange(
                    elements.map(el =>
                      el.id === selectedId
                        ? { ...el, width: parseInt(e.target.value) || 0 }
                        : el
                    )
                  )
                }
                className="w-20 h-8"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Height</label>
              <Input
                type="number"
                value={selectedElement.height}
                onChange={(e) =>
                  onElementsChange(
                    elements.map(el =>
                      el.id === selectedId
                        ? { ...el, height: parseInt(e.target.value) || 0 }
                        : el
                    )
                  )
                }
                className="w-20 h-8"
              />
            </div>
            {selectedElement.type === 'text' && (
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Text</label>
                <Input
                  value={selectedElement.content}
                  onChange={(e) =>
                    onElementsChange(
                      elements.map(el =>
                        el.id === selectedId
                          ? { ...el, content: e.target.value }
                          : el
                      )
                    )
                  }
                  className="h-8"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

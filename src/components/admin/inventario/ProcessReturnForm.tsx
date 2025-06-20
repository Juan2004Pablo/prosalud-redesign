
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Plus, Trash } from 'lucide-react';

interface ReturnItem {
  id: string;
  productName: string;
  category: string;
  size?: string;
  color?: string;
  quantity: number;
  condition: 'new' | 'used' | 'damaged';
  reason: string;
}

interface ProcessReturnFormProps {
  onClose: () => void;
}

const ProcessReturnForm: React.FC<ProcessReturnFormProps> = ({ onClose }) => {
  const [hospitalName, setHospitalName] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<ReturnItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<ReturnItem>>({
    productName: '',
    category: '',
    quantity: 0,
    condition: 'new',
    reason: ''
  });

  const hospitals = [
    'Hospital Marco Fidel Suárez',
    'Hospital San Juan de Dios',
    'Hospital La Merced',
    'Hospital Santa Elena',
    'Hospital Venancio Díaz'
  ];

  const categories = ['Uniformes', 'Tapabocas', 'Batas', 'Regalos'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Azul', 'Verde', 'Blanco', 'Gris'];
  const reasons = [
    { value: 'excess', label: 'Exceso de inventario' },
    { value: 'incorrect', label: 'Producto incorrecto' },
    { value: 'defective', label: 'Producto defectuoso' },
    { value: 'expired', label: 'Producto vencido' },
    { value: 'other', label: 'Otro motivo' }
  ];
  const conditions = [
    { value: 'new', label: 'Nuevo' },
    { value: 'used', label: 'Usado' },
    { value: 'damaged', label: 'Dañado' }
  ];

  const addItem = () => {
    if (newItem.productName && newItem.category && newItem.quantity && newItem.condition && newItem.reason) {
      const item: ReturnItem = {
        id: Date.now().toString(),
        productName: newItem.productName,
        category: newItem.category,
        size: newItem.size,
        color: newItem.color,
        quantity: newItem.quantity,
        condition: newItem.condition as 'new' | 'used' | 'damaged',
        reason: newItem.reason
      };
      setItems([...items, item]);
      setNewItem({
        productName: '',
        category: '',
        quantity: 0,
        condition: 'new',
        reason: ''
      });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    const returnData = {
      hospitalName,
      coordinatorName,
      returnDate,
      returnReason,
      notes,
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0)
    };
    
    console.log('Nueva devolución procesada:', returnData);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <RotateCcw className="h-6 w-6 text-primary-prosalud" />
        <h2 className="text-2xl font-bold text-gray-900">Procesar Devolución</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hospital">Hospital</Label>
          <Select value={hospitalName} onValueChange={setHospitalName}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar hospital" />
            </SelectTrigger>
            <SelectContent>
              {hospitals.map(hospital => (
                <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="coordinator">Coordinador</Label>
          <Input
            id="coordinator"
            value={coordinatorName}
            onChange={(e) => setCoordinatorName(e.target.value)}
            placeholder="Nombre del coordinador"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Fecha de Devolución</Label>
          <Input
            id="date"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason">Motivo Principal</Label>
          <Select value={returnReason} onValueChange={setReturnReason}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar motivo" />
            </SelectTrigger>
            <SelectContent>
              {reasons.map(reason => (
                <SelectItem key={reason.value} value={reason.value}>{reason.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas Adicionales</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Información adicional sobre la devolución..."
          rows={3}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agregar Productos a Devolver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Producto</Label>
              <Input
                value={newItem.productName || ''}
                onChange={(e) => setNewItem({...newItem, productName: e.target.value})}
                placeholder="Nombre del producto"
              />
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={newItem.category || ''}
                onValueChange={(value) => setNewItem({...newItem, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Talla (opcional)</Label>
              <Select
                value={newItem.size || ''}
                onValueChange={(value) => setNewItem({...newItem, size: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar talla" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Color (opcional)</Label>
              <Select
                value={newItem.color || ''}
                onValueChange={(value) => setNewItem({...newItem, color: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cantidad</Label>
              <Input
                type="number"
                value={newItem.quantity || ''}
                onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Condición</Label>
              <Select
                value={newItem.condition || ''}
                onValueChange={(value) => setNewItem({...newItem, condition: value as 'new' | 'used' | 'damaged'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar condición" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem key={condition.value} value={condition.value}>{condition.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <Label>Motivo Específico</Label>
              <Input
                value={newItem.reason || ''}
                onChange={(e) => setNewItem({...newItem, reason: e.target.value})}
                placeholder="Motivo específico del producto"
              />
            </div>
          </div>
          <Button onClick={addItem} className="w-full bg-primary-prosalud hover:bg-primary-prosalud-dark">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
          </Button>
        </CardContent>
      </Card>

      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Productos a Devolver</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Talla</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Condición</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.size || '-'}</TableCell>
                      <TableCell>{item.color || '-'}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.condition === 'new' ? 'bg-green-100 text-green-700' :
                          item.condition === 'used' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {conditions.find(c => c.value === item.condition)?.label}
                        </span>
                      </TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!hospitalName || !coordinatorName || !returnDate || !returnReason || items.length === 0}
          className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
        >
          Procesar Devolución
        </Button>
      </div>
    </div>
  );
};

export default ProcessReturnForm;

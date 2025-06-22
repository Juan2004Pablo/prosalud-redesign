
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, Plus, Trash } from 'lucide-react';

interface RequestItem {
  id: string;
  productName: string;
  category: string;
  size?: string;
  color?: string;
  quantity: number;
  justification: string;
}

interface NewRequestFormProps {
  onClose: () => void;
}

const NewRequestForm: React.FC<NewRequestFormProps> = ({ onClose }) => {
  const [hospitalName, setHospitalName] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [priority, setPriority] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<RequestItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<RequestItem>>({
    productName: '',
    category: '',
    quantity: 0,
    justification: ''
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
  const priorities = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' }
  ];

  const addItem = () => {
    if (newItem.productName && newItem.category && newItem.quantity && newItem.justification) {
      const item: RequestItem = {
        id: Date.now().toString(),
        productName: newItem.productName,
        category: newItem.category,
        size: newItem.size,
        color: newItem.color,
        quantity: newItem.quantity,
        justification: newItem.justification
      };
      setItems([...items, item]);
      setNewItem({
        productName: '',
        category: '',
        quantity: 0,
        justification: ''
      });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    const request = {
      hospitalName,
      coordinatorName,
      coordinatorEmail,
      priority,
      notes,
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      requestDate: new Date().toISOString().split('T')[0]
    };
    
    console.log('Nueva solicitud creada:', request);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <ClipboardList className="h-6 w-6 text-primary-prosalud" />
        <h2 className="text-2xl font-bold text-gray-900">Nueva Solicitud de Implementos</h2>
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
          <Label htmlFor="email">Email del Coordinador</Label>
          <Input
            id="email"
            type="email"
            value={coordinatorEmail}
            onChange={(e) => setCoordinatorEmail(e.target.value)}
            placeholder="coordinador@hospital.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar prioridad" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map(p => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
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
          placeholder="Información adicional sobre la solicitud..."
          rows={3}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agregar Implementos</CardTitle>
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
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <Label>Justificación</Label>
              <Textarea
                value={newItem.justification || ''}
                onChange={(e) => setNewItem({...newItem, justification: e.target.value})}
                placeholder="Motivo de la solicitud..."
                rows={2}
              />
            </div>
          </div>
          <Button onClick={addItem} className="w-full bg-primary-prosalud hover:bg-primary-prosalud-dark">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Implemento
          </Button>
        </CardContent>
      </Card>

      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Implementos Solicitados</CardTitle>
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
                    <TableHead>Justificación</TableHead>
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
                      <TableCell className="max-w-xs truncate">{item.justification}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-600 hover:bg-red-50"
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
          disabled={!hospitalName || !coordinatorName || !coordinatorEmail || !priority || items.length === 0}
          className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
        >
          Crear Solicitud
        </Button>
      </div>
    </div>
  );
};

export default NewRequestForm;

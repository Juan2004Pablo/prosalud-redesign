
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
  priority: 'low' | 'medium' | 'high';
  notes: string;
}

interface NewRequestFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const NewRequestForm: React.FC<NewRequestFormProps> = ({ onClose, onSuccess }) => {
  const [hospitalName, setHospitalName] = useState('');
  const [coordinatorName, setCoordinatorName] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [items, setItems] = useState<RequestItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<RequestItem>>({
    productName: '',
    category: '',
    quantity: 0,
    priority: 'medium',
    notes: ''
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
    { value: 'high', label: 'Alta' }
  ];

  const addItem = () => {
    if (newItem.productName && newItem.category && newItem.quantity && newItem.priority) {
      const item: RequestItem = {
        id: Date.now().toString(),
        productName: newItem.productName,
        category: newItem.category,
        size: newItem.size,
        color: newItem.color,
        quantity: newItem.quantity,
        priority: newItem.priority as 'low' | 'medium' | 'high',
        notes: newItem.notes || ''
      };
      setItems([...items, item]);
      setNewItem({
        productName: '',
        category: '',
        quantity: 0,
        priority: 'medium',
        notes: ''
      });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    const requestData = {
      hospitalName,
      coordinatorName,
      requestDate,
      deliveryDate,
      generalNotes,
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0)
    };
    
    console.log('Nueva solicitud creada:', requestData);
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <ClipboardList className="h-6 w-6 text-primary-prosalud" />
        <h2 className="text-2xl font-bold text-gray-900">Nueva Solicitud</h2>
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
          <Label htmlFor="requestDate">Fecha de Solicitud</Label>
          <Input
            id="requestDate"
            type="date"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryDate">Fecha de Entrega Requerida</Label>
          <Input
            id="deliveryDate"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="generalNotes">Notas Generales</Label>
        <Textarea
          id="generalNotes"
          value={generalNotes}
          onChange={(e) => setGeneralNotes(e.target.value)}
          placeholder="Información adicional sobre la solicitud..."
          rows={3}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agregar Productos Solicitados</CardTitle>
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
              <Label>Prioridad</Label>
              <Select
                value={newItem.priority || ''}
                onValueChange={(value) => setNewItem({...newItem, priority: value as 'low' | 'medium' | 'high'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <Label>Notas del Producto</Label>
              <Input
                value={newItem.notes || ''}
                onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                placeholder="Notas específicas del producto"
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
            <CardTitle>Productos Solicitados</CardTitle>
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
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Notas</TableHead>
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
                          item.priority === 'high' ? 'bg-red-100 text-red-700' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {priorities.find(p => p.value === item.priority)?.label}
                        </span>
                      </TableCell>
                      <TableCell>{item.notes || '-'}</TableCell>
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
          disabled={!hospitalName || !coordinatorName || !requestDate || !deliveryDate || items.length === 0}
          className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
        >
          Crear Solicitud
        </Button>
      </div>
    </div>
  );
};

export default NewRequestForm;

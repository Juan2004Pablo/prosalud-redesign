
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Plus, Trash } from 'lucide-react';

interface DeliveryItem {
  id: string;
  productName: string;
  category: string;
  size?: string;
  color?: string;
  quantity: number;
  unitCost: number;
}

interface NewDeliveryFormProps {
  onClose: () => void;
}

const NewDeliveryForm: React.FC<NewDeliveryFormProps> = ({ onClose }) => {
  const [supplierName, setSupplierName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [items, setItems] = useState<DeliveryItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<DeliveryItem>>({
    productName: '',
    category: '',
    quantity: 0,
    unitCost: 0
  });

  const categories = ['Uniformes', 'Tapabocas', 'Batas', 'Regalos'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Azul', 'Verde', 'Blanco', 'Gris'];

  const addItem = () => {
    if (newItem.productName && newItem.category && newItem.quantity && newItem.unitCost) {
      const item: DeliveryItem = {
        id: Date.now().toString(),
        productName: newItem.productName,
        category: newItem.category,
        size: newItem.size,
        color: newItem.color,
        quantity: newItem.quantity,
        unitCost: newItem.unitCost
      };
      setItems([...items, item]);
      setNewItem({
        productName: '',
        category: '',
        quantity: 0,
        unitCost: 0
      });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    const delivery = {
      supplierName,
      deliveryDate,
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalCost: items.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0)
    };
    
    console.log('Nueva entrega registrada:', delivery);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Truck className="h-6 w-6 text-primary-prosalud" />
        <h2 className="text-2xl font-bold text-gray-900">Registrar Nueva Entrega</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="supplier">Proveedor</Label>
          <Input
            id="supplier"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="Nombre del proveedor"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Fecha de Entrega</Label>
          <Input
            id="date"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agregar Productos</CardTitle>
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
              <Label>Costo Unitario</Label>
              <Input
                type="number"
                value={newItem.unitCost || ''}
                onChange={(e) => setNewItem({...newItem, unitCost: parseFloat(e.target.value) || 0})}
                placeholder="0.00"
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
            <CardTitle>Productos a Recibir</CardTitle>
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
                    <TableHead>Costo Unit.</TableHead>
                    <TableHead>Total</TableHead>
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
                      <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                      <TableCell>${(item.quantity * item.unitCost).toFixed(2)}</TableCell>
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
          disabled={!supplierName || !deliveryDate || items.length === 0}
          className="bg-primary-prosalud hover:bg-primary-prosalud-dark"
        >
          Registrar Entrega
        </Button>
      </div>
    </div>
  );
};

export default NewDeliveryForm;

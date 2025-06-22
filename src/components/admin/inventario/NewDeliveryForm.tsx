import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Minus, Package, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeliveryItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface NewDeliveryFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const NewDeliveryForm: React.FC<NewDeliveryFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    supplierName: '',
    deliveryDate: '',
    invoiceNumber: '',
    totalAmount: 0
  });
  const [items, setItems] = useState<DeliveryItem[]>([
    { productName: '', quantity: 0, unitPrice: 0 }
  ]);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    // Recalculate total amount when quantity or unit price changes
    if (field === 'quantity' || field === 'unitPrice') {
      recalculateTotalAmount(updatedItems);
    }
  };

  const recalculateTotalAmount = (updatedItems: DeliveryItem[]) => {
    const newTotalAmount = updatedItems.reduce((acc, item) => {
      return acc + (Number(item.quantity) * Number(item.unitPrice));
    }, 0);

    setFormData(prevData => ({
      ...prevData,
      totalAmount: newTotalAmount
    }));
  };

  const addItem = () => {
    setItems([...items, { productName: '', quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    recalculateTotalAmount(updatedItems); // Recalculate total amount after removing item
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.supplierName || !formData.deliveryDate || items.some(item => !item.productName || item.quantity <= 0)) {
      toast({
        title: "Error de Validación",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    console.log('Registrando nueva entrega:', { formData, items });
    
    if (onSuccess) {
      onSuccess();
    } else {
      toast({
        title: "Entrega Registrada",
        description: "La nueva entrega ha sido registrada exitosamente",
        variant: "success"
      });
      onClose();
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <Truck className="h-5 w-5" />
          <span>Registrar Nueva Entrega</span>
        </DialogTitle>
        <DialogDescription>
          Registra una nueva entrega de proveedor al inventario
        </DialogDescription>
      </DialogHeader>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplierName">Proveedor</Label>
                <Input
                  type="text"
                  id="supplierName"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  placeholder="Nombre del proveedor"
                />
              </div>
              <div>
                <Label htmlFor="deliveryDate">Fecha de Entrega</Label>
                <Input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNumber">Número de Factura</Label>
                <Input
                  type="text"
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  placeholder="Número de factura"
                />
              </div>
              <div>
                <Label htmlFor="totalAmount">Monto Total</Label>
                <Input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  readOnly
                  placeholder="Monto total"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Items Entregados</Label>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <Label htmlFor={`productName-${index}`}>Producto</Label>
                    <Input
                      type="text"
                      id={`productName-${index}`}
                      placeholder="Nombre del producto"
                      value={item.productName}
                      onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${index}`}>Cantidad</Label>
                    <Input
                      type="number"
                      id={`quantity-${index}`}
                      placeholder="Cantidad"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`unitPrice-${index}`}>Precio Unitario</Label>
                    <Input
                      type="number"
                      id={`unitPrice-${index}`}
                      placeholder="Precio"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(index)}
                      className="hover:bg-red-50 hover:text-red-500"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="secondary" 
                onClick={addItem}
                className="w-full justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Item
              </Button>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Registrar Entrega
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default NewDeliveryForm;

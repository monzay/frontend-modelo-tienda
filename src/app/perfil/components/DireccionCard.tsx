import React from 'react';
import Button from "@/components/ui/btn/button";
import { Direccion } from '../page';
interface DireccionCardProps { direccion:Direccion }

const DireccionCard: React.FC<DireccionCardProps> = ({ direccion }) => {
  return (
    <div className="grid gap-4">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4" data-v0-t="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-lg font-medium">Dirección</h3>
              <p className="text-muted-foreground text-sm">Calle: {direccion.street}</p>
              <p className="text-muted-foreground text-sm">Ciudad: {direccion.city}</p>
              <p className="text-muted-foreground text-sm">Colonia: {direccion.neighborhood}</p>
              <p className="text-muted-foreground text-sm">Código postal: {direccion.zipCode}</p>
              <p className="text-muted-foreground text-sm">Estado: {direccion.state}</p>
              <Button txt="Eliminar"  click={()=> alert("eliminar")} />
              <Button txt="Actualizar"  click={()=> alert("eliminar")}/>
            </div>
          </div>
          <div className="text-right"></div>
        </div>
      </div>
    </div>
  );
};

export default DireccionCard;
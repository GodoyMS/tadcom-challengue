import { UserTable } from "@/interfaces/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface EditUserProps {
  selectedRow: UserTable | null;
  setSelectedRow: React.Dispatch<React.SetStateAction<UserTable | null>>;
  setUsersData:React.Dispatch<React.SetStateAction<UserTable[]>>;
  usersData:UserTable[];

}
const Edituser = ({ setUsersData,usersData,selectedRow, setSelectedRow }: EditUserProps) => {
  const [user, setuser] = useState<UserTable | null>(selectedRow);

  useEffect(() => {
    setuser(selectedRow);
  }, [selectedRow]);


  const updateUser = ( ) => {
    setUsersData((prevUsers) =>
        prevUsers.map((prevUser) =>
            prevUser.id === user?.id ? user  : prevUser
      )
    );

    setSelectedRow(null)
    toast.success("Usuario actualizado")
 
  };
  return (
    <Dialog
      open={Boolean(selectedRow)}
      onOpenChange={() => setSelectedRow(null)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar usuario</DialogTitle>
          <DialogDescription>
            Has cambios al usuario y presiona guardar
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div>
            <div className=" flex justify-start gap-2 items-center mb-4">
              <img
                src={user.image}
                alt={user.name}
                className=" w-16 h-16 object-cover rounded-full"
              />
              <div className=" flex flex-col ">
                <h2 className=" font-bold text-2xl text-secondary-foreground">
                    {user.name}
                </h2>
                <p className=" font-normal  text-slate-600">
                    {user.email}
                </p>
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={user.name}
                  onChange={(val) =>
                    setuser((prev) => {
                      if (!prev) {
                        return prev;
                      }
                      return { ...prev, name: val.target.value };
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-left">
                  Dirección
                </Label>
                <Input
                  id="address"
                  value={user.address}
                  onChange={(val) =>
                    setuser((prev) => {
                      if (!prev) {
                        return prev;
                      }
                      return { ...prev, address: val.target.value };
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-left">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  value={user.phone}
                  onChange={(val) =>
                    setuser((prev) => {
                      if (!prev) {
                        return prev;
                      }
                      return { ...prev, phone: val.target.value };
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(val) =>
                    setuser((prev) => {
                      if (!prev) {
                        return prev;
                      }
                      return { ...prev, email: val.target.value };
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={updateUser} type="button">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Edituser;

import React, { useActionState } from "react";

import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EMPTY_ACTION_STATE, type ActionState } from "@/lib/form/forms";

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactNode;
};

export default function ConfirmDialog({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences.",
  action,
  trigger,
}: ConfirmDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            asChild
            // className={buttonVariants({ variant: "default" })}
          >
            <Form
              actionState={actionState}
              action={formAction}
              onSuccess={() => setOpen(false)}
            >
              <SubmitButton label="Continue" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

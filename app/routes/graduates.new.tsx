import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createGraduate } from "~/models/graduate.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const maidenName = formData.get("maidenName");
  const lastName = formData.get("lastName");

  if (typeof firstName !== "string" || firstName.length === 0) {
    return json(
      { errors: { title: "First name is required", body: null } },
      { status: 400 }
    );
  }

  if (typeof lastName !== "string" || lastName.length === 0) {
    return json(
      { errors: { title: null, body: "Last name is required" } },
      { status: 400 }
    );
  }

  const graduate = await createGraduate({ email, firstName, maidenName, lastName, addressStreet: '', addressCity: '', addressState: '', addressZip: '', graduationYear: '1955'  });

  return redirect(`/graduates/${graduate.id}`);
}

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  const maidenNameRef = React.useRef<HTMLInputElement>(null);
  const lastNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.firstName) {
      firstNameRef.current?.focus();
    } else if (actionData?.errors?.lastName) {
      lastNameRef.current?.focus();
    }
    else if (actionData?.errors?.maidenName) {
      maidenNameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>First Name: </span>
          <input
            ref={firstNameRef}
            name="firstName"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.firstName ? true : undefined}
            aria-errormessage={
              actionData?.errors?.firstName ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.firstName && (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.firstName}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Maiden Name: </span>
          <input
            ref={maidenNameRef}
            name="maidenName"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.maidenName ? true : undefined}
            aria-errormessage={
              actionData?.errors?.maidenName ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.maidenName && (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.maidenName}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Last Name: </span>
          <input
            ref={lastNameRef}
            name="lastName"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.lastName ? true : undefined}
            aria-errormessage={
              actionData?.errors?.lastName ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.lastName && (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.lastName}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Email: </span>
          <input
            ref={emailRef}
            name="email"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-errormessage={
              actionData?.errors?.email ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.email && (
          <div className="pt-1 text-red-700" id="email-error">
            {actionData.errors.email}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

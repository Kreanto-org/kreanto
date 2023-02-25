/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import Button from "~/components/ui/button";
import { api } from "~/utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import useIsMobile from "~/hooks/useIsMobile";
import Layout from "~/components/shared/layout";
import type { Color, ColorType, PrintTime } from "@prisma/client";
import AgeLocation from "~/components/specific/sign-up/age-location";
import PrintVolumeSection from "~/components/specific/sign-up/print-volume-section";
import { useState } from "react";
import ChooseRole from "~/components/specific/sign-up/choose-role";
import PrinterInfo from "~/components/specific/sign-up/printer-info";

interface NewUserData {
  age: number;
  location: string;
  printTime?: PrintTime;
  colorType?: ColorType;
  colors?: Color[];
  length?: number;
  width?: number;
  height?: number;
}

const SignUpPage: NextPage = () => {
  const completeSignUp = api.user.signUp.useMutation();
  const { data: sessionData } = useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [role, setRole] = useState("");

  const { handleSubmit, register } = useForm<NewUserData>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<NewUserData> = async (data) => {
    if (!sessionData?.user.id) return;

    await completeSignUp.mutateAsync({
      id: sessionData?.user.id,
      ...data,
    });

    const event = new Event("visibilitychange");
    document.dispatchEvent(event);

    console.log(data);

    router.push((router.query.redirect || "/") as string);
  };

  if (!sessionData?.user)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  console.log(sessionData?.user.hasSignedUp);

  // if (sessionData?.user.hasSignedUp) {
  //   void router.push((router.query.redirect || "/") as string);
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <p>One moment please...</p>
  //     </div>
  //   );
  // }

  return (
    <Layout title="Sign Up!">
      <h1>Hello Newfound Radishian!</h1>
      <p>We see that you are new around here.</p>
      <p>Tell us a bit more about yourself!</p>
      <p>(You can always change this info later)</p>

      {role ? (
        <form
          autoComplete="off"
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: isMobile ? "85vw" : "60vw" }}
        >
          <AgeLocation
            ageData={register("age", {
              required: true,
            })}
            locData={register("location", {
              required: true,
            })}
          />

          {role === "PRINTER" && (
            <>
              <hr className="mt-4 border-text-300" />
              <h3 className="mt-3">Printer Info</h3>
              <p className=" text-left text-text-200">
                This section is meant to gather a little more information about
                how you print. If you have more than one printer, answer the
                printer-specific questions with information about the printer
                you use most often.
              </p>
              <PrintVolumeSection
                lengthData={register("length", { required: true })}
                widthData={register("width", { required: true })}
                heightData={register("height", { required: true })}
              />
              <PrinterInfo />
            </>
          )}

          <Button type="submit" className="mt-[1rem]">
            Join Now!
          </Button>
        </form>
      ) : (
        <ChooseRole setValue={setRole} />
      )}
    </Layout>
  );
};

export default SignUpPage;

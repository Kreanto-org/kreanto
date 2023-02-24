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

interface NewUserData {
  age: number;
  location: string;
  printTime?: PrintTime;
  colorType?: ColorType;
  colors?: Color[];
}

const SignUpPage: NextPage = () => {
  const completeSignUp = api.user.signUp.useMutation();
  const { data: sessionData } = useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const { handleSubmit, register } = useForm<NewUserData>({
    criteriaMode: "all",
    defaultValues: {
      age: 16,
    },
  });

  const onSubmit: SubmitHandler<NewUserData> = async (data) => {
    console.log("Hello....");
    if (!sessionData?.user.id) return;
    console.log("World!");

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

        <Button type="submit" className="mt-[1rem]">
          Join Now!
        </Button>
      </form>
    </Layout>
  );
};

export default SignUpPage;

"use client";

import * as React from "react";
import Image from "next/image";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DesktopSignUpIcon from "public/images/illustration-sign-up-desktop.svg";
import MobileSignUpIcon from "public/images/illustration-sign-up-mobile.svg";
import ListIcon from "public/images/icon-list.svg";
import SuccessIcon from "public/images/icon-success.svg";
import { Loader2 } from "lucide-react";

const ACTION_ITEMS = [
  "Product discovery and building what matters",
  "Measuring to ensure updates are a success",
  "And much more!",
];

function ListItem({ content }: { content: string }) {
  return (
    <li className="flex items-start sm:items-center mb-3">
      <div className="mr-4 p-[2px]">
        <Image src={ListIcon} alt="benefit" width={21} height={21} />
      </div>
      <div className="text-dark-slate-grey">{content}</div>
    </li>
  );
}

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    const { email } = data;
    setIsLoading(true);
    const response = await fetch("/api/email-sign-up", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setIsSubmitted(true);
      setUserEmail(email);
    } else {
    }
    setIsLoading(false);
  };

  const handleDismiss = () => {
    setIsSubmitted(false);
    setUserEmail("");
    reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24">
      <div className="sm:max-w-[1440px] w-full flex items-center justify-center">
        <div className="bg-neutral-white mx-auto sm:p-6 rounded-[36px] flex items-center justify-between flex-col sm:flex-row w-full sm:w-auto">
          {!isSubmitted ? (
            <>
              <div className="basis-1/2 pl-8 pr-8">
                <h1 className="text-dark-slate-grey font-bold text-4xl sm:text-5xl leading-[100%]">
                  Stay updated!
                </h1>

                <p className="my-6">
                  Join 60,000+ product managers receiving monthly updates on:
                </p>

                <div className="mb-10">
                  <ul>
                    {ACTION_ITEMS.map((item) => (
                      <ListItem key={item} content={item} />
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <Label htmlFor="email" className="text-xs">
                      <div className="flex justify-between">
                        <div>Email address</div>
                        {hasErrors && (
                          <div className="text-tomato">
                            Valid email required
                          </div>
                        )}
                      </div>
                    </Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="email@company.com"
                      className="mt-2"
                      error={hasErrors}
                      {...register("email", {
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                      })}
                    />
                  </div>

                  <div>
                    <Button type="submit" className="w-full">
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Subscribe to monthly newsletter"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              <div className="basis-1/2 h-[593px] rounded-tr-none rounded-tl-none rounded-bl-2xl rounded-br-2xl sm:rounded-2xl bg-gradient-to-b from-tomato to-[#FF527B] sm:max-w-[400px] order-first sm:order-1 w-full mb-10 sm:mb-0">
                <div className="hidden sm:block">
                  <Image src={DesktopSignUpIcon} alt="Sign Up" />
                </div>
                <div className="block sm:hidden">
                  <Image src={MobileSignUpIcon} alt="Sign Up" />
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-[504px] px-10 mt-6 h-full sm:h-auto">
              <Image src={SuccessIcon} alt="Thanks for subscribing!" />

              <h1 className="text-dark-slate-grey font-bold text-5xl leading-[100%] mt-10">
                Thanks for subscribing!
              </h1>

              <p className="mt-6 mb-10 leading-[150%]">
                A confirmation email has been sent to{" "}
                <span className="font-bold">{userEmail}</span>. Please open it
                and click the button inside to confirm your subscription.
              </p>

              <Button
                className="sm:w-full mb-10 absolute bottom-0 left-0 right-0 w-[calc(100%-40px)] mx-auto sm:relative sm:block"
                onClick={handleDismiss}
              >
                Dismiss message
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

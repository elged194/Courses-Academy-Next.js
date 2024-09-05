import Image from "next/image";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <>
      <section className="bg-white ">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <Image
                width={200}
                height={200}
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <h2 className="w-1/3 pb-4 text-center text-gray-800 capitalize border-b-2 border-gray-900 font-bold ">
                sign up
              </h2>
            </div>

            <RegisterForm />
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;

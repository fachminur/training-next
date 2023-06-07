import CustomChakra from '@/components/CustomChakra';

import 'react-datepicker/dist/react-datepicker.css';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import './globals.css';

import Provider from '@/components/Provider';
import ReactQuery from '@/components/ReactQuery';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Training BPKP',
  description: 'NextJs Implementation asdasdasda',
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="">
      <head />
      <body>
        <Provider>
          <ReactQuery>
            <CustomChakra>
              <main>
                <div
                  style={{
                    overflow: 'hidden',
                  }}
                  className=" h-screen w-screen overflow-visible antialiased text-gray-700 border "
                >
                  <section className="h-[10%] w-full">
                    <Nav />
                  </section>
                  <section
                    style={{
                      overflow: 'hidden',
                    }}
                    className="h-[90%] w-full "
                  >
                    {children}
                  </section>
                </div>
              </main>
            </CustomChakra>
          </ReactQuery>
        </Provider>
      </body>
    </html>
  );
}

// export default function RootLayout({children}){
// return (
//   <html>
//     <body>
//       <section className='h-screen w-screen grid grid-cols-3 bg-red-100'>
//         <section className='col-span-1 h-full w-full bg-slate-400'>asd</section>
//         <section className="col-span-2">{children}</section>
//       </section>
//     </body>
//   </html>
// );
// }

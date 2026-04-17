import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const ReserveCheckout = (): JSX.Element => {
  return (
    <div className="bg-[#f3f3f3] w-full min-w-[390px] min-h-[844px] flex flex-col">
      {/* Status Bar + Header */}
      <header className="flex flex-col w-full bg-white pt-3 pb-4 px-5 gap-2 shrink-0">
        {/* Status bar row */}
        <div className="w-full flex items-center justify-between">
          <div className="flex w-9 items-center justify-center gap-2.5 rounded-3xl">
            <span className="[font-family:'Inter',Helvetica] font-semibold text-zinc-900 text-[17px] text-center tracking-[-0.41px] leading-[22px] whitespace-nowrap">
              9:41
            </span>
          </div>
          <div className="relative w-[77.4px] h-[13px]">
            <div className="absolute top-0 left-[calc(50.00%_+_11px)] w-[27px] h-[13px]">
              <img
                className="absolute top-[calc(50.00%_-_6px)] left-[calc(50.00%_-_14px)] w-[25px] h-[13px]"
                alt="Outline"
                src="/figmaAssets/outline.svg"
              />
              <img
                className="absolute top-[calc(50.00%_-_2px)] left-[calc(50.00%_+_12px)] w-px h-1"
                alt="Battery end"
                src="/figmaAssets/battery-end.svg"
              />
              <img
                className="absolute top-[calc(50.00%_-_4px)] left-[calc(50.00%_-_12px)] w-[21px] h-[9px]"
                alt="Fill"
                src="/figmaAssets/fill.svg"
              />
            </div>
            <img
              className="absolute w-[21.96%] h-[91.03%] top-[7.69%] left-[33.59%]"
              alt="Wifi"
              src="/figmaAssets/wifi.svg"
            />
            <img
              className="absolute top-px left-[calc(50.00%_-_39px)] w-[18px] h-3"
              alt="Icon mobile signal"
              src="/figmaAssets/icon---mobile-signal.svg"
            />
          </div>
        </div>
        {/* Navigation row */}
        <div className="flex w-full items-center relative">
          <div className="flex w-[34px] items-center justify-around p-1.5 rounded-[100px] border border-solid border-[#f3f3f3]">
            <img
              className="w-5 h-5"
              alt="Ion chevron back"
              src="/figmaAssets/ion-chevron-back-outline-1.svg"
            />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 [font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Checkout
          </span>
        </div>
      </header>
      {/* Main scrollable content */}
      <main className="flex flex-col items-center gap-4 px-5 pt-4 pb-24 flex-1">
        {/* Event Details Card */}
        <Card className="w-full bg-white rounded-lg shadow-none border-0">
          <CardContent className="p-0">
            {/* Event info row */}
            <div className="flex items-center gap-4 p-3">
              <div className="flex flex-col flex-1 items-start gap-2">
                <p className="[font-family:'Gill_Sans_MT-Bold',Helvetica] font-bold text-black text-lg tracking-[0] leading-[normal]">
                  Sunday Fun Day, 05 July | Morning Session
                </p>
                <p className="[font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-[#434343] text-xs tracking-[0] leading-[normal]">
                  Outdoor Turf Ground 5v5
                </p>
                <p className="[font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-[#434343] text-xs tracking-[0] leading-[normal]">
                  DBox Sports Complex
                </p>
              </div>
              {/* Vertical divider */}
              <div className="w-0.5 h-[90px] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(243,243,243,1)_50%,rgba(255,255,255,1)_100%)]" />
              {/* Duration */}
              <div className="flex flex-col w-[45px] items-center gap-0.5">
                <img
                  className="w-8 h-8 object-cover"
                  alt="Image"
                  src="/figmaAssets/image-469.png"
                />
                <span className="[font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[normal]">
                  90 Mins
                </span>
              </div>
            </div>
            <Separator className="bg-[#f3f3f3]" />
            {/* Split Payment section */}
            <div className="flex flex-col items-center gap-3 p-3 bg-white rounded-xl relative">
              {/* Split payment row with gradient border */}
              <div className="flex items-start justify-between p-3 relative self-stretch w-full rounded-md border-[none] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-md before:[background:linear-gradient(90deg,rgba(241,219,255,1)_0%,rgba(102,0,165,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
                <div className="inline-flex items-center gap-3">
                  {/* Radio circle */}
                  <div className="w-4 h-4 bg-[#f3f3f3] rounded-lg border-[3px] border-solid border-[#6600a5]" />
                  <div className="inline-flex items-center gap-[7px]">
                    <img
                      className="w-[12.41px] h-[8.92px]"
                      alt="Vector"
                      src="/figmaAssets/vector.svg"
                    />
                    <span className="[font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-xs tracking-[0] leading-[normal] whitespace-nowrap">
                      Split Payment - Pay Your Share
                    </span>
                  </div>
                </div>
                <span className="[font-family:'Gill_Sans_MT-BoldItalic',Helvetica] font-bold italic text-[#6600a5] text-xs text-right tracking-[0] leading-[normal] whitespace-nowrap">
                  BDT 250
                </span>
              </div>
              {/* Refund note */}
              <div className="inline-flex items-center justify-center gap-2.5 p-2 bg-[#f1f2ff] rounded-[4px_4px_0px_0px] mb-[-12px]">
                <span className="[font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  No worries - 100% refund if teammates don&apos;t pay 12 hours
                  ahead.
                </span>
              </div>
              {/* Decorative vector */}
              <img
                className="absolute top-[54px] left-3 w-[18px] h-[30px]"
                alt="Vector"
                src="/figmaAssets/vector-3.svg"
              />
            </div>
          </CardContent>
        </Card>
        {/* Cancellation Policy Card */}
        <Card className="w-full bg-white rounded-lg shadow-none border-0">
          <CardContent className="p-0">
            {/* Policy header row */}
            <div className="flex items-center gap-4 px-3 py-2">
              <div className="flex flex-col flex-1 items-end gap-1">
                <div className="flex items-center gap-2 self-stretch w-full">
                  <img
                    className="w-5 h-5"
                    alt="Fxemoji note"
                    src="/figmaAssets/fxemoji-note.svg"
                  />
                  <span className="flex-1 [font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                    Reservation Cancellation Policy
                  </span>
                  <img
                    className="w-4 h-4"
                    alt="Ion chevron back"
                    src="/figmaAssets/ion-chevron-back-outline.svg"
                  />
                </div>
                <p className="self-stretch [font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-[#f1152f] text-[11px] text-right tracking-[0] leading-[normal]">
                  Cancel anytime up to 24 hrs before your booking for a full
                  refund.
                </p>
              </div>
            </div>
            <Separator className="bg-[#f3f3f3]" />
            {/* Refund policy items */}
            <div className="flex flex-col items-center gap-3 p-3 bg-white rounded-xl">
              {/* Full refund item */}
              <div className="flex w-full items-start">
                <div className="inline-flex items-center gap-1">
                  <img
                    className="w-4 h-4"
                    alt="Mdi database tick"
                    src="/figmaAssets/mdi-database-tick.svg"
                  />
                  <span className="[font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-[10px] tracking-[0] leading-[normal] whitespace-nowrap">
                    Cancel 24+ hours before the reservation: Full refund.
                  </span>
                </div>
              </div>
              {/* Gradient divider */}
              <div className="self-stretch w-full h-0.5 bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(240,240,240,1)_50%,rgba(255,255,255,1)_100%)]" />
              {/* 50% refund item */}
              <div className="flex w-full items-start">
                <div className="inline-flex items-center gap-1">
                  <span className="flex items-center justify-center w-4 h-4 [font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[normal]">
                    🔁
                  </span>
                  <span className="[font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-[10px] tracking-[0] leading-[normal] whitespace-nowrap">
                    Cancel between 12 - 24 hours before the reservation: 50%
                    refund.
                  </span>
                </div>
              </div>
            </div>
            {/* Service fee note */}
            <div className="flex items-center justify-center gap-2.5 p-2 bg-[#f1f2ff] rounded-[4px_4px_0px_0px]">
              <p className="w-[300px] [font-family:'Gill_Sans_MT-Regular',Helvetica] font-normal text-black text-[10px] text-center tracking-[0] leading-[normal]">
                Note: Service fees are non-refundable. Refunds will be processed
                to your original payment method within 2 business days.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      {/* Bottom CTA */}
      <footer className="w-full flex items-center justify-around gap-2.5 px-4 py-2 bg-white shrink-0">
        <Button className="w-full h-[45px] bg-[#6600a5] hover:bg-[#5500880] rounded-[54px] [font-family:'Gill_Sans_MT-BoldItalic',Helvetica] font-bold italic text-white text-sm text-center tracking-[0] leading-[normal] whitespace-nowrap">
          Proceed to Pay
        </Button>
      </footer>
    </div>
  );
};

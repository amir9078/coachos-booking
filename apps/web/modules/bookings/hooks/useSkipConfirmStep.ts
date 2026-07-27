import type { UseBookingFormReturnType } from "@coachos/features/bookings/Booker/hooks/useBookingForm";
import { useBookerStore } from "@coachos/features/bookings/Booker/store";
import type { BookerState } from "@coachos/features/bookings/Booker/types";
import { getBookingResponsesSchemaWithOptionalChecks } from "@coachos/features/bookings/lib/getBookingResponsesSchema";
import type { BookerEvent } from "@coachos/features/bookings/types";
import { useEffect, useState } from "react";

export const useSkipConfirmStep = (
  bookingForm: UseBookingFormReturnType["bookingForm"],
  bookerState: BookerState,
  isWeekView: boolean,
  bookingFields?: BookerEvent["bookingFields"],
  locations?: BookerEvent["locations"]
) => {
  const bookingFormValues = bookingForm.getValues();

  const [canSkip, setCanSkip] = useState(false);
  const rescheduleUid = useBookerStore((state) => state.rescheduleUid);

  useEffect(() => {
    const checkSkipStep = async () => {
      if (!bookingFields || (locations && locations.length > 1)) {
        setCanSkip(false);
        return;
      }

      try {
        const responseSchema = getBookingResponsesSchemaWithOptionalChecks({
          bookingFields,
          view: rescheduleUid ? "reschedule" : "booking",
        });
        const responseSafeParse = await responseSchema.safeParseAsync(bookingFormValues.responses);

        setCanSkip(responseSafeParse.success);
      } catch (error) {
        setCanSkip(false);
      }
    };
    const isSkipConfirmStepSupported = !isWeekView;
    if (bookerState === "selecting_time" && isSkipConfirmStepSupported) {
      checkSkipStep();
    }
  }, [bookingFormValues, bookingFields, rescheduleUid, bookerState, isWeekView]);

  return canSkip;
};

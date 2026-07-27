import { getHolidayService } from "@coachos/lib/holidays";

export async function getSupportedCountriesHandler() {
  const holidayService = getHolidayService();
  return holidayService.getSupportedCountries();
}

export default getSupportedCountriesHandler;

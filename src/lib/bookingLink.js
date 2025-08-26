const LISTING_URL = "https://www.booking.com/Share-tSsd0zQ";

export function buildBookingUrl({ checkIn, checkOut, adults = 2, childrenAges = [], rooms = 1, lang = "en-gb", currency = "LKR" }) {
  const params = new URLSearchParams({
    checkin: checkIn,
    checkout: checkOut,
    group_adults: String(adults),
    group_children: String(childrenAges.length),
    no_rooms: String(rooms),
    lang,
    selected_currency: currency,
  });
  childrenAges.forEach(function (a) { params.append("age", String(a)); });
  return LISTING_URL + "?" + params.toString();
}

export const BOOKING_LISTING_URL = LISTING_URL;


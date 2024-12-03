import * as React from 'react';
import { useEffect, useRef } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css'
import localeEn from 'air-datepicker/locale/en'
import '../styles/addmedia.css';

export default function ChooseDate({mediaDate, setMediaDate}) {
    // A reference for the date picker element
    const datepickerRef = useRef(null);

    /** Setup Calendar date picker */
    useEffect(() => {
        new AirDatepicker(datepickerRef.current, {
          autoClose: true,
          dateFormat: "yyyy-MM-dd",
          locale: localeEn,
          onSelect: ({ date }) => {
            setMediaDate(date.toString());
          },
        });
    }, []);

  useEffect(() => {
    if (!mediaDate) {
      console.log(datepickerRef)
    }
  }, [mediaDate])

  return (
    <>
    <div className="input-group">
      <input className='datepicker-input' ref={datepickerRef} type="text" placeholder="Select a date"/>
    </div>
    </>
  )
}

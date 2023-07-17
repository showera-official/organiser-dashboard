import React from 'react'
import Card from '../../components/ui/Card'
import { Icon } from '@iconify/react'
import Textinput from "@/components/ui/Textinput";
export default function AddEvent() {
  return (
    <>
        <div>
      
            <Card title={"Add New Event"}>
                <div className='w-full px-2 py-1 flex md:flex-row flex-wrap flex-column'>
                    <div className='md:w-1/2 px-1 py-1 w-full'>
                    <Textinput
            label="Event Name"
            id="pn"
            type="text"
            placeholder="Add Event Name"
               
          />
                    </div>
                    <div className='md:w-1/2 px-1 py-1 w-full'>
                        <Textinput
                        label="xyz"
                        id="er"
                        type="text"
                        placeholder="test"
                        />
                    </div>
                </div>
            </Card>
        </div>
    </>
  )
}

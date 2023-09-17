import React from 'react'
import './FAQ.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    return (
        <div className='faq'>
            <h1>FAQs</h1>

            <div className='accordion-container'>

                <Accordion className='accordion'>

                    <AccordionSummary
                        className='accordion-summary'
                        expandIcon={<ExpandMoreIcon className='icon'/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className='accordion-summary__ques'>Is QTify free to use?</Typography>
                    </AccordionSummary>

                    <AccordionDetails className='accordion-details'>
                        <Typography variant='h5'>
                           Yes! It is 100% free, and has 0% ads!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='accordion'>
                    <AccordionSummary
                        className='accordion-summary'
                        expandIcon={<ExpandMoreIcon className='icon'/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className='accordion-summary__ques'>Can I download and listen to songs offline</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='accordion-details'>
                        <Typography variant='h5'>
                            Sorry, unfortunately we don't provide the service to download any songs.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>

        </div>
    )
}

export default FAQ
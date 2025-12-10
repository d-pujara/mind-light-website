import React, { useState } from 'react';

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div key={index} className={`accordion-item ${openIndex === index ? 'active' : ''}`}>
                    <div
                        className="accordion-header"
                        onClick={() => toggleItem(index)}
                    >
                        <h3>{item.title}</h3>
                        <span className="accordion-icon">
                            {openIndex === index ? '−' : '+'}
                        </span>
                    </div>
                    <div className="accordion-content" style={{ maxHeight: openIndex === index ? '500px' : '0' }}>
                        <div className="accordion-body">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;

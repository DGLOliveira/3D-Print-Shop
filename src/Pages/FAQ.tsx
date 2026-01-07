import React from "react";
import "../Styles/FAQ.css";

export default function FAQ() {
  return (
    <div id="faq">
      <h1>Frequently Asked Questions</h1>
      <div>
          <h2>Material</h2>
          <p>We use plastic <b>PLA</b>, it stands for Polylactic Acid, a type of thermoplastic from the Polyester family.</p>
          <details>
          <summary><b>Where PLA comes from?</b></summary>
          <p>Unlike its relatives of fossil origin, this plastic is formed by fermenting starch available from biological sources such as corn and sugarcane, creating lactic acid. This acid is recognizable by its sour taste present in fermented milk products such as yogurt. The acid is then allowed to condensate into its plastic form, thus making its origin fully renewable.</p>
          </details>
          <details>
          <summary><b>How does PLA affect Nature?</b></summary>
          <p>This plastic is considered <b>Non-Biodegradable</b>, as it requires certain conditions to biodegrade at a significant pace. However its non-toxic, and its subproducts are harmless, as the result of its decomposition is Water and Carbon Dioxide. If left in nature, it may last as long as conventional plastics, however it can be easily recycled with mechanical, chemical and natural methods.</p>
          </details>
          <details>
            <summary><b>How PLA is Recycled?</b></summary>
            <p><u style={{color:"red"}}><b>PLA should not be thrown in a landfill or common plastic recycling bin! Return instead to any buisness related to 3D printing.</b></u> There are four methods of disposing of PLA plastic:</p>
              <ul>
                <b>Recasting</b>
                <p>PLA is a thermoplastic, this means it can be melted and recast into a reusable form several times before impurities become an issue.</p>
              </ul>
              <ul>
                <b>Composting</b>
                <p>Some bacteria like to eat some types of plastic, this one included! When placed between 40&deg;C and 60&deg;C, their activity ramps up, and they proceed to devour the plastic, releasing CO<sub>2</sub> and H<sub>2</sub>O.</p>
              </ul>
              <ul>
                <b>Chemical</b>
                <p>Its is also possible to revert PLA back into its previous state of lactic acid using Hydrolisis, and then converted back into PLA.</p>
              </ul>
              <ul>
                <b>Incinerated</b>
                <p>If all else fails, the good news is that since this plastic has no toxic components, it can be safelly incinerated with minimal environmental impact. Note that some versions of PLA may contain additives that may cause minor toxicity issues.</p>
              </ul>
          </details>
      </div>
      <div>
          <h2>Designs</h2>
          <h4></h4>
          <details>
            <summary><b>Where are the Designs From?</b></summary>
            <p>Our designs are both custom made, and sourced for free from public works, available at <a href="https://www.thingiverse.com/" target="_blank">www.thingiverse.com</a> , the original link for each individual design can be found in its respective product page. We use only the ones whose Creative Commons licence allows use for commercial applications.</p>
          </details>
          <details>
            <summary><b>How Can I get new Designs?</b></summary>
            <p>You can make them with any 3D software, such as the free and open source <a href="https://www.blender.org/" target="_blank">Blender</a>, or search online for available free models online in <a href="https://www.thingiverse.com/" target="_blank">www.thingiverse.com</a>, or even buy or request a custom design from a professional designer.</p>
          </details>
          <details>
            <summary><b>Can I use Custom Designs?</b></summary>
            <p>We currently do not produce custom designs. We instead optimize the production of a few models in order to decrease its price tag. There are however other shops that supply such service, at an increased price tag.</p>
          </details>
        </div>
        <div>
          <h3>Production</h3>
          <details>
            <summary><b>What is 3D Printing?</b></summary>
            <p>Also known as addictive manunfacturing, its a collection of processes that allows the production of 3D models by adding material onto a base. This stands in opposition to subtractive manunfacturing, a collection of methods that relies on machining materials into the desired shape by removing from the material, such as cutting, boring or carving a material.</p>
          </details>
          <details>
            <summary><b>How do we make a 3D Print?</b></summary>
            <p>We currently use <b>FDM</b> Printers, it stands for <em>Fusion Deposit Module</em>, this means it heats a material to its melting point and deposits it small layers. The printer can deposit a layer on top of the previous along a set height, and by repeating the process several times, a 3-Dimentional shape arises.</p>
          </details>
      </div>
  </div>
  );
}

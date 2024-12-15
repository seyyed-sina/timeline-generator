# timeline-generator
A React component (Timeline) that generates a visual representation of the given 'stages' and 'occasions' data. Timeline has a dynamic layout and the horizontal dimensions of the stages in the timeline are determined by the 'layout' and 'gapLayout' properties. 
For the layout, the base setup is the 'precise' mode which basically means the exact dimensions based on the given dates. For the purpose of this task just another layout type 'even' should be accepted (that makes all the stages have the same width). 
In addition to the layout, the gaps between the timeline stages are determined by the 'gapLayout' property. The base setup is 'actual' which basically works like the precise setup in layout. It means that gaps are treated like normal stages. Two other 'minimum' and 'none' should also be accepted. minimum means all the gaps are displayed with the minimum size (take 20px for this task) and none means 0. 

Requirement:

- The gaps should be calculated automatically.  
- layout and gapsLayout should be choosable. (a simple default html list item is enough. styling is not necessary)
- The selected stage needs to be toggled and also expanded (the selected stage becomes wider). the expanding effect should be able to be turned on and off.  
- Occasions should also get selected by click. the selected occasions get a selection round (as displayed). 
- Occasions that have false 'is_on_timeline' field should not be displayed.

Optional:
When occasions are selected, its properties are displayed: type, title, and date (these are included in each occasion item).

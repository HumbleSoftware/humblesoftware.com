<h4>Class<code>envision.Component</code>:&nbsp;<span class="class-summary">Defines a visualization component.</span></h4><div class="class-description"><div class="description"><p>Components are the building blocks of a visualization, 
representing one typically graphical piece of the vis.  This class manages
the options, DOM and API construction for an adapter which handles the
actual drawing of the visualization piece.</p><p>Adapters can take the form of an actual object, a constructor function
or a function returning an object.  Only one of these will be used.  If
none is submitted, the default adapter Flotr2 is used.</p></div><h5>Configuration:</h5><div class="parameters"><p>An object is submitted to the constructor for configuration.</p><ul><li class="param"><code>name</code><span>A name for the component.</span></li><li class="param"><code>element</code><span>A container element for the component.</span></li><li class="param"><code>height</code><span>An explicit component height.</span></li><li class="param"><code>width</code><span>An explicit component width.</span></li><li class="param"><code>data</code><span>An array of data.  Data may be formatted for 
envision or for the adapter itself, in which case skipPreprocess will
also need to be submitted.</span></li><li class="param"><code>skipPreprocess</code><span>Skip data preprocessing.  This is useful
when using the native data format for an adapter.</span></li><li class="param"><code>adapter</code><span>An adapter object.</span></li><li class="param"><code>adapterConstructor</code><span>An adapter constructor to be
instantiated by the component.</span></li><li class="param"><code>adapterCallback</code><span>An callback invoked by the component
returning an adapter.</span></li><li class="param"><code>config</code><span>Configuration for the adapter.</span></li></ul></div><h5>Methods:</h5>
<div class="class-method"><code><span class="name">render</span>([element])</code><div class="description"><p>Render the component.</p><p>If no element is submitted, the component will
render in the element configured in the constructor.</p></div></div>
<div class="class-method"><code><span class="name">draw</span>([data],&nbsp;[options])</code><div class="description"><p>Draw the component.</p></div></div>
<div class="class-method"><code><span class="name">trigger</span>()</code><div class="description"><p>Trigger an event on the component's API.</p><p>Arguments are passed through to the API.</p></div></div>
<div class="class-method"><code><span class="name">attach</span>()</code><div class="description"><p>Attach to an event on the component's API.</p><p>Arguments are passed through to the API.</p></div></div>
<div class="class-method"><code><span class="name">detach</span>()</code><div class="description"><p>Detach a listener from an event on the component's API.</p><p>Arguments are passed through to the API.</p></div></div>
<div class="class-method"><code><span class="name">destroy</span>()</code><div class="description"><p>Destroy the component.</p><p>Empties the container and calls the destroy method on the
component's API.</p></div></div>
</div>
<h4>Class<code>envision.Visualization</code>:&nbsp;<span class="class-summary">Defines a visualization of componenents.</span></h4><div class="class-description"><div class="description"><p>This class manages the rendering of a visualization.
It provides convenience methods for adding, removing, and reordered
components dynamically as well as convenience methods for working
with a logical group of components.</p></div><h5>Configuration:</h5><div class="parameters"><p>An object is submitted to the constructor for configuration.</p><ul><li class="param"><code>name</code><span>A name for the visualization.</span></li><li class="param"><code>element</code><span>A container element for the visualization.</span></li></ul></div><h5>Methods:</h5>
<div class="class-method"><code><span class="name">render</span>([element])</code><div class="description"><p>Render the visualization.</p><p>If no element is submitted, the visualization will
render in the element configured in the constructor.</p><p>This method is chainable.</p></div></div>
<div class="class-method"><code><span class="name">add</span>(component)</code><div class="description"><p>Add a component to the visualization.</p><p>If the visualization has already been rendered,
it will render the new component.</p><p>This method is chainable.</p></div></div>
<div class="class-method"><code><span class="name">remove</span>()</code><div class="description"><p>Remove a component from the visualization.</p><p>This removes the components from the list of components in the
visualization and removes its container from the DOM.  It does not
destroy the component.</p><p>This method is chainable.</p></div></div>
<div class="class-method"><code><span class="name">setPosition</span>(component,&nbsp;newIndex)</code><div class="description"><p>Reorders a component.</p><p>This method is chainable.</p></div></div>
<div class="class-method"><code><span class="name">indexOf</span>(component)</code><div class="description"><p>Gets the position of a component.</p></div></div>
<div class="class-method"><code><span class="name">getComponent</span>(component)</code><div class="description"><p>Gets the component at a position.</p></div></div>
<div class="class-method"><code><span class="name">isFirst</span>(component)</code><div class="description"><p>Gets whether or not the component is the first component
in the visualization.</p></div></div>
<div class="class-method"><code><span class="name">isLast</span>(component)</code><div class="description"><p>Gets whether or not the component is the last component
in the visualization.</p></div></div>
<div class="class-method"><code><span class="name">destroy</span>()</code><div class="description"><p>Destroys the visualization.</p><p>This empties the container and destroys all the components which are part
of the visualization.</p></div></div>
</div>
<h4>Class<code>envision.Preprocessor</code>:&nbsp;<span class="class-summary">Data preprocessor.</span></h4><div class="class-description"><div class="description"><p>Data can be preprocessed before it is rendered by an adapter.</p><p>This has several important performance considerations.  If data will be 
rendered repeatedly or on slower browsers, it will be faster after being
optimized.</p><p>First, data outside the boundaries does not need to be rendered.  Second,
the resolution of the data only needs to be at most the number of pixels
in the width of the visualization.</p><p>Performing these optimizations will limit memory overhead, important
for garbage collection and performance on old browsers, as well as drawing
overhead, important for mobile devices, old browsers and large data sets.</p></div><h5>Configuration:</h5><div class="parameters"><p>An object is submitted to the constructor for configuration.</p><ul><li class="param"><code>data</code><span>The data for processing.</span></li></ul></div><h5>Methods:</h5>
<div class="class-method"><code><span class="name">getData</span>()</code><div class="description"><p>Returns data.</p></div></div>
<div class="class-method"><code><span class="name">setData</span>()</code><div class="description"><p>Set the data object.</p></div></div>
<div class="class-method"><code><span class="name">length</span>()</code><div class="description"><p>Returns the length of the data set.</p></div></div>
<div class="class-method"><code><span class="name">bound</span>(min,&nbsp;max)</code><div class="description"><p>Bounds the data set at within a range.</p></div></div>
<div class="class-method"><code><span class="name">subsampleMinMax</span>(resolution)</code><div class="description"><p>Subsample data using MinMax.</p><p>MinMax will display the extrema of the subsample intervals.  This is
slower than regular interval subsampling but necessary for data that 
is very non-homogenous.</p></div></div>
<div class="class-method"><code><span class="name">subsample</span>(resolution)</code><div class="description"><p>Subsample data at a regular interval for resolution.</p><p>This is the fastest subsampling and good for monotonic data and fairly
homogenous data (not a lot of up and down).</p></div></div>
</div>
<h4>Class<code>envision.Interaction</code>:&nbsp;<span class="class-summary">Defines an interaction between components.</span></h4><div class="class-description"><div class="description"><p>This class defines interactions in which actions are triggered
by leader components and reacted to by follower components.  These actions
are defined as configurable mappings of trigger events and event consumers.
It is up to the adapter to implement the triggers and consumers.</p><p>A component may be both a leader and a follower.  A leader which is a 
follower will react to actions triggered by other leaders, but will safely
not react to its own.  This allows for groups of components to perform a
common action.</p><p>Optionally, actions may be supplied with a callback executed before the 
action is consumed.  This allows for quick custom functionality to be added
and is how advanced data management (ie. live Ajax data) may be implemented.</p><p>This class follow an observer mediator pattern.</p></div><h5>Configuration:</h5><div class="parameters"><p>An object is submitted to the constructor for configuration.</p><ul><li class="param"><code>leader</code><span>Component(s) to lead the
interaction</span></li></ul></div><h5>Methods:</h5>
<div class="class-method"><code><span class="name">leader</span>(component)</code><div class="description"><p>Add a component as an interaction leader.</p></div></div>
<div class="class-method"><code><span class="name">follower</span>(component)</code><div class="description"><p>Add a component as an interaction leader.</p></div></div>
<div class="class-method"><code><span class="name">group</span>(components)</code><div class="description"><p>Adds an array of components as both followers and leaders.</p></div></div>
<div class="class-method"><code><span class="name">add</span>(action,&nbsp;[options])</code><div class="description"><p>Adds an action to the interaction.</p><p>The action may be optionally configured with the options argument.
Currently the accepts a callback member, invoked after an action
is triggered and before it is consumed by followers.</p></div></div>
</div>

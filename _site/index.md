---
layout: base
---
<div class="container">
	<div class="row">
		<h1>Photos from the Internet</h1>
		<h2>Now Ready to Download</h2>
	</div>
	<div class="row row-cols-1 row-cols-md-3 g-4">
		{% for img in images -%}
		<div class="col">
			<div class="card">
				<img src="{{img.image}}" class="card-img-top" alt="{{img.alt}}" loading=lazy>
				<div class="card-body">
					<p><small class="text-muted">{{img.alt}}</small></p>
					<a href="{{img.image}}" target="_blank" download="{{img.alt}}.jpg" class="btn btn-success btn-block">Download Image</a>
				</div>
			</div>
		</div>
		{% endfor -%}
	</div>

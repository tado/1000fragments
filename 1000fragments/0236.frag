uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.54 + jf * 4.0), cos(t * 0.51 * jf)) * 0.39;
        xs += sin(length(p - im) * 142.37 - t * 4.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.80;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 1.60 * p.y + time * 1.06); p.y += 0.39 / wf * cos(wf * 2.68 * p.x + time * 1.67); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.24));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

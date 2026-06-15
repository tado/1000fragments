uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.85 + jf * 4.0), cos(t * 0.42 * jf)) * 0.38;
        xs += sin(length(p - im) * 153.11 - t * 12.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	{ float fr = length(p); p *= 1.0 + 0.74 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.84 * p.y + time * 1.28); p.y += 0.42 / wf * cos(wf * 3.38 * p.x + time * 0.64); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.57));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

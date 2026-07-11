uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.57 * jf)) * 0.94;
        xs += sin(length(p - im) * 161.25 - t * 10.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	{ float fr = length(p); p *= 1.0 + -0.32 * fr * fr; }
	p.y += sin(p.x * 2.29 + time * 3.04) * 0.37;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 1.86 * p.y + time * 0.75); p.y += 0.42 / wf * cos(wf * 2.72 * p.x + time * 2.01); }
	p = fract(p * 2.03) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.42, 0.29, 0.43), vec3(0.85, 0.69, 0.86), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

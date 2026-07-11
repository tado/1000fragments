uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.83 + t * 2.11 + ph) * 0.7;
    float wb = sin(p.y * 18.33 - t * 2.72 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.54;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	p = fract(p * 2.36) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	p = rot2(length(p) * 2.07 + time * 0.36) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.15 * p.y + time * 0.73); p.y += 0.32 / wf * cos(wf * 2.27 * p.x + time * 0.86); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.26, 0.48), vec3(0.99, 0.83, 0.89), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.63 + t * 0.90 + ph) + sin(p.y * 2.94 - t * 5.94 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.56) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.05 * p.y + time * 1.73); p.y += 0.44 / wf * cos(wf * 2.39 * p.x + time * 1.37); }
	p = rot2(p.y * 1.67 + time * 1.18) * p;
	{ float fr = length(p); p *= 1.0 + -0.28 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.26, 0.60), vec3(0.58, 0.70, 0.54), d);
	col = mod(col * 2.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

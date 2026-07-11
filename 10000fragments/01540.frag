uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.63 - t * 8.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 5.77 - time * 0.65); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.02 * p.y + time * 0.76); p.y += 0.37 / wf * cos(wf * 2.89 * p.x + time * 1.31); }
	p = rot2(time * 0.34) * p;
	p *= 2.39;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.42, 0.51), vec3(0.56, 0.87, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

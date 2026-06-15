uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 39.05 - t * 6.94 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 29.38 - t * 6.94 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.25 * p.y + time * 0.95); p.y += 0.42 / wf * cos(wf * 3.26 * p.x + time * 1.89); }
	p += vec2(0.25, -0.18) * sin(length(p) * 2.36 - time * 1.12) * 0.28;
	p = rot2(length(p) * 1.22 + time * 1.10) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.48, 0.02), vec3(0.96, 0.81, 0.64), d);
	col = mod(col * 2.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

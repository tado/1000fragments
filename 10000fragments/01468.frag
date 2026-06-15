uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.92 + vec2(t * 2.02, -t * 2.02) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.60 + t * 0.60 + ph) + sin(p.y * 3.29 - t * 1.78 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(1.05) * p; }
	p = rot2(1.55) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.51 * p.y + time * 1.76); p.y += 0.22 / wf * cos(wf * 2.74 * p.x + time * 1.50); }
	p = fract(p * 1.21) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.76 + time * 0.26, vec3(0.59, 0.44, 0.60), vec3(0.44, 0.32, 0.44), vec3(1.32, 1.22, 1.14), vec3(0.68, 0.87, 0.55));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

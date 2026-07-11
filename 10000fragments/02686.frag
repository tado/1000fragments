uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.23 * cos(sa * 7 + t * 2.50 + ph);
    v = sin((sr - petal) * 19.44);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	p = rot2(p.y * 2.30 + time * 0.13) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(1.64) * p; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.33 / wf * sin(wf * 3.02 * p.y + time * 1.18); p.y += 0.43 / wf * cos(wf * 2.37 * p.x + time * 1.75); }
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.21, vec3(0.46, 0.49, 0.46), vec3(0.32, 0.43, 0.46), vec3(1.30, 0.99, 1.25), vec3(0.58, 0.76, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

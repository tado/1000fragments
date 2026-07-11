uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 2.98 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.10); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.78 * p.y + time * 1.38); p.y += 0.36 / wf * cos(wf * 2.58 * p.x + time * 1.12); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 2.13 + time * 0.64); }
	p *= 2.43;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.00, vec3(0.57, 0.55, 0.49), vec3(0.39, 0.32, 0.41), vec3(1.40, 0.77, 1.23), vec3(0.09, 0.87, 0.45));
	col = mod(col * 1.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

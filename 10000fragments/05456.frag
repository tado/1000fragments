uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float field(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.04 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.15); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	p = rot2(p.y * -2.00 + time * 0.18) * p;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.38 * p.y + time * 1.94); p.y += 0.38 / wf * cos(wf * 3.71 * p.x + time * 0.65); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(1.95) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.24));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

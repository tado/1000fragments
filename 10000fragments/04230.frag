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
    vec2 dp = fract(p * 7.58) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 3.39 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 1.87 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.24); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	p += vec2(0.34, -0.77) * sin(length(p) * 2.17 - time * 1.69) * 0.24;
	{ p = vec2(atan(p.y, p.x) * 2.86, length(p) * 2.58 - time * 0.33); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.03 * p.y + time * 1.29); p.y += 0.25 / wf * cos(wf * 2.11 * p.x + time * 0.69); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.04 + time * 0.09, vec3(0.54, 0.49, 0.56), vec3(0.34, 0.41, 0.44), vec3(1.16, 1.09, 1.14), vec3(0.18, 0.91, 0.77));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
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
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.52 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.31); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.83 + t * 3.31 + ph) * 0.7;
    float wb = sin(p.y * 18.52 - t * 1.02 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.24;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 7.18 + time * 1.49) * 0.28;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.56);
	float d = d1 + d2;
	vec3 col = palette(d * 1.47 + time * 0.18, vec3(0.43, 0.47, 0.49), vec3(0.45, 0.38, 0.46), vec3(1.10, 1.35, 0.87), vec3(0.53, 0.75, 0.13));
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.30 + time * 17.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

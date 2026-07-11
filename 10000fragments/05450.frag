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
    v = 0.25 * (sin(p.x * 6.27 + t * 2.84 + ph) + sin(p.y * 10.93 - t * 2.84 + ph)
        + sin((p.x + p.y) * 2.76 + t * 2.84 + ph) + sin(length(p) * 15.53 - t * 2.84 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.11 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.20); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.63);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.23 + time * 0.06, vec3(0.46, 0.47, 0.55), vec3(0.47, 0.33, 0.38), vec3(1.21, 0.80, 0.92), vec3(0.04, 0.14, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

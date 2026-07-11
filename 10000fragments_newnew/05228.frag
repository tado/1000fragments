uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    vec2 kp = p * 1.91;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.78; kp = rot2(1.51) * kp; kp *= 1.40; }
    v = sin(kp.x * 1.30 - t * 2.35 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 2.65 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.28); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	p *= 1.0 + 0.21 * sin(time * 4.12);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = d1 + d2;
	vec3 col = palette(d * 0.85 + time * 0.11, vec3(0.59, 0.54, 0.41), vec3(0.40, 0.43, 0.43), vec3(0.71, 1.14, 0.82), vec3(0.05, 0.19, 0.41));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

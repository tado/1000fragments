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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.08 + sr * 20.99 - t * 0.83 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 5.46 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.35); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	{ p = vec2(atan(p.y, p.x) * 2.56, length(p) * 3.63 - time * 0.58); }
	p = rot2(time * -0.98) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.19 + time * 0.18, vec3(0.51, 0.57, 0.42), vec3(0.36, 0.33, 0.40), vec3(0.87, 1.25, 1.30), vec3(0.49, 0.33, 0.07));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

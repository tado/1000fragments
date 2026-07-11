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
    float ma = sin(length(p - vec2(0.20, 0.0)) * 14.04 - t * 6.02 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 38.68 - t * 6.02 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.64 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 0.47); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	p = rot2(time * -0.27) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = d1 * d2;
	vec3 col = palette(d * 1.04 + time * 0.20, vec3(0.42, 0.48, 0.58), vec3(0.38, 0.37, 0.34), vec3(1.33, 1.32, 1.25), vec3(0.25, 0.83, 0.22));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

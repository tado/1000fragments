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
    float ma = sin(length(p - vec2(0.52, 0.0)) * 24.08 - t * 3.15 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 32.61 - t * 3.15 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0, famp = 0.5; vec2 fq = p * 3.71 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * noise2(fq + t * 1.21); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.13);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.47 + time * 0.08, vec3(0.43, 0.51, 0.55), vec3(0.44, 0.42, 0.40), vec3(0.83, 1.01, 0.96), vec3(0.78, 0.97, 0.28));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

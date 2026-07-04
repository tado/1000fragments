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
    v = sin(p.x * 5.65 + sin(p.y * 2.05 + t * 2.75) * 3.66 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 4.38 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 0.35); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	{ p = vec2(atan(p.y, p.x) * 1.93, length(p) * 2.28 - time * 0.64); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.20 + time * 0.21, vec3(0.60, 0.41, 0.45), vec3(0.40, 0.37, 0.42), vec3(1.00, 1.14, 0.77), vec3(0.25, 0.58, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

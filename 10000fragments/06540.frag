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
    vec2 kp = p * 1.85;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.46; kp = rot2(2.72) * kp; kp *= 1.15; }
    v = sin(kp.x * 3.46 - t * 2.00 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rv = 0.0; float ra = 0.5; vec2 rq = p * 3.95;
    for(int ri = 0; ri < 4; ri++){ rv += ra * vnoise2(rq + t * 0.47); rq = rq * 2.1 + 3.7; ra *= 0.55; }
    v = smoothstep(0.42, 0.57, rv + 0.03 * sin(t * 0.97 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	p = rot2(p.y * -3.77 + time * 0.83) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.76 + time * 0.11, vec3(0.42, 0.40, 0.44), vec3(0.38, 0.49, 0.37), vec3(1.28, 1.19, 1.21), vec3(0.94, 0.58, 0.13));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.67 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

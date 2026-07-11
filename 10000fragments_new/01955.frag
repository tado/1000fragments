uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.71;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.63; kp = rot2(2.47) * kp; kp *= 1.16; }
    v = sin(kp.y * 1.20 - t * 1.52 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.31 * pow(abs(cos(ra * 6.0 + t * 1.70)), 1.24);
    v = sin((rr - pet) * 14.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	p = abs(p) - 0.71;
	p = (floor(p * 7.7) + 0.5) / 7.7;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.64 + time * 0.08, vec3(0.46, 0.53, 0.60), vec3(0.47, 0.47, 0.33), vec3(1.17, 0.71, 1.14), vec3(0.76, 0.37, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.30 + vec2(t * 1.10, -t * 1.10) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.23 * cos(sa * 9 + t * 1.52 + ph);
    v = sin((sr - petal) * 18.85);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.41; p = rot2(0.38) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 3.50 + time * 0.86) * p;
	{ p = vec2(atan(p.y, p.x) * 2.99, length(p) * 4.05 - time * 0.19); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.72);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.11 + time * 0.24, vec3(0.45, 0.40, 0.42), vec3(0.33, 0.44, 0.43), vec3(1.03, 1.29, 1.33), vec3(0.78, 0.74, 0.50));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

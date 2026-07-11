uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.14 * cos(sa * 5 + t * 2.67 + ph);
    v = sin((sr - petal) * 16.82);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.63 + vec2(t * 2.47, -t * 2.47) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	p = fract(p * 1.21) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.18; p = rot2(2.25) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.85);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.18 + time * 0.04, vec3(0.41, 0.46, 0.43), vec3(0.42, 0.46, 0.42), vec3(0.89, 1.24, 1.18), vec3(0.75, 0.82, 0.95));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

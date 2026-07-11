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
    float petal = 0.65 + 0.20 * cos(sa * 6 + t * 2.98 + ph);
    v = sin((sr - petal) * 8.20);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.90 + vec2(t * 0.39, -t * 0.39) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	p = rot2(length(p) * -1.71 + time * 1.07) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.34);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.85 + time * 0.27, vec3(0.57, 0.50, 0.40), vec3(0.47, 0.43, 0.42), vec3(0.95, 1.10, 1.07), vec3(0.48, 0.84, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

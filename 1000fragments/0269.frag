uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.31 + vec2(t * 0.88, -t * 0.88) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.70 + sr * 22.31 - t * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.50;
	p = rot2(time * -0.99) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(0.70) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.26);
	float d = d1 * d2;
	vec3 col = palette(d * 1.26 + time * 0.07, vec3(0.60, 0.50, 0.51), vec3(0.35, 0.43, 0.46), vec3(1.33, 0.72, 1.20), vec3(0.59, 0.95, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

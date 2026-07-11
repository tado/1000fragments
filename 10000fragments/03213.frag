uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.45 + t * 3.10 + ph) + sin(p.y * 4.15 - t * 5.21 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.66 + vec2(t * 2.99, -t * 2.99) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	p = rot2(p.y * -3.63 + time * 0.11) * p;
	p = rot2(2.61) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.19);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.42 + time * 0.21, vec3(0.45, 0.44, 0.50), vec3(0.49, 0.34, 0.41), vec3(0.88, 1.00, 0.84), vec3(0.62, 0.27, 0.47));
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

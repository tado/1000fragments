uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.10, t * 0.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.23 + sin(p.y * 5.95 + t * 1.13) * 3.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.28) * p;
	p = rot2(length(p) * 3.02 + time * 1.18) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.54);
	float d = d1 + d2;
	vec3 col = palette(d * 0.93 + time * 0.14, vec3(0.44, 0.57, 0.46), vec3(0.37, 0.49, 0.47), vec3(1.34, 0.88, 1.25), vec3(0.28, 0.82, 0.27));
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

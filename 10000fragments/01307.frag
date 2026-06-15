uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.78, t * 2.23 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.75;
	p = rot2(time * -0.89) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.09, vec3(0.49, 0.55, 0.47), vec3(0.46, 0.44, 0.38), vec3(0.92, 1.03, 1.00), vec3(0.08, 0.08, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.79, t * 2.36 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.59; p = rot2(2.13) * p; }
	p = rot2(0.39) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.15, vec3(0.52, 0.46, 0.50), vec3(0.44, 0.36, 0.44), vec3(0.84, 0.92, 0.90), vec3(0.00, 0.21, 0.23));
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

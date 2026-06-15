uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.06, t * 1.84 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(2.04) * p; }
	p = rot2(p.y * 1.25 + time * 0.34) * p;
	p = rot2(time * 1.27) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.17, vec3(0.42, 0.46, 0.59), vec3(0.41, 0.46, 0.40), vec3(1.21, 0.88, 1.31), vec3(0.64, 0.22, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

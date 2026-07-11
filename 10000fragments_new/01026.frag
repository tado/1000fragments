uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.86, t * 0.54 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	p *= 1.51;
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	p = rot2(time * 1.08) * p;
	p = rot2(length(p) * -1.82 + time * 0.83) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.10, vec3(0.49, 0.40, 0.54), vec3(0.47, 0.45, 0.44), vec3(1.20, 1.27, 1.21), vec3(0.45, 0.99, 0.03));
	col = mod(col * 2.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

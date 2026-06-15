uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 17.97 - t * 5.36 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 37.81 - t * 5.36 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.55, t * 1.48 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.64;
	p = abs(p) - 0.47;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 3.89 - time * 0.77); }
	p = rot2(length(p) * 2.11 + time * 1.15) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = d1 * d2;
	vec3 col = palette(d * 1.66 + time * 0.22, vec3(0.44, 0.57, 0.59), vec3(0.31, 0.48, 0.50), vec3(0.74, 0.80, 0.74), vec3(0.05, 0.67, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

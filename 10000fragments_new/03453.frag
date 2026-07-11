uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.55, t * 2.19 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.83 + sin(p.y * 4.34 + t * 5.58) * 3.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1.x += sin(q1.y * 4.21 + time * 3.39) * 0.35;
	q2 = rot2(q2.y * -3.42 + time * 1.20) * q2;
	q2 = abs(q2) - 0.49;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.57);
	float d = d1 * d2;
	vec3 col = palette(d * 0.64 + time * 0.00, vec3(0.52, 0.59, 0.56), vec3(0.33, 0.38, 0.31), vec3(0.73, 1.23, 0.80), vec3(0.13, 0.95, 0.36));
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

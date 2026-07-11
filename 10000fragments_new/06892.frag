uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.99 + t * 2.85 + ph) * 0.7;
    float wb = sin(p.y * 9.49 - t * 1.68 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.73 + t * 1.13 + ph) + sin(p.y * 15.98 - t * 3.89 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.96, t * 0.56 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * 1.30 + time * 0.94) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.21 * fr * fr; }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d3 = fieldC(q3, time, 0.90);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.91, 0.30, 0.86) * (0.06 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

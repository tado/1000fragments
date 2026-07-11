uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.05 + t * 2.29 + ph) * 0.7;
    float wb = sin(p.y * 6.17 - t * 0.72 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.38;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.76 + t * 1.80 + ph) + sin(p.y * 7.06 - t * 3.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.41, length(q1) * 5.34 - time * 0.29); }
	q1 = rot2(q1.y * -3.10 + time * 0.97) * q1;
	q2 += vec2(-0.09, -1.00) * sin(length(q2) * 5.89 - time * 2.19) * 0.39;
	q2 = rot2(length(q2) * -2.93 + time * 1.09) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.30);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.62 + time * 0.21, vec3(0.42, 0.47, 0.48), vec3(0.42, 0.45, 0.49), vec3(0.88, 0.96, 0.86), vec3(0.60, 0.48, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

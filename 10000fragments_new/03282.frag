uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.73 + t * 2.11 + ph) * 0.7;
    float wb = sin(p.y * 16.58 - t * 1.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.36;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.39 + t * 2.36 + ph) * 0.7;
    float wb = sin(p.y * 9.38 - t * 0.63 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.31;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.44;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.97 + time * 1.09) * q1;
	q1 *= 3.06;
	q2 = rot2(time * -0.36) * q2;
	q2 *= 2.72;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.93);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.25));
	vec3 col = palette(d * 1.26 + time * 0.28, vec3(0.42, 0.51, 0.58), vec3(0.50, 0.36, 0.48), vec3(1.13, 0.76, 1.21), vec3(0.04, 0.00, 0.19));
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.07 + time * 14.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

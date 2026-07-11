uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.43 + sr * 5.85 - t * 3.47 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.44 + 0.28 * pow(abs(cos(ra * 4.0 + t * 0.72)), 2.65);
    v = sin((rr - pet) * 22.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 3.57 + time * 0.47) * q1;
	q1 *= 2.25;
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.76);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.45));
	vec3 col = palette(d * 0.59 + time * 0.17, vec3(0.51, 0.44, 0.58), vec3(0.31, 0.37, 0.48), vec3(0.83, 1.38, 1.13), vec3(0.27, 0.17, 0.39));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.96 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

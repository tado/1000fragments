uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.19, t * 2.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.17 * cos(sa * 5.0 + t * 1.92 + ph);
    v = sin((sr - petal) * 13.70);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.36;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 15.8) + 0.5) / 15.8;
	q2 = rot2(q2.y * -3.77 + time * 0.78) * q2;
	q2 += vec2(-0.02, -0.59) * sin(length(q2) * 3.38 - time * 2.19) * 0.23;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.51 + time * 0.87);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.35 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

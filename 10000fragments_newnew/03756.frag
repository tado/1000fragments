uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.59 + sin(p.y * 2.46 + t * 3.97) * 1.09 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.29 * cos(sa * 3.0 + t * 2.12 + ph);
    v = sin((sr - petal) * 9.11);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.54, t * 0.89 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = rot2(time * -0.89) * q3;
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 1.66));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.08);
	float d3 = fieldC(q3, time, 1.94);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.40));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.40, 0.34, 0.06), vec3(0.65, 0.64, 0.47), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

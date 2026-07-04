uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.67 + sin(p.y * 1.97 + t * 2.80) * 3.06 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.98 + sin(p.y * 4.22 + t * 2.39) * 2.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * 3.38 + time * 0.73) * q2;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.86, length(q2) * 3.46 - time * 0.77); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.04);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.39));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.91 + time * 0.28);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.77 - t * 2.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.49 + sr * 23.70 - t * 1.36 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 3.77 + time * 1.19) * 0.24;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.17, length(q1) * 5.76 - time * 0.74); }
	q2.y += sin(q2.x * 2.38 + time * 2.95) * 0.17;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.66));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.36, 0.19), vec3(0.56, 0.92, 0.62), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

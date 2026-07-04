uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.80 + t * 3.81 + ph) + sin(p.y * 8.95 - t * 3.81 + ph)
        + sin((p.x + p.y) * 4.77 + t * 3.81 + ph) + sin(length(p) * 16.05 - t * 3.81 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.82 + sin(p.y * 2.87 + t * 1.08) * 4.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 *= 2.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.25);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.31, 0.43), vec3(0.69, 0.72, 0.46), cc);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 0.83 + time * 17.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

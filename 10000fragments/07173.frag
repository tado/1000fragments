uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.39 + t * 0.57) - 0.5) * 2.0;
    v = sin((p.y * 7.45 + zx * 1.93 + t * 1.92) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.12 + t * 4.56 + ph) + sin(p.y * 13.76 - t * 4.56 + ph)
        + sin((p.x + p.y) * 4.74 + t * 4.56 + ph) + sin(length(p) * 17.71 - t * 4.56 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 2.58) - 0.5;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.69, length(q2) * 2.94 - time * 0.88); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.83);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.73, 1.33, 0.87) + vec3(0.02, 0.18, 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

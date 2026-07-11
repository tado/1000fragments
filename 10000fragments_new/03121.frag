uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.97 + t * 0.92 + ph) * 0.7;
    float wb = sin(p.y * 11.64 - t * 1.28 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.43;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.19 + sin(p.y * 4.01 + t * 4.35) * 4.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2.y += sin(q2.x * 5.79 + time * 2.48) * 0.14;
	q2 = fract(q2 * 2.25) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.39);
	float d = max(d1, d2);
	vec3 col = vec3(0.47, 0.21, 0.64) * (0.12 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= 0.83 + 0.17 * sin(gl_FragCoord.y * 2.06 + time * 16.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

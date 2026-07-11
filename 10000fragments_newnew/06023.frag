uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.18 + t * 2.10 + ph) * 0.7;
    float wb = sin(p.y * 18.81 - t * 1.07 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.24;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.21 + sin(p.y * 1.23 + t * 0.75) * 3.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.70;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.46, 1.24, 1.12) + vec3(0.11, 0.18, 0.03);
	col *= 0.82 + 0.11 * sin(gl_FragCoord.y * 0.88 + time * 4.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

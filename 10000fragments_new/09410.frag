uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.85 + t * 2.98 + ph) + sin(p.y * 4.59 - t * 2.98 + ph)
        + sin((p.x + p.y) * 6.87 + t * 2.98 + ph) + sin(length(p) * 13.23 - t * 2.98 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.84 + t * 1.68 + ph) * 0.7;
    float wb = sin(p.y * 10.09 - t * 0.62 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.43;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.43);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.39, 0.19), vec3(0.73, 0.79, 0.69), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

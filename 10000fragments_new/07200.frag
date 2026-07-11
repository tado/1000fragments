uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.51 + t * 1.36 + ph) + sin(p.y * 5.39 - t * 4.77 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.90 + t * 1.43 + ph) * 0.7;
    float wb = sin(p.y * 18.79 - t * 2.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.39, length(q2) * 4.38 - time * 0.40); }
	{ float fr = length(q2); q2 *= 1.0 + -0.20 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.53);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.18, 0.07), vec3(0.63, 0.72, 0.60), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.34 + vec2(t * 1.58, -t * 2.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.09 + t * 4.10 + ph) + sin(p.y * 4.91 - t * 1.15 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.35 * fr * fr; }
	q2 = abs(q2) - 0.43;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.87);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.22, 0.08), vec3(0.64, 0.69, 0.53), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

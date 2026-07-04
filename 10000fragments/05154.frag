uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.94 + t * 2.14 + ph) * 0.7;
    float wb = sin(p.y * 12.88 - t * 3.01 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.39;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.27 + t * 1.39 + ph) * 0.7;
    float wb = sin(p.y * 13.41 - t * 2.93 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.74;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	vec2 q1 = p; vec2 q2 = p;
	q1 = sin(q1 * 1.67 + time * 1.96) * 1.39;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.59, 1.20, 1.07) + vec3(0.16, 0.20, 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

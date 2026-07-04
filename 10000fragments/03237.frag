uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.60 + vec2(t * 1.66, -t * 1.34) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.85 - t * 0.36;
    v = sin(floor(lv * 3.4) / 3.4 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	vec2 q1 = p; vec2 q2 = p;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.84;
	{ float fr = length(q2); q2 *= 1.0 + 0.63 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.53);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.38, 0.40), vec3(0.65, 0.59, 0.53), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.72 + sr * 6.87 - t * 3.82 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.68 * sin(mf + 3.0) + ph), cos(t * 0.64 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.38 * fr * fr; }
	q2 *= 1.0 + 0.33 * sin(time * 2.99);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.64);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.02, 0.35), vec3(0.56, 0.82, 0.44), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

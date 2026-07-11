uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.41 * sin(mf + 3.0) + ph), cos(t * 1.31 * cos(mf + 3.0) + ph));
        ms += 0.063 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.94 + vec2(t * 2.62, -t * 0.83) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.02, length(q2) * 2.93 - time * 0.20); }
	q2 *= 2.80;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.10);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.72, 0.61, 0.61) + vec3(0.20, 0.19, 0.14);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

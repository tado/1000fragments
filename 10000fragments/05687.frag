uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.54 + t * 1.19 + ph) + sin(p.y * 3.71 - t * 5.90 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.14 + sin(p.y * 4.98 + t * 5.24) * 2.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = sin(q2 * 1.83 + time * 1.92) * 0.70;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.83; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.04);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.12, 0.13), vec3(0.91, 0.76, 0.42), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

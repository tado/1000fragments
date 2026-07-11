uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.38 + t * 2.29 + ph) + sin(p.y * 12.10 - t * 2.29 + ph)
        + sin((p.x + p.y) * 7.97 + t * 2.29 + ph) + sin(length(p) * 13.93 - t * 2.29 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.85 + vec2(t * 2.70, -t * 2.31) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.45; }
	q1 = fract(q1 * 1.50) - 0.5;
	q2 = abs(q2) - 0.57;
	q2 *= 2.17;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.61 + time * 0.69);
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 2.73 + time * 15.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

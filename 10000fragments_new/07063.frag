uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.52 + t * 4.69 + ph) + sin(p.y * 13.32 - t * 4.69 + ph)
        + sin((p.x + p.y) * 6.44 + t * 4.69 + ph) + sin(length(p) * 12.23 - t * 4.69 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.13 + vec2(t * 1.48, -t * 2.83) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.66 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.88);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.86 + time * 0.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.08 - t * 5.80 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.83, t * 1.72 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 24.7) + 0.5) / 24.7;
	q2 *= 2.57;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.96; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.58));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.74 + time * 0.59);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.55 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

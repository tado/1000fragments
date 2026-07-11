uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.32) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.34 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.59 + t * 1.70 + ph) + sin(p.y * 13.75 - t * 1.70 + ph)
        + sin((p.x + p.y) * 9.22 + t * 1.70 + ph) + sin(length(p) * 17.54 - t * 1.70 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q2); q2 *= 1.0 + 0.44 * fr * fr; }
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 1.12;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.49);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.27, 0.45), vec3(0.83, 0.98, 0.64), cc);
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.65 + sin(p.y * 4.57 + t * 3.61) * 3.08 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.70) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.98 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.33);
	float d = d1 * d2;
	vec3 col = vec3(0.19, 0.49, 0.60) * (0.20 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 1.96 + time * 8.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

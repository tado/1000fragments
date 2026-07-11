uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.35 + t * 4.99 + ph) + sin(p.y * 10.05 - t * 4.99 + ph)
        + sin((p.x + p.y) * 3.52 + t * 4.99 + ph) + sin(length(p) * 15.89 - t * 4.99 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.60) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 0.64 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 20.2) + 0.5) / 20.2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.49);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.21, 0.55, 0.82) + vec3(0.23, 0.18, 0.07);
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

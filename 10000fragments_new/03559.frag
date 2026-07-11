uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.27) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.82 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.87 + t * 1.65 + ph) + sin(p.y * 9.15 - t * 1.65 + ph)
        + sin((p.x + p.y) * 11.20 + t * 1.65 + ph) + sin(length(p) * 9.54 - t * 1.65 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.67;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.74 + time * 0.48);
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 1.87 + time * 5.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

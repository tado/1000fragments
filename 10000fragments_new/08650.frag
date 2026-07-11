uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.02) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 1.49 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.57 + t * 2.32 + ph) * 0.7;
    float wb = sin(p.y * 5.38 - t * 3.30 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.31;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.83 + t * 4.81 + ph) + sin(p.y * 12.12 - t * 4.81 + ph)
        + sin((p.x + p.y) * 3.28 + t * 4.81 + ph) + sin(length(p) * 4.16 - t * 4.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 *= 1.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.33);
	float d3 = fieldC(q3, time, 0.07);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.86 + time * 0.16);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.31) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 3.08 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.88;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.43) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 1.55) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.48;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.05);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.20, 0.22), vec3(0.96, 0.81, 0.86), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

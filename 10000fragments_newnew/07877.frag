uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.31 + t * 0.93 + ph) + sin(p.y * 7.32 - t * 0.93 + ph)
        + sin((p.x + p.y) * 8.85 + t * 0.93 + ph) + sin(length(p) * 12.99 - t * 0.93 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.95;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.39) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 2.43) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.62, 0.79) * sin(length(q1) * 3.86 - time * 2.27) * 0.33;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.78));
	q2.y += sin(q2.x * 5.36 + time * 3.13) * 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.10);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.26, 0.28), vec3(0.83, 0.88, 0.54), cc);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

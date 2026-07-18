uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.76 + vec2(t * 0.76, -t * 0.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 29.34 - t * 5.25 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 27.03 - t * 2.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, (time * 0.86), 0.0);
	float d2 = fieldB(q2, (time * 0.86), 0.75);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.55, 0.47, 0.55) + vec3(0.08, 0.05, 0.06);
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 1.99 + (time * 0.86) * 11.24);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.032, 0.995, 0.936);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

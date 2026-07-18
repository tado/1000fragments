uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.98;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.82 + 0.27 * sin((time * 0.64) * 1.11);
	float n2 = 1.21 + 0.85 * cos((time * 0.64) * 1.43);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = palette((v * 1.18 + sr * 1.57) * 1.14 + (time * 0.64) * 0.08, vec3(0.30, 0.35, 0.27), vec3(0.26, 0.30, 0.16), vec3(0.97, 1.05, 1.02), vec3(0.12, 0.19, 0.08));
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.70;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.981, 1.005, 0.931);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

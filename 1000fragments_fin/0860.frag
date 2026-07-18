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
	p.x = abs(p.x) - 0.32;
	p += vec2(sin((time * 0.76) * 0.41), cos((time * 0.76) * 0.41)) * 0.13;
	p *= 1.19;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.49 + 0.28 * sin((time * 0.76) * 0.92);
	float n2 = 0.98 + 0.90 * cos((time * 0.76) * 1.29);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.43;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = palette((v * 1.73 + sr * 1.57) * 1.18 + (time * 0.76) * 0.02, vec3(0.15, 0.32, 0.41), vec3(0.15, 0.25, 0.33), vec3(0.96, 0.97, 0.98), vec3(0.51, 0.45, 0.37));
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.63;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.939, 0.984, 1.050);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

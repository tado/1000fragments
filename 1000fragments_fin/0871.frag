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
	p.x = abs(p.x) - 0.49;
	p *= 1.18;
	p *= 1.25;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.44 + 0.67 * sin((time * 0.85) * 1.36);
	float n2 = 2.18 + 0.67 * cos((time * 0.85) * 1.35);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	vec3 col = palette((v * 1.25 + sr * 0.51) * 1.03 + (time * 0.85) * 0.15, vec3(0.52, 0.48, 0.48), vec3(0.52, 0.49, 0.51), vec3(1.03, 0.96, 1.03), vec3(-0.01, 0.31, 0.63));
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.87;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.017, 0.964, 1.009);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

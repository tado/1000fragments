uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.58 + 0.57 * sin((time * 0.64) * 0.82);
	float n2 = 0.88 + 0.25 * cos((time * 0.64) * 1.67);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.02, d);

	vec3 col = palette((v * 2.42 + sr * 1.20) * 0.78 + (time * 0.64) * 0.13, vec3(0.28, 0.24, 0.25), vec3(0.33, 0.25, 0.29), vec3(0.81, 0.68, 0.61), vec3(0.75, 0.21, 0.57));
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.81;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.915, 0.989, 1.032) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

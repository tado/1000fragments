uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.51) * 1.19), cos((time * 0.51) * 0.59)) * 0.11;
	p *= 1.36;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.60 + 0.60 * sin((time * 0.51) * 1.47);
	float n2 = 2.37 + 0.78 * cos((time * 0.51) * 1.01);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.49;
	float d = sr - rr;
	float v = sin(d * 13.72 - (time * 0.51) * 3.18);
	vec3 col = palette((v) * 0.98 + (time * 0.51) * 0.09, vec3(0.36, 0.38, 0.45), vec3(0.22, 0.22, 0.19), vec3(0.83, 0.66, 0.64), vec3(0.27, 0.50, 0.52));
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 1.41 + (time * 0.51) * 4.81);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.048, 0.973, 0.919) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

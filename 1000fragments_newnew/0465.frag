uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.25 + 0.56 * sin((time * 0.85) * 0.84);
	float n2 = 1.16 + 0.27 * cos((time * 0.85) * 0.65);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = sin(d * 27.48 - (time * 0.85) * 5.25);
	vec3 col = palette((v) * 0.68 + (time * 0.85) * 0.16, vec3(0.49, 0.56, 0.46), vec3(0.12, 0.13, 0.13), vec3(0.52, 0.42, 0.82), vec3(0.26, 0.12, 0.16));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.78 + (time * 0.85) * 10.86);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.937, 0.983, 1.029) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

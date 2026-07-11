uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.19 + 0.51 * sin((time * 0.67) * 0.83);
	float n2 = 0.54 + 0.36 * cos((time * 0.67) * 1.60);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.45, 0.44, 0.62) * (0.04 / (abs((v)) + 0.06));
	col = col / (1.0 + col);
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 2.02 + (time * 0.67) * 15.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.986, 0.942) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

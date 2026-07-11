uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.21 + 0.51 * sin((time * 0.52) * 1.22);
	float n2 = 1.85 + 0.53 * cos((time * 0.52) * 0.41);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.49;
	float d = sr - rr;
	float v = sin(d * 29.37 - (time * 0.52) * 2.44);
	vec3 col = vec3(0.50, 0.49, 0.59) * (0.12 / (abs((v)) + 0.09));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 0.997, 0.994) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

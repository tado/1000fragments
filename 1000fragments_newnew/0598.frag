uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.57 + 0.41 * sin((time * 0.59) * 1.25);
	float n2 = 0.70 + 0.35 * cos((time * 0.59) * 0.57);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = sin(d * 10.61 - (time * 0.59) * 2.45);
	vec3 col = vec3(0.56, 0.44, 0.61) * (0.11 / (abs((v)) + 0.04));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.59)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.989, 1.004) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

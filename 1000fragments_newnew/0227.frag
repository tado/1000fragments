uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.72 + 0.38 * sin((time * 0.68) * 1.00);
	float n2 = 0.98 + 0.70 * cos((time * 0.68) * 1.01);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.60;
	float d = sr - rr;
	float v = d;
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.07, 0.13), vec3(0.75, 0.75, 0.64), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.68)) * 100.0) - 0.5) * 0.06;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.046, 0.982, 0.932) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

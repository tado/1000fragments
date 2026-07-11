uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2((time * 0.51) * 1.46) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.40 + 0.25 * sin((time * 0.51) * 1.70);
	float n2 = 1.40 + 0.65 * cos((time * 0.51) * 0.61);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.48;
	float d = sr - rr;
	float v = sin(d * 17.39 - (time * 0.51) * 3.26);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.55, 0.66, 0.65) + vec3(0.07, 0.04, 0.03);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 0.998, 1.004) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

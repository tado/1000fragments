uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.99 + 0.27 * sin(time * 1.26);
	float n2 = 0.58 + 0.47 * cos(time * 1.57);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.64, 0.42, 0.42) * (0.11 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

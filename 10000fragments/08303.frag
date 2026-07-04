uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(time * -1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.50 + 0.61 * sin(time * 1.17);
	float n2 = 0.96 + 0.38 * cos(time * 1.78);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.88;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = palette(v * 1.48 + sr * 0.93 * 1.14 + time * 0.16, vec3(0.58, 0.46, 0.44), vec3(0.42, 0.46, 0.45), vec3(0.97, 0.90, 0.72), vec3(0.06, 0.25, 0.14));
	col *= 1.0 - smoothstep(0.0, 0.15, d) * 0.68;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

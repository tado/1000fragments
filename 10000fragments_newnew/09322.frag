uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	p = rot2(time * 0.84) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.93 + 0.69 * sin(time * 1.90);
	float n2 = 1.72 + 0.81 * cos(time * 0.62);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = palette(v * 1.40 + sr * 1.01 * 0.55 + time * 0.06, vec3(0.56, 0.49, 0.47), vec3(0.43, 0.47, 0.38), vec3(1.01, 0.92, 0.96), vec3(0.06, 0.67, 0.06));
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.94;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

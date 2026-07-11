uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2(time * 0.83) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 0.99 + 0.49 * sin(time * 1.01);
	float n2 = 0.59 + 0.97 * cos(time * 1.25);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.74;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	vec3 col = palette(v * 2.16 + sr * 1.00 * 0.45 + time * 0.10, vec3(0.60, 0.41, 0.54), vec3(0.31, 0.45, 0.39), vec3(0.83, 1.04, 1.38), vec3(0.97, 0.06, 0.77));
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.92;
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 1.48 + time * 4.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

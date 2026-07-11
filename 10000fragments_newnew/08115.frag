uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	p = rot2(time * -1.24) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.67 + 0.21 * sin(time * 1.68);
	float n2 = 1.49 + 0.91 * cos(time * 1.62);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.43;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = hue(v * 1.51 + sr * 1.56 * 0.48 + time * 0.28);
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.68;
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 1.72 + time * 6.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

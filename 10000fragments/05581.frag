uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = rot2(time * -1.50) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.92 + 0.11 * sin(time * 1.11);
	float n2 = 0.90 + 0.48 * cos(time * 1.29);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.68;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = hue(v * 1.62 + sr * 1.26 * 1.47 + time * 0.03);
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

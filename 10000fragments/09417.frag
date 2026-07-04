uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2(time * -0.38) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.74 + 0.77 * sin(time * 1.19);
	float n2 = 0.69 + 0.53 * cos(time * 1.42);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = hue(v * 1.73 + sr * 1.37 * 0.70 + time * 0.26);
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

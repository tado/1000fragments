uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2(time * 1.54) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.99 + 0.56 * sin(time * 0.70);
	float n2 = 2.41 + 0.86 * cos(time * 1.14);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.03, d);

	vec3 col = palette(v * 1.23 + sr * 1.95 * 0.74 + time * 0.02, vec3(0.52, 0.53, 0.60), vec3(0.50, 0.42, 0.42), vec3(1.38, 1.36, 0.84), vec3(0.39, 0.36, 0.26));
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.89;
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

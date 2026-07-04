uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2(time * -1.14) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.90 + 0.19 * sin(time * 1.95);
	float n2 = 2.21 + 0.33 * cos(time * 1.38);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.57;
	float d = sr - rr;
	float v = sin(d * 14.11 - time * 4.55);
	vec3 col = hue(v * 0.43 + time * 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	p = rot2(time * -1.20) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.03 + 0.65 * sin(time * 0.75);
	float n2 = 1.10 + 0.62 * cos(time * 1.68);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = hue(v * 2.03 + sr * 1.98 * 0.80 + time * 0.02);
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.75;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.75 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

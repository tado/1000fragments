uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.30 + 0.40 * sin(time * 0.58);
	float n2 = 2.22 + 0.80 * cos(time * 0.77);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.42;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = hue(v * 1.10 + sr * 0.66 * 1.24 + time * 0.34);
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.69;
	col = fract(col * 1.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

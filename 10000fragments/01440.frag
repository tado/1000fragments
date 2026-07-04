uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.78 + 0.36 * sin(time * 1.83);
	float n2 = 1.36 + 1.00 * cos(time * 0.71);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = hue(v * 1.26 + sr * 0.56 * 0.85 + time * 0.39);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.94;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

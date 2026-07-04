uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.11 + 0.34 * sin(time * 1.11);
	float n2 = 2.02 + 0.85 * cos(time * 1.64);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = sin(d * 12.70 - time * 1.94);
	vec3 col = hue(v * 1.13 + time * 0.35);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

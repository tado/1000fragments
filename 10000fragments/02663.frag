uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.57 + 0.19 * sin(time * 1.98);
	float n2 = 1.63 + 0.96 * cos(time * 1.70);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = sin(d * 23.41 - time * 5.94);
	vec3 col = hue(v * 1.18 + time * 0.01);
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

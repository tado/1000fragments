uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.55 + 0.68 * sin(time * 1.69);
	float n2 = 2.26 + 0.89 * cos(time * 1.30);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.56;
	float d = sr - rr;
	float v = sin(d * 12.18 - time * 1.68);
	vec3 col = hue(v * 0.83 + time * 0.22);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

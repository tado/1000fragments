uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.95 + 0.48 * sin(time * 0.83);
	float n2 = 1.80 + 0.84 * cos(time * 1.15);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.65;
	float d = sr - rr;
	float v = d;
	vec3 col = hue(v * 1.27 + time * 0.01);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.65 + 0.34 * sin(time * 1.61);
	float n2 = 1.54 + 0.46 * cos(time * 0.65);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.57;
	float d = sr - rr;
	float v = sin(d * 23.14 - time * 1.05);
	vec3 col = hue(v * 1.09 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

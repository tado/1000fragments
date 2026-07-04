uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.97 + 0.55 * sin(time * 0.58);
	float n2 = 2.48 + 0.97 * cos(time * 1.16);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.84;
	float d = sr - rr;
	float v = d;
	vec3 col = hue(v * 0.96 + time * 0.22);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 2.01 + time * 11.81);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

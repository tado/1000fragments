uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.74 + 0.39 * sin(time * 0.65);
	float n2 = 0.72 + 0.41 * cos(time * 0.87);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.87;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = hue(v * 1.60 + sr * 1.29 * 0.43 + time * 0.38);
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.74;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

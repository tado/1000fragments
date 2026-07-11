uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.54 + 0.21 * sin((time * 0.79) * 1.94);
	float n2 = 1.42 + 0.58 * cos((time * 0.79) * 1.55);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = d;
	vec3 col = palette((v) * 1.11 + (time * 0.79) * 0.22, vec3(0.40, 0.42, 0.40), vec3(0.15, 0.14, 0.11), vec3(0.76, 0.77, 0.48), vec3(0.75, 0.22, 0.83));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.942, 1.007) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

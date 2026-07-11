uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.79 + 0.42 * sin((time * 0.65) * 1.11);
	float n2 = 2.19 + 0.54 * cos((time * 0.65) * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.62;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.08, d);

	vec3 col = palette((v * 2.46 + sr * 0.81) * 0.69 + (time * 0.65) * 0.16, vec3(0.47, 0.54, 0.44), vec3(0.23, 0.25, 0.19), vec3(0.59, 0.68, 0.76), vec3(0.49, 0.38, 0.40));
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.93;
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 1.59 + (time * 0.65) * 5.02);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.027, 0.944, 1.028) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

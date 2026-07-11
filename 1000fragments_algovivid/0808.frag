uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.30;
	p = rot2((time * 0.80) * -1.19) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 2.00 + 0.76 * sin((time * 0.80) * 1.29);
	float n2 = 2.25 + 0.85 * cos((time * 0.80) * 1.64);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.85;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.04, d);

	vec3 col = palette((v * 1.35 + sr * 0.72) * 1.16 + (time * 0.80) * 0.14, vec3(0.29, 0.33, 0.33), vec3(0.16, 0.23, 0.22), vec3(0.77, 0.76, 0.56), vec3(0.50, 0.48, 0.77));
	col *= 1.0 - smoothstep(0.0, 0.07, d) * 0.84;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.995, 1.009) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

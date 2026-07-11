uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.60;
	p += vec2(sin((time * 0.60) * 0.66), cos((time * 0.60) * 1.18)) * 0.12;
	p *= 2.13;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.25 * sin((time * 0.60) * 1.09), 0.30 + 0.09 * cos((time * 0.60) * 1.33));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.56);
	vec3 col = palette((v * 3.10) * 1.00 + (time * 0.60) * 0.14, vec3(0.37, 0.42, 0.30), vec3(0.33, 0.30, 0.30), vec3(0.66, 0.85, 0.44), vec3(0.51, 0.59, 0.76));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.959, 1.002) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

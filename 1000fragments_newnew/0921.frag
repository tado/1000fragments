uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.10 * sin((time * 0.72) * 1.58), 0.11 + 0.15 * cos((time * 0.72) * 0.92));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.34);
	vec3 col = palette((v * 1.79) * 0.86 + (time * 0.72) * 0.17, vec3(0.34, 0.30, 0.33), vec3(0.18, 0.09, 0.08), vec3(0.88, 0.45, 0.57), vec3(0.77, 0.46, 0.99));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.046, 0.975, 0.932) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

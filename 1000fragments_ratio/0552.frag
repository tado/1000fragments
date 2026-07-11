uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.49 + (time * 0.60) * 0.82) * 0.18;
	p *= 1.33;
	vec2 z = p;
	vec2 c = vec2(0.16 + 0.16 * sin((time * 0.60) * 1.89), 0.06 + 0.28 * cos((time * 0.60) * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.07);
	vec3 col = palette((v * 2.02) * 0.82 + (time * 0.60) * 0.05, vec3(0.29, 0.38, 0.29), vec3(0.29, 0.27, 0.27), vec3(0.42, 0.78, 0.42), vec3(0.74, 0.31, 0.89));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.81 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.947, 1.000) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

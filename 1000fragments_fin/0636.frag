uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec2 z = p;
	vec2 c = vec2(0.18 + 0.20 * sin((time * 0.88) * 1.15), -0.24 + 0.30 * cos((time * 0.88) * 0.42));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.27);
	vec3 col = palette((v * 3.87) * 0.53 + (time * 0.88) * 0.21, vec3(0.31, 0.24, 0.37), vec3(0.44, 0.36, 0.50), vec3(1.03, 0.98, 1.02), vec3(0.57, 0.82, 0.07));
	col = clamp((col - 0.5) * 2.08 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.018, 0.959, 1.007);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

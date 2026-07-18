uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.74;
	p += vec2(sin((time * 0.68) * 1.15), cos((time * 0.68) * 0.52)) * 0.15;
	p *= 1.29;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.22 * sin((time * 0.68) * 1.41), -0.42 + 0.14 * cos((time * 0.68) * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.71);
	vec3 col = palette((v * 2.41) * 1.15 + (time * 0.68) * 0.21, vec3(0.17, 0.34, 0.43), vec3(0.17, 0.27, 0.29), vec3(0.97, 1.02, 1.02), vec3(0.56, 0.44, 0.31));
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.042, 1.003, 0.941);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

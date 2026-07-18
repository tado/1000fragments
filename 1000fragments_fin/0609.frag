uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.23;
	vec2 z = p;
	vec2 c = vec2(0.23 + 0.23 * sin((time * 0.64) * 1.51), -0.05 + 0.20 * cos((time * 0.64) * 0.44));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.67);
	vec3 col = palette((v * 1.97) * 1.07 + (time * 0.64) * 0.04, vec3(0.30, 0.28, 0.39), vec3(0.40, 0.41, 0.48), vec3(0.97, 0.98, 0.97), vec3(0.62, 0.83, 0.12));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.004, 0.995, 1.005);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.54;
	p *= 2.11;
	vec2 z = p;
	vec2 c = vec2(0.11 + 0.20 * sin((time * 0.88) * 1.81), -0.51 + 0.15 * cos((time * 0.88) * 0.93));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.42);
	vec3 col = palette((v * 3.83) * 0.74 + (time * 0.88) * 0.10, vec3(0.49, 0.40, 0.34), vec3(0.38, 0.37, 0.32), vec3(1.00, 0.97, 1.00), vec3(0.09, 0.36, 0.58));
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.026, 0.994, 0.941);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

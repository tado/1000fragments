uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.91) * 0.85), cos((time * 0.91) * 0.69)) * 0.05;
	p.x = abs(p.x);
	p *= 1.98;
	p = rot2((time * 0.91) * -0.96) * p;
	vec2 z = p;
	vec2 c = vec2(-0.74 + 0.16 * sin((time * 0.91) * 1.32), -0.11 + 0.19 * cos((time * 0.91) * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.44, -0.21)));
	}
	float v = exp(-trap * 2.55);
	vec3 col = palette((v * 2.74) * 0.46 + (time * 0.91) * 0.05, vec3(0.51, 0.44, 0.39), vec3(0.40, 0.35, 0.35), vec3(1.04, 0.96, 1.00), vec3(0.07, 0.37, 0.53));
	col *= 0.86 + 0.20 * sin(gl_FragCoord.y * 2.35 + (time * 0.91) * 4.22);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.012, 1.009, 0.989);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

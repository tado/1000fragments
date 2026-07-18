uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p += vec2(sin((time * 0.65) * 0.48), cos((time * 0.65) * 0.46)) * 0.07;
	p *= 1.10;
	vec2 z = p;
	vec2 c = vec2(-0.16 + 0.06 * sin((time * 0.65) * 1.63), -0.44 + 0.12 * cos((time * 0.65) * 0.97));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.46, 0.32)));
	}
	float v = exp(-trap * 5.63);
	vec3 col = palette((v * 2.26) * 0.52 + (time * 0.65) * 0.17, vec3(0.28, 0.41, 0.28), vec3(0.22, 0.29, 0.18), vec3(1.02, 0.97, 0.98), vec3(0.14, 0.19, 0.03));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.926, 0.997, 1.044);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

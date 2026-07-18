uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	p *= 1.65;
	vec2 q = p * 2.54;
	float am = 0.34;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 2.16 + (time * 0.70) * 0.49), sin(q.x * 2.31 - (time * 0.70) * 0.33));
		q = rot2(0.79) * q;
		am *= 0.78;
	}
	float v = sin(q.x * 3.46 + q.y * 1.00);
	vec3 col = palette((v) * 0.51 + (time * 0.70) * 0.05, vec3(0.50, 0.39, 0.43), vec3(0.35, 0.28, 0.35), vec3(1.00, 1.02, 0.98), vec3(0.79, 0.91, 0.16));
	col = mix(col, vec3(0.03, 0.04, 0.05), smoothstep(0.88, 1.0, abs(v)) * 0.75);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.943, 0.985, 1.035);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

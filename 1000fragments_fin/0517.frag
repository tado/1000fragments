uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.36 + (time * 0.62) * 0.68) * 0.12;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	vec2 q = p * 1.85;
	float am = 0.35;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 1.95 + (time * 0.62) * 0.24), sin(q.x * 2.03 - (time * 0.62) * 0.36));
		am *= 0.75;
	}
	float v = sin(q.x * 3.82 + q.y * 1.49);
	vec3 col = palette((v) * 1.16 + (time * 0.62) * 0.09, vec3(0.52, 0.48, 0.38), vec3(0.29, 0.23, 0.18), vec3(1.02, 0.99, 0.98), vec3(0.04, 0.10, 0.27));
	col = clamp((col - 0.5) * 1.71 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.018, 0.991, 0.959);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

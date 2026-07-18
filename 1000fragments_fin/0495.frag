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
	p.y += sin(p.x * 2.62 + (time * 0.67) * 1.04) * 0.16;
	p *= 0.76;
	p *= 2.29;
	vec2 q = p * 2.79;
	float am = 0.28;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 2.78 + (time * 0.67) * 0.31), sin(q.x * 1.45 - (time * 0.67) * 0.78));
		q = rot2(0.32) * q;
		am *= 0.68;
	}
	float v = sin(q.x * 1.62 + q.y * 0.73);
	vec3 col = palette((v) * 0.67 + (time * 0.67) * 0.10, vec3(0.41, 0.35, 0.47), vec3(0.36, 0.27, 0.36), vec3(0.97, 1.00, 1.03), vec3(0.07, 0.15, 0.59));
	col = mix(col, vec3(0.00, 0.00, 0.02), smoothstep(0.81, 1.0, abs(v)) * 0.85);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.016, 0.984, 0.948);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

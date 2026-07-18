uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.63) * 0.33), cos((time * 0.63) * 0.94)) * 0.07;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 2.47;
	vec2 q = p * 2.01;
	float am = 0.47;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 2.96 + (time * 0.63) * 0.29), sin(q.x * 1.43 - (time * 0.63) * 0.32));
		q = rot2(0.85) * q;
		am *= 0.76;
	}
	float v = sin(q.x * 3.00 + q.y * 1.01);
	vec3 col = palette((v) * 1.09 + (time * 0.63) * 0.01, vec3(0.31, 0.24, 0.42), vec3(0.40, 0.37, 0.46), vec3(1.02, 0.98, 0.99), vec3(0.60, 0.83, 0.08));
	col = mix(col, vec3(0.06, 0.12, 0.13), smoothstep(0.82, 1.0, abs(v)) * 0.80);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.020, 0.987, 0.955);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

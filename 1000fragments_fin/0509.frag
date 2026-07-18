uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.23 + (time * 0.65) * 0.86) * 0.06;
	p *= 2.11;
	vec2 q = p * 1.47;
	float am = 0.50;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 2.79 + (time * 0.65) * 0.26), sin(q.x * 2.51 - (time * 0.65) * 0.53));
		am *= 0.66;
	}
	float v = sin(q.x * 2.58 + q.y * 1.98);
	vec3 col = palette((v) * 1.18 + (time * 0.65) * 0.20, vec3(0.16, 0.36, 0.46), vec3(0.15, 0.28, 0.29), vec3(0.98, 1.04, 1.00), vec3(0.53, 0.42, 0.37));
	col = mix(col, vec3(0.12, 0.09, 0.09), smoothstep(0.80, 1.0, abs(v)) * 0.51);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.034, 0.972, 0.943);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q = p * 2.61;
	float am = 0.33;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 3.00 + (time * 0.89) * 0.71), sin(q.x * 1.77 - (time * 0.89) * 0.52));
		am *= 0.80;
	}
	float v = sin(q.x * 2.06 + q.y * 0.87);
	vec3 col = palette((v) * 1.02 + (time * 0.89) * 0.10, vec3(0.30, 0.38, 0.29), vec3(0.25, 0.26, 0.17), vec3(0.99, 0.98, 1.02), vec3(0.10, 0.23, 0.04));
	col = mix(col, vec3(0.00, 0.04, 0.02), smoothstep(0.80, 1.0, abs(v)) * 0.69);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.009, 0.995, 0.952);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

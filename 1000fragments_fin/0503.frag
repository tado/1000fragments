uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.56;
	p *= 1.25;
	p *= 1.29;
	vec2 q = p * 1.73;
	float am = 0.33;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 2.22 + (time * 0.77) * 0.53), sin(q.x * 2.85 - (time * 0.77) * 0.62));
		am *= 0.84;
	}
	float v = sin(q.x * 2.49 + q.y * 1.17);
	vec3 col = palette((v) * 0.69 + (time * 0.77) * 0.02, vec3(0.29, 0.25, 0.39), vec3(0.44, 0.37, 0.50), vec3(1.05, 0.99, 1.01), vec3(0.60, 0.79, 0.06));
	col = mix(col, vec3(0.08, 0.14, 0.07), smoothstep(0.81, 1.0, abs(v)) * 0.61);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.010, 1.013, 0.993);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

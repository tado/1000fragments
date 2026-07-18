uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p = p.yx;
	vec2 q = p * 1.90;
	float am = 0.43;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 2.34 + (time * 0.68) * 0.70), sin(q.x * 1.55 - (time * 0.68) * 0.57));
		am *= 0.69;
	}
	float v = sin(q.x * 2.70 + q.y * 0.78);
	vec3 col = palette((v) * 0.94 + (time * 0.68) * 0.13, vec3(0.49, 0.49, 0.48), vec3(0.50, 0.53, 0.51), vec3(0.97, 1.00, 1.00), vec3(-0.02, 0.31, 0.66));
	col = mix(col, vec3(0.06, 0.05, 0.03), smoothstep(0.87, 1.0, abs(v)) * 0.64);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.008, 0.994, 0.999);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

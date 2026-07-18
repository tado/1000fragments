uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.12 * sin((time * 0.69) * 0.54), 0.11 + 0.09 * cos((time * 0.69) * 0.97));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.90);
	vec3 col = palette((v * 3.19) * 0.71 + (time * 0.69) * 0.05, vec3(0.31, 0.38, 0.24), vec3(0.21, 0.29, 0.16), vec3(1.02, 1.02, 1.02), vec3(0.12, 0.17, 0.05));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.986, 1.006, 0.990);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

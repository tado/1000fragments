uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2((time * 0.64) * 0.52) * p;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.13 * sin((time * 0.64) * 1.31), -0.50 + 0.11 * cos((time * 0.64) * 1.46));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.59);
	vec3 col = vec3(0.56, 0.65, 0.56) * (0.11 / (abs((v * 1.84)) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.999, 1.005, 1.015) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

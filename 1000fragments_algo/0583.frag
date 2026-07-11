uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	p = rot2((time * 0.64) * 0.65) * p;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.09 * sin((time * 0.64) * 1.64), 0.46 + 0.20 * cos((time * 0.64) * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.24);
	vec3 col = vec3(0.45, 0.62, 0.47) * (0.09 / (abs((v * 2.80)) + 0.05));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.027, 0.997, 0.916) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

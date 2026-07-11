uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	p = rot2((time * 0.58) * -1.14) * p;
	vec2 z = p;
	vec2 c = vec2(-0.36 + 0.10 * sin((time * 0.58) * 1.06), 0.47 + 0.09 * cos((time * 0.58) * 0.97));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.90);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.07)) * vec3(0.61, 0.65, 0.60) + vec3(0.01, 0.03, 0.06);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.944, 0.974, 1.035) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

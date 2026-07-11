uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p = rot2((time * 0.76) * -0.71) * p;
	vec2 z = p;
	vec2 c = vec2(-0.16 + 0.25 * sin((time * 0.76) * 1.70), -0.29 + 0.12 * cos((time * 0.76) * 1.09));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.01);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.63)) * vec3(0.62, 0.63, 0.56) + vec3(0.04, 0.05, 0.03);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.96));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.947, 0.981, 1.053) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

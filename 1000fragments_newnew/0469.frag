uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	p = rot2((time * 0.57) * -1.26) * p;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.20 * sin((time * 0.57) * 0.76), 0.04 + 0.19 * cos((time * 0.57) * 0.88));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.45, 0.48)));
	}
	float v = exp(-trap * 5.95);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.09)) * vec3(0.51, 0.53, 0.44) + vec3(0.08, 0.08, 0.01);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.004, 1.006, 0.998) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

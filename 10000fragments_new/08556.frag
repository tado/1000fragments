uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	p = rot2(time * -0.53) * p;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.15 * sin(time * 1.84), 0.46 + 0.16 * cos(time * 1.34));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.10, 0.18)));
	}
	float v = exp(-trap * 5.53);
	float cc = clamp(0.5 + 0.5 * v * 2.23, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.28, 0.34), vec3(0.79, 0.89, 0.70), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

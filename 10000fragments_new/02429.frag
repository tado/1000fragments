uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = rot2(time * -0.68) * p;
	vec2 z = p;
	vec2 c = vec2(-0.78 + 0.15 * sin(time * 0.58), -0.09 + 0.15 * cos(time * 0.42));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.40, 0.29)));
	}
	float v = exp(-trap * 5.80);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.82 * 1.68 + time * 0.91);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 1.05 + time * 17.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

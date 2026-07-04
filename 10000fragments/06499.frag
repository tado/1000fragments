uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = rot2(time * -1.35) * p;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.20 * sin(time * 0.79), -0.45 + 0.15 * cos(time * 1.41));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.49, -0.15)));
	}
	float v = exp(-trap * 4.13);
	vec3 col = vec3(0.59, 0.92, 0.52) * (0.12 / (abs(v * 3.27) + 0.08));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

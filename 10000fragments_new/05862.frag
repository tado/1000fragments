uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p = rot2(time * -1.51) * p;
	vec3 col = vec3(0.011, 0.041, 0.078);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.81 * (0.3 + fi * 0.18) + fi * 2.4), cos(time * 0.54 * (0.4 + fi * 0.07) + fi * 1.7)) * 0.53;
		float gd = abs(length(p - q) - 0.20);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.47 + time * 1.31)) * (0.027 / (gd + 0.040));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

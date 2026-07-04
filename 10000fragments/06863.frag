uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.030, 0.013, 0.074);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.02 + time * 1.70), sin(fi * 1.02 + time * 1.70)) * (0.48 + 0.39 * sin(fi * 1.7 + time * 1.88));
		float gd = abs(length(p - q) - 0.29);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.35 + time * 1.05)) * (0.033 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

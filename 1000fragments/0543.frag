uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	vec3 col = vec3(0.004, 0.010, 0.001);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.02 + time * 0.80), sin(fi * 2.02 + time * 0.80)) * (0.46 + 0.12 * sin(fi * 1.7 + time * 1.50));
		float gd = abs(length(p - q) - 0.10);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.82 + time * 0.23)) * (0.015 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

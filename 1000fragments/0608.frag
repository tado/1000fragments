uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	vec3 col = vec3(0.022, 0.043, 0.048);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 0.76 * (0.3 + fi * 0.22) + fi * 2.4), cos(time * 1.50 * (0.4 + fi * 0.13) + fi * 1.7)) * 0.67;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.81 + time * 1.40)) * (0.028 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

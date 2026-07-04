uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	p = rot2(time * 0.78) * p;
	vec3 col = vec3(0.021, 0.029, 0.032);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.38 + time * 1.73), sin(fi * 2.38 + time * 1.73)) * (0.43 + 0.16 * sin(fi * 1.7 + time * 1.41));
		float gd = abs(length(p - q) - 0.30);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.56 + time * 1.48)) * (0.032 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

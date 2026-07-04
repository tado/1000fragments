uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	vec3 col = vec3(0.016, 0.028, 0.012);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.65 + time * 0.57), sin(fi * 1.65 + time * 0.57)) * (0.76 + 0.26 * sin(fi * 1.7 + time * 1.17));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.67 + time * 0.38)) * (0.017 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

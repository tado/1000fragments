uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	vec3 col = vec3(0.054, 0.027, 0.043);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.45 + time * 1.94), sin(fi * 2.45 + time * 1.94)) * (0.74 + 0.20 * sin(fi * 1.7 + time * 1.76));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.73 + time * 0.53)) * (0.015 / (gd + 0.031));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

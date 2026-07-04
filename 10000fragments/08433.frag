uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	vec3 col = vec3(0.000, 0.011, 0.010);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.64 + time * 1.78), sin(fi * 1.64 + time * 1.78)) * (0.40 + 0.27 * sin(fi * 1.7 + time * 1.78));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.77 + time * 0.57)) * (0.019 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	vec3 col = vec3(0.020, 0.055, 0.065);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.05 + time * 2.06), sin(fi * 2.05 + time * 2.06)) * (0.77 + 0.35 * sin(fi * 1.7 + time * 0.59));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.59 + time * 1.04)) * (0.016 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.46 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

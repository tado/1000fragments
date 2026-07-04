uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.035, 0.012, 0.053);
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 1.74;
		float w = 0.13 * sin(p.x * 8.63 + time * 1.63 + fl * 0.64);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.56 + time * 0.45)) * (0.0069 / (ld + 0.0049));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

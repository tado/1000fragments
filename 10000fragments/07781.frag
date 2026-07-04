uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.039, 0.016, 0.014);
	for(int li = 0; li < 8; li++){
		float fl = float(li);
		float fy = (fl / 8.0 - 0.5) * 1.46;
		float w = 0.27 * sin(p.x * 3.62 + time * 3.55 + fl * 1.45) * exp(-p.x * p.x * 3.88);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 1.09 + time * 0.74)) * (0.0052 / (ld + 0.0073));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

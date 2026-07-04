uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.010, 0.012, 0.001);
	for(int li = 0; li < 17; li++){
		float fl = float(li);
		float fy = (fl / 17.0 - 0.5) * 1.60;
		float w = 0.12 * sin(p.x * 3.27 + time * 2.45 + fl * 1.47) * exp(-p.x * p.x * 3.54);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.20 + time * 0.81)) * (0.0024 / (ld + 0.0045));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	vec3 col = vec3(0.005, 0.029, 0.033);
	for(int li = 0; li < 19; li++){
		float fl = float(li);
		float fy = (fl / 19.0 - 0.5) * 1.50;
		float w = 0.07 * sin(p.x * 5.11 + (time * 0.67) * 2.58 + fl * 0.38);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.33, 2.66) + fl * 0.22 + (time * 0.67) * 0.99)) * (0.0074 / (ld + 0.0060));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.944, 0.969, 1.053) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

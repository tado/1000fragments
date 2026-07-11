uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.y = abs(p.y) - 0.59;
	p.x += p.y * 0.44;
	p *= 1.10;
	vec3 col = vec3(0.019, 0.004, 0.030);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.60) * 1.94 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 2.0 + 1.48), sin(ft * 1.0)) * 0.81;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.20, 2.40) + ft * 1.16)) * (0.0051 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(0.958, 1.012, 0.951) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

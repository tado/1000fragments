uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 0.89;
	vec3 col = vec3(0.026, 0.027, 0.020);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.52) * 1.18 - float(ci) * 0.05;
		vec2 cp = cos(ft * 3.0) * 0.55 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.65) + ft * 1.83)) * (0.0113 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 1.016, 0.929) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

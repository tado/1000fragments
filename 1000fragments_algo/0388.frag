uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.46 + (time * 0.58) * 0.62) * 0.05;
	p += vec2(sin((time * 0.58) * 0.46), cos((time * 0.58) * 0.81)) * 0.15;
	vec3 col = vec3(0.057, 0.028, 0.003);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.79 + (time * 0.58) * 2.13), sin(fi * 1.79 + (time * 0.58) * 2.13)) * (0.69 + 0.12 * sin(fi * 1.7 + (time * 0.58) * 0.65));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.78, 1.57) + fi * 1.07 + (time * 0.58) * 0.86)) * (0.015 / (gd + 0.030));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.970, 0.947) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

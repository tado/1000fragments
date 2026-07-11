uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 col = vec3(0.027, 0.024, 0.010);
	for(int ci = 0; ci < 29; ci++){
		float ft = (time * 0.52) * 0.61 - float(ci) * 0.10;
		vec2 cp = cos(ft * 6.0) * 0.88 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.26, 2.53) + ft * 1.61)) * (0.0093 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 0.946, 0.993) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

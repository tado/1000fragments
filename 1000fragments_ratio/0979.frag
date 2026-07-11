uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = rot2((time * 0.63) * -0.51) * p;
	vec3 col = vec3(0.027, 0.016, 0.035);
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 1.78;
		float w = 0.21 * sin(p.x * 3.77 + (time * 0.63) * 4.04 + fl * 1.13) * exp(-p.x * p.x * 3.40);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.10, 2.21) + fl * 0.93 + (time * 0.63) * 0.43)) * (0.0031 / (ld + 0.0134));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(1.014, 1.014, 0.981) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

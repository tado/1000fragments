uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y += sin(p.x * 2.26 + (time * 0.56) * 0.58) * 0.10;
	p = rot2((time * 0.56) * -1.24) * p;
	vec3 col = vec3(0.000, 0.023, 0.031);
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.56;
		float w = 0.06 * sin(p.x * 8.07 + (time * 0.56) * 2.34 + fl * 0.37);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + fl * 0.78 + (time * 0.56) * 0.45)) * (0.0027 / (ld + 0.0071));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 0.980, 0.993) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

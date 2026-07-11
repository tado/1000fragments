uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.51) * 0.76), cos((time * 0.51) * 1.06)) * 0.13;
	p = rot2((time * 0.51) * -0.52) * p;
	vec3 col = vec3(0.033, 0.010, 0.028);
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 2.04;
		float w = 0.13 * sin(p.x * 4.10 + (time * 0.51) * 2.37 + fl * 1.23);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.22, 2.43) + fl * 0.62 + (time * 0.51) * 1.18)) * (0.0036 / (ld + 0.0118));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 1.007, 0.955) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

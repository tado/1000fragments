uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * 0.68;
	p *= 1.33;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.38;
		q = rot2(0.84 + (time * 0.61) * 0.07) * q;
		q *= 1.14;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(-0.39, 0.13)));
	}
	vec3 col = mix(vec3(0.027, 0.022, 0.058), vec3(0.016, 0.044, 0.042), clamp(0.5 + p.y * -0.31 + p.x * -0.18, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(2.276, 2.987, 3.699) + 2.64 + (time * 0.61) * 0.22)) * (0.0139 / (d1 + 0.007));
	col += (0.5 + 0.5 * cos(vec3(2.276, 2.987, 3.699) + 3.75 + (time * 0.61) * 0.37)) * (0.0114 / (d2 + 0.037));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.988, 1.009, 0.996);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

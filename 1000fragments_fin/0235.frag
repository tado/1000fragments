uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.44;
		q = rot2(0.38 + (time * 0.77) * -0.07) * q;
		q *= 1.11;
		d1 = min(d1, abs(length(q) - 0.46));
	}
	vec3 col = mix(vec3(0.020, 0.037, 0.059), vec3(0.014, 0.036, 0.037), clamp(0.5 + p.y * 0.55 + p.x * -0.05, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(3.740, 5.469, 7.197) + 4.92 + (time * 0.77) * 0.17)) * (0.0143 / (d1 + 0.013));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.939, 0.970, 1.041);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

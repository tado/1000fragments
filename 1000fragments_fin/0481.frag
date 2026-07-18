uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.27;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	vec2 q = p * 2.43;
	float am = 0.34;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 2.57 + (time * 0.66) * 0.53), sin(q.x * 1.37 - (time * 0.66) * 0.56));
		q = rot2(0.81) * q;
		am *= 0.61;
	}
	float v = sin(q.x * 3.42 + q.y * 2.30);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.875, 0.907, 0.915), vec3(0.867, 0.304, 0.261), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.054, 0.986, 0.938);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

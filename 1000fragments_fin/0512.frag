uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q = p * 2.59;
	float am = 0.43;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 2.52 + (time * 0.81) * 0.31), sin(q.x * 1.28 - (time * 0.81) * 0.57));
		q = rot2(1.19) * q;
		am *= 0.82;
	}
	float v = sin(q.x * 1.71 + q.y * 0.73);
	vec3 col = vec3(0.851, 0.929, 0.694) * (0.10 / (abs((v)) + 0.03));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.048, 0.989, 0.926);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

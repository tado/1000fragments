uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.81) * 0.40), cos((time * 0.81) * 0.61)) * 0.11;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.62;
		q = rot2(1.58 + (time * 0.81) * -0.07) * q;
		q *= 1.06;
		d1 = min(d1, abs(length(q) - 0.37));
	}
	vec3 col = vec3(0.00, 0.01, 0.03);
	col += (0.5 + 0.5 * cos(vec3(4.835, 6.665, 8.495) + 1.28 + (time * 0.81) * 0.58)) * (0.0094 / (d1 + 0.018));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.943, 0.971, 1.052);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

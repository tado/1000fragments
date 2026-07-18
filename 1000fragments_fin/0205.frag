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
		q = abs(q) - 0.26;
		q = rot2(0.75 + sin((time * 0.69) * 0.34) * 0.18) * q;
		q *= 1.14;
		d1 = min(d1, abs(q.y));
	}
	vec3 col = vec3(0.03, 0.03, 0.00);
	col += (0.5 + 0.5 * cos(vec3(2.672, 3.575, 4.479) + 4.98 + (time * 0.69) * 0.11)) * (0.0147 / (d1 + 0.016));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.034, 0.974, 0.959);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.63;
	p.y += sin(p.x * 1.00 + (time * 0.55) * 0.99) * 0.14;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 0.97;
	p = rot2((time * 0.55) * -0.93) * p;
	vec3 col = vec3(0.003, 0.018, 0.080);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.20 + (time * 0.55) * 1.64), sin(fi * 2.20 + (time * 0.55) * 1.64)) * (0.56 + 0.37 * sin(fi * 1.7 + (time * 0.55) * 0.63));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(4.459, 6.322, 8.185) + fi * 1.59 + (time * 0.55) * 0.88)) * (0.019 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.007, 0.979, 0.961);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

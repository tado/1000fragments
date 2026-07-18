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
	for(int ci = 0; ci < 6; ci++){
		q = abs(q) - 0.51;
		q = rot2(2.33 + sin((time * 0.64) * 0.73) * 0.17) * q;
		q *= 1.20;
		d1 = min(d1, abs(q.y));
	}
	vec3 col = mix(vec3(0.031, 0.045, 0.098), vec3(0.045, 0.041, 0.051), clamp(0.5 + p.y * -0.24 + p.x * 0.27, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.888, 6.405, 7.921) + 4.56 + (time * 0.64) * 0.59)) * (0.0088 / (d1 + 0.007));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.939, 0.975, 1.040);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

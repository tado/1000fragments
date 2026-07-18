uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.11;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.57;
		q = rot2(2.08 + sin((time * 0.84) * 0.68) * 0.09) * q;
		q *= 1.07;
		d1 = min(d1, abs(q.x));
	}
	vec3 col = mix(vec3(0.049, 0.042, 0.061), vec3(0.040, 0.073, 0.073), clamp(0.5 + p.y * 0.17 + p.x * -0.08, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(3.707, 4.651, 5.596) + 2.07 + (time * 0.84) * 0.42)) * (0.0113 / (d1 + 0.015));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.019, 0.965, 1.016);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

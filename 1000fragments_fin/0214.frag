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
	for(int ci = 0; ci < 7; ci++){
		q = abs(q) - 0.54;
		q = rot2(2.25 + (time * 0.83) * 0.09) * q;
		q *= 1.14;
		d1 = min(d1, abs(q.x));
	}
	vec3 col = vec3(0.07, 0.07, 0.05);
	col += (0.5 + 0.5 * cos(vec3(1.229, 2.976, 4.724) + 2.60 + (time * 0.83) * 0.23)) * (0.0077 / (d1 + 0.009));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.029, 0.990, 0.944);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

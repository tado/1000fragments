uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 6.84;
		float pv = sin(gq.x + (time * 0.51) * 2.23) * sin(gq.y - (time * 0.51) * 0.85);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.20, 2.40) + pv * 3.09 + float(zi) * 0.86 + (time * 0.51) * 0.04));
		q = rot2(0.94) * q * 0.63 + vec2(-0.05, 0.20);
		fw *= 0.72;
	}
	col *= 0.36;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.016, 0.932) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

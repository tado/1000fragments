uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 4.95;
		float pv = sin(gq.x + (time * 0.81) * 1.98) * sin(gq.y - (time * 0.81) * 1.62);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.62, 1.23) + pv * 4.00 + float(zi) * 0.40 + (time * 0.81) * 0.32));
		q = rot2(0.58) * q * 1.28 + vec2(0.05, 0.01);
		fw *= 0.75;
	}
	col *= 0.44;
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 1.94 + (time * 0.81) * 10.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.025, 0.922) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

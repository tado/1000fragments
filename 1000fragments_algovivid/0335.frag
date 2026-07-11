uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 7.60;
		float pv = sin(gq.x + (time * 0.55) * 0.93) * sin(gq.y - (time * 0.55) * 2.03);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.68, 3.36) + pv * 3.54 + float(zi) * 0.47 + (time * 0.55) * 0.80));
		q = rot2(0.64) * q * 1.60 + vec2(-0.28, -0.25);
		fw *= 0.59;
	}
	col *= 0.44;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.989, 0.916) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

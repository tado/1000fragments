uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	vec2 q = p * 1.52;
	float am = 0.43;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 3.17 + (time * 0.71) * 0.65), sin(q.x * 3.03 - (time * 0.71) * 0.45));
		q = rot2(0.70) * q;
		am *= 0.73;
	}
	float v = sin(q.x * 3.80 + q.y * 1.55);
	vec3 col = palette((v) * 0.63 + (time * 0.71) * 0.13, vec3(0.30, 0.37, 0.28), vec3(0.23, 0.26, 0.15), vec3(0.95, 1.03, 1.03), vec3(0.07, 0.23, 0.07));
	col = mix(col, vec3(0.04, 0.09, 0.08), smoothstep(0.76, 1.0, abs(v)) * 0.73);
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 1.24 + (time * 0.71) * 15.79);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.045, 1.002, 0.924);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

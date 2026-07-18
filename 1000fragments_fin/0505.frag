uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p += vec2(sin((time * 0.91) * 1.07), cos((time * 0.91) * 0.49)) * 0.20;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	vec2 q = p * 1.58;
	float am = 0.28;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 1.41 + (time * 0.91) * 0.37), sin(q.x * 2.80 - (time * 0.91) * 0.29));
		q = rot2(0.67) * q;
		am *= 0.63;
	}
	float v = sin(q.x * 3.91 + q.y * 1.74);
	vec3 col = palette((v) * 0.54 + (time * 0.91) * 0.05, vec3(0.40, 0.33, 0.48), vec3(0.41, 0.32, 0.38), vec3(0.98, 1.04, 0.99), vec3(0.09, 0.13, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.71));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.944, 0.971, 1.048);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

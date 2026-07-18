uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.70) * 1.32;
	float g = dot(sin(q * 2.18), cos(q.zxy * 2.18));
	return (abs(g) - 0.52) / (2.18 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.70) * 0.74), cos((time * 0.70) * 0.71)) * 0.06;
	p.y += sin(p.x * 1.10 + (time * 0.70) * 0.91) * 0.10;
	vec3 ro = vec3(0.0, 0.0, -2.84);
	vec3 rd = normalize(vec3(p, 1.43));
	rd.xy = rot2((time * 0.70) * -0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.27 + (time * 0.70) * 0.25, vec3(0.60, 0.70, 0.82), vec3(0.23, 0.22, 0.18), vec3(1.04, 1.04, 0.97), vec3(0.48, 0.56, 0.63)) * fog;
	col += vec3(0.93, 0.95, 0.89) * (it / 62.0) * 0.85;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.021, 0.997, 0.937);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

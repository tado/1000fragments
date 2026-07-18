uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.xz = rot2((time * 0.89) * 1.39) * q.xz;
	q.xy = rot2((time * 0.89) * 0.68) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.97, q.y);
	return length(w) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 ro = vec3(0.0, 0.0, -3.14);
	vec3 rd = normalize(vec3(p, 1.15));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.29 + (time * 0.89) * 0.38, vec3(0.16, 0.34, 0.42), vec3(0.15, 0.24, 0.28), vec3(1.02, 0.99, 1.02), vec3(0.51, 0.48, 0.31)) * fog;
	col += vec3(0.83, 0.71, 0.51) * (it / 66.0) * 0.38;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.028, 0.987, 0.938);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

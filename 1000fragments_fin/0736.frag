uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.xz = rot2((time * 0.66) * 1.52) * q.xz;
	q.xy = rot2((time * 0.66) * 0.58) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.39, q.y);
	return length(w) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	vec3 ro = vec3(0.0, 0.0, -2.99);
	vec3 rd = normalize(vec3(p, 1.06));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.39 + (time * 0.66) * 0.01, vec3(0.52, 0.48, 0.52), vec3(0.51, 0.50, 0.48), vec3(1.04, 1.02, 0.97), vec3(0.00, 0.31, 0.69)) * fog;
	col += vec3(0.78, 0.46, 0.96) * (it / 49.0) * 0.90;
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.004, 0.994, 1.006);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.82) * 0.90;
	vec3 mq = mod(q, 1.65) - 0.83;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 ro = vec3(0.83, 0.83, -3.0);
	vec3 rd = normalize(vec3(p, 1.34));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.20 + (time * 0.82) * 0.10, vec3(0.14, 0.34, 0.46), vec3(0.16, 0.27, 0.27), vec3(1.03, 0.99, 1.03), vec3(0.53, 0.47, 0.31)) * fog;
	col += vec3(0.60, 0.26, 0.91) * (it / 54.0) * 0.61;
	col = clamp((col - 0.5) * 2.04 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.025, 0.973, 0.943);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

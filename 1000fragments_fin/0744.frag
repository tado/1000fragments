uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.67) * 1.91;
	vec2 g = mod(vec2(q.x, q.z), 2.17) - 1.09;
	float d = length(g) - (0.28 + 0.07 * sin(q.y * 3.91 + (time * 0.67) * 2.26));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.32 + (time * 0.67) * 0.37, vec3(0.46, 0.40, 0.34), vec3(0.31, 0.30, 0.23), vec3(0.98, 0.96, 0.74), vec3(0.00, 0.24, 0.42)) * fog;
	col += vec3(0.89, 0.62, 0.91) * (it / 60.0) * 0.74;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.932, 0.984, 1.033);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

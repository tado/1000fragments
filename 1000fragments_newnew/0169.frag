uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.66) * 1.65;
	vec2 g = mod(vec2(q.x, q.z), 2.17) - 1.08;
	float d = length(g) - (0.26 + 0.05 * sin(q.y * 1.96 + (time * 0.66) * 1.47));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.08, 1.08, -3.0);
	vec3 rd = normalize(vec3(p, 1.29));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.20 + (time * 0.66) * 0.00, vec3(0.38, 0.36, 0.39), vec3(0.22, 0.21, 0.18), vec3(0.78, 0.86, 0.50), vec3(0.55, 0.31, 0.74)) * fog;
	col += vec3(0.67, 0.35, 0.53) * (it / 61.0) * 0.46;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.944, 1.016) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

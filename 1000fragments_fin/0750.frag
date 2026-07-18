uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.58) * 1.62;
	vec2 g = mod(vec2(q.x, q.z), 1.90) - 0.95;
	float d = length(g) - (0.25 + 0.07 * sin(q.y * 1.97 + (time * 0.58) * 2.99));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.95, 0.95, -3.0);
	vec3 rd = normalize(vec3(p, 1.16));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.31 + (time * 0.58) * 0.35, vec3(0.52, 0.42, 0.38), vec3(0.42, 0.37, 0.32), vec3(0.96, 1.03, 0.97), vec3(0.05, 0.33, 0.55)) * fog;
	col += vec3(0.63, 0.69, 0.81) * (it / 57.0) * 0.98;
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.038, 0.996, 0.932);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

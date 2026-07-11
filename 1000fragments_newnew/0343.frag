uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.67) * 2.03;
	vec3 mq = mod(q, 2.43) - 1.22;
	return length(mq) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.40));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.28 + (time * 0.67) * 0.21, vec3(0.47, 0.49, 0.47), vec3(0.22, 0.18, 0.21), vec3(0.52, 0.45, 0.54), vec3(0.09, 0.46, 0.68)) * fog;
	col += vec3(0.90, 0.59, 0.99) * (it / 61.0) * 0.74;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.81 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.977, 1.002, 0.927) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

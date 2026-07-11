uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.69) * 0.67;
	vec3 mq = mod(q, 2.14) - 1.07;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.69 + (time * 0.69) * 0.82) * 0.10;
	vec3 ro = vec3(1.07, 1.07, -3.0);
	vec3 rd = normalize(vec3(p, 1.36));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.29 + (time * 0.69) * 0.24, vec3(0.45, 0.36, 0.35), vec3(0.14, 0.23, 0.21), vec3(0.89, 0.60, 0.43), vec3(0.52, 0.67, 0.93)) * fog;
	col += vec3(0.50, 0.21, 1.00) * (it / 52.0) * 0.88;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.984, 0.946) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

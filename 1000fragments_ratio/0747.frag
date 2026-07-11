uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	q.z += (time * 0.81) * 1.09;
	vec2 g = mod(vec2(q.x, q.z), 2.39) - 1.19;
	float d = length(g) - (0.22 + 0.05 * sin(q.y * 3.42 + (time * 0.81) * 1.61));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.19, 1.19, -3.0);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.26 + (time * 0.81) * 0.09, vec3(0.43, 0.43, 0.44), vec3(0.12, 0.14, 0.12), vec3(0.76, 0.41, 0.86), vec3(0.30, 0.34, 0.21)) * fog;
	col += vec3(0.92, 0.41, 0.94) * (it / 51.0) * 0.76;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 1.007, 0.998) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.62) * 0.99;
	vec2 g = mod(vec2(q.x, q.z), 2.15) - 1.07;
	float d = length(g) - (0.20 + 0.05 * sin(q.y * 3.05 + (time * 0.62) * 3.67));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.07, 1.07, -3.0);
	vec3 rd = normalize(vec3(p, 1.24));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.32 + (time * 0.62) * 0.03, vec3(0.36, 0.26, 0.35), vec3(0.14, 0.21, 0.15), vec3(0.79, 0.48, 0.43), vec3(0.89, 0.70, 0.61)) * fog;
	col += vec3(0.65, 0.40, 0.29) * (it / 66.0) * 0.67;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 0.992, 0.935) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.67) * 1.23;
	vec2 g = mod(vec2(q.x, q.z), 2.19) - 1.10;
	float d = length(g) - (0.22 + 0.11 * sin(q.y * 2.37 + (time * 0.67) * 1.17));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.10, 1.10, -3.0);
	vec3 rd = normalize(vec3(p, 1.17));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.33 + (time * 0.67) * 0.19, vec3(0.45, 0.44, 0.48), vec3(0.18, 0.19, 0.17), vec3(0.71, 0.71, 0.66), vec3(0.81, 0.31, 0.73)) * fog;
	col += vec3(0.56, 0.72, 0.30) * (it / 51.0) * 0.60;
	col = clamp((col - 0.5) * 1.64 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.965, 0.999, 0.951) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

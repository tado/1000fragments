uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.63) * 1.47;
	vec2 g = mod(vec2(q.x, q.z), 2.43) - 1.21;
	float d = length(g) - (0.17 + 0.11 * sin(q.y * 3.74 + (time * 0.63) * 1.49));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.22;
	vec3 ro = vec3(1.21, 1.21, -3.0);
	vec3 rd = normalize(vec3(p, 0.95));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.23 + (time * 0.63) * 0.25, vec3(0.46, 0.34, 0.40), vec3(0.08, 0.15, 0.08), vec3(0.83, 0.73, 0.87), vec3(0.44, 0.78, 0.25)) * fog;
	col += vec3(0.69, 0.72, 0.21) * (it / 62.0) * 0.48;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.041, 0.997, 0.937) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

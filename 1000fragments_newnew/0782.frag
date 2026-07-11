uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.52) * 1.51;
	vec2 g = mod(vec2(q.x, q.z), 2.34) - 1.17;
	float d = length(g) - (0.28 + 0.06 * sin(q.y * 1.64 + (time * 0.52) * 2.23));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.20));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.34 + (time * 0.52) * 0.25, vec3(0.52, 0.50, 0.51), vec3(0.19, 0.17, 0.26), vec3(0.68, 0.85, 0.62), vec3(0.98, 0.11, 0.29)) * fog;
	col += vec3(0.42, 0.71, 0.35) * (it / 64.0) * 0.73;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.042, 1.000, 0.924) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

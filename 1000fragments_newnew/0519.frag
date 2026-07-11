uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.77) * 1.18;
	vec2 g = mod(vec2(q.x, q.z), 2.04) - 1.02;
	float d = length(g) - (0.22 + 0.13 * sin(q.y * 2.26 + (time * 0.77) * 1.67));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.02, 1.02, -3.0);
	vec3 rd = normalize(vec3(p, 1.34));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.17 + (time * 0.77) * 0.31, vec3(0.38, 0.38, 0.41), vec3(0.17, 0.19, 0.26), vec3(0.45, 0.71, 0.76), vec3(0.30, 0.74, 0.44)) * fog;
	col += vec3(0.50, 0.52, 0.66) * (it / 54.0) * 0.84;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.973, 1.026, 0.941) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

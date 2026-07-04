uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	vec2 g = mod(vec2(q.x, q.z), 2.19) - 1.09;
	float d = length(g) - (0.23 + 0.12 * sin(q.y * 2.04 + time * 1.76));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.06));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.21 + time * 0.21, vec3(0.41, 0.48, 0.56), vec3(0.42, 0.34, 0.36), vec3(1.06, 0.86, 1.31), vec3(0.66, 0.24, 0.44)) * fog;
	col += vec3(0.61, 0.83, 0.48) * (it / 64.0) * 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

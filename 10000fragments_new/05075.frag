uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.77;
	vec3 mq = mod(q, 1.73) - 0.87;
	return length(mq) - 0.28;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.87, 0.87, -3.0);
	vec3 rd = normalize(vec3(p, 1.78));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.12 + time * 0.19, vec3(0.46, 0.46, 0.52), vec3(0.39, 0.30, 0.45), vec3(1.25, 1.30, 1.37), vec3(0.64, 0.17, 0.65)) * fog;
	col += vec3(0.49, 0.83, 0.22) * (it / 59.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

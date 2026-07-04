uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.20;
	vec3 mq = mod(q, 1.77) - 0.89;
	return length(mq) - 0.28;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.89, 0.89, -3.0);
	vec3 rd = normalize(vec3(p, 1.51));
	rd.xy = rot2(time * 0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.18 + time * 0.17, vec3(0.52, 0.49, 0.56), vec3(0.32, 0.49, 0.43), vec3(1.28, 0.99, 1.26), vec3(0.16, 0.33, 0.23)) * fog;
	col += vec3(0.45, 0.63, 0.44) * (it / 57.0) * 0.54;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

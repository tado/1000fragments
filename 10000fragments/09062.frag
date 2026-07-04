uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.54;
	vec3 mq = mod(q, 1.72) - 0.86;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.86, 0.86, -3.0);
	vec3 rd = normalize(vec3(p, 1.27));
	rd.xy = rot2(time * -0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.16 + time * 0.05, vec3(0.53, 0.60, 0.53), vec3(0.33, 0.44, 0.43), vec3(0.77, 1.21, 0.82), vec3(0.52, 0.53, 0.68)) * fog;
	col += vec3(0.86, 0.36, 0.70) * (it / 65.0) * 0.59;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

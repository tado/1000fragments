uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.02;
	vec3 mq = mod(q, 2.58) - 1.29;
	return length(mq) - 0.50;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.29, 1.29, -3.0);
	vec3 rd = normalize(vec3(p, 1.63));
	rd.xy = rot2(time * -0.07) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.27 + time * 0.13, vec3(0.58, 0.41, 0.57), vec3(0.42, 0.35, 0.45), vec3(0.74, 1.14, 0.95), vec3(0.15, 0.93, 0.96)) * fog;
	col += vec3(0.98, 0.86, 0.34) * (it / 61.0) * 0.93;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

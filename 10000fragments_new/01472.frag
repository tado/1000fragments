uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.63;
	vec3 mq = mod(q, 2.74) - 1.37;
	mq.xy = rot2(time * -1.62) * mq.xy;
	vec3 b = abs(mq) - vec3(0.39);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.37, 1.37, -3.0);
	vec3 rd = normalize(vec3(p, 1.78));
	rd.xy = rot2(time * -0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.39 + time * 0.40, vec3(0.57, 0.53, 0.41), vec3(0.31, 0.38, 0.47), vec3(0.75, 1.17, 1.16), vec3(0.95, 0.55, 0.42)) * fog;
	col += vec3(0.40, 0.23, 0.58) * (it / 68.0) * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

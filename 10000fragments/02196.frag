uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.07;
	vec3 mq = mod(q, 1.86) - 0.93;
	mq.xy = rot2(time * -1.43) * mq.xy;
	vec3 b = abs(mq) - vec3(0.28);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.93, 0.93, -3.0);
	vec3 rd = normalize(vec3(p, 0.94));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.26 + time * 0.04, vec3(0.49, 0.43, 0.57), vec3(0.34, 0.40, 0.37), vec3(1.32, 0.79, 1.10), vec3(0.66, 0.60, 0.50)) * fog;
	col += vec3(0.47, 0.71, 0.58) * (it / 70.0) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.07;
	vec3 mq = mod(q, 2.35) - 1.17;
	return length(mq) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.65));
	rd.xy = rot2(time * 0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.12 + time * 0.25, vec3(0.51, 0.46, 0.53), vec3(0.34, 0.46, 0.33), vec3(1.27, 0.85, 1.33), vec3(0.88, 0.07, 0.66)) * fog;
	col += vec3(0.99, 0.66, 0.47) * (it / 51.0) * 0.93;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

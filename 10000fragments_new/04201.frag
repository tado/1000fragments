uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.35;
	vec3 mq = mod(q, 2.35) - 1.18;
	return length(mq) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.56));
	rd.xy = rot2(time * 0.20) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.31 + time * 0.07, vec3(0.41, 0.41, 0.55), vec3(0.40, 0.32, 0.33), vec3(0.89, 1.07, 0.81), vec3(0.99, 0.80, 0.94)) * fog;
	col += vec3(0.51, 0.70, 0.54) * (it / 55.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

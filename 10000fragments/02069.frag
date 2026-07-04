uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.40;
	vec3 mq = mod(q, 2.04) - 1.02;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.02, 1.02, -3.0);
	vec3 rd = normalize(vec3(p, 0.97));
	rd.xy = rot2(time * -0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.29 + time * 0.22, vec3(0.60, 0.53, 0.46), vec3(0.38, 0.30, 0.40), vec3(1.29, 0.98, 0.71), vec3(0.45, 0.48, 0.47)) * fog;
	col += vec3(0.32, 0.64, 0.36) * (it / 66.0) * 0.99;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

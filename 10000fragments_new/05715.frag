uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.40;
	vec3 mq = mod(q, 2.48) - 1.24;
	return length(mq) - 0.47;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.24, 1.24, -3.0);
	vec3 rd = normalize(vec3(p, 1.15));
	rd.xy = rot2(time * -0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.16 + time * 0.33, vec3(0.58, 0.56, 0.47), vec3(0.40, 0.37, 0.38), vec3(1.25, 1.17, 1.24), vec3(0.78, 0.75, 0.97)) * fog;
	col += vec3(0.47, 0.97, 0.45) * (it / 60.0) * 0.58;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

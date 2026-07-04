uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.60;
	vec3 mq = mod(q, 1.72) - 0.86;
	return length(mq) - 0.47;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.86, 0.86, -3.0);
	vec3 rd = normalize(vec3(p, 1.77));
	rd.xy = rot2(time * 0.28) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.22 + time * 0.02, vec3(0.40, 0.46, 0.54), vec3(0.41, 0.49, 0.38), vec3(0.80, 0.89, 1.33), vec3(0.18, 0.40, 0.53)) * fog;
	col += vec3(0.97, 0.53, 0.71) * (it / 60.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

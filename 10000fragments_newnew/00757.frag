uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.22;
	vec3 mq = mod(q, 1.62) - 0.81;
	return length(mq) - 0.48;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.81, 0.81, -3.0);
	vec3 rd = normalize(vec3(p, 1.40));
	rd.xy = rot2(time * -0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.38 + time * 0.34, vec3(0.52, 0.53, 0.51), vec3(0.43, 0.43, 0.45), vec3(0.86, 0.86, 0.99), vec3(0.59, 0.80, 0.66)) * fog;
	col += vec3(0.74, 0.64, 0.92) * (it / 70.0) * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.29;
	vec3 mq = mod(q, 2.17) - 1.09;
	return length(mq) - 0.48;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 0.96));
	rd.xy = rot2(time * 0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.26 + time * 0.21, vec3(0.50, 0.53, 0.45), vec3(0.34, 0.35, 0.38), vec3(1.18, 1.18, 1.35), vec3(0.63, 0.82, 0.04)) * fog;
	col += vec3(0.60, 0.26, 0.80) * (it / 57.0) * 0.32;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

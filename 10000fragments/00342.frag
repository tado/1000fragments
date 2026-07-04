uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.26;
	vec3 mq = mod(q, 2.03) - 1.02;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.02, 1.02, -3.0);
	vec3 rd = normalize(vec3(p, 0.96));
	rd.xy = rot2(time * -0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.21 + time * 0.33, vec3(0.56, 0.59, 0.51), vec3(0.32, 0.32, 0.44), vec3(1.38, 1.29, 0.87), vec3(0.39, 0.02, 0.30)) * fog;
	col += vec3(0.47, 0.47, 0.86) * (it / 71.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

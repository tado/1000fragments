uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.89;
	float g = dot(sin(q * 3.84), cos(q.zxy * 3.84));
	return (abs(g) - 0.66) / (3.84 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.50);
	vec3 rd = normalize(vec3(p, 1.24));
	rd.xy = rot2(time * -0.28) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.17 + time * 0.11, vec3(0.60, 0.53, 0.51), vec3(0.44, 0.31, 0.33), vec3(1.18, 0.97, 0.81), vec3(0.43, 0.01, 0.10)) * fog;
	col += vec3(0.74, 0.93, 0.96) * (it / 70.0) * 0.81;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

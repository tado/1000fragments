uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.96;
	float g = dot(sin(q * 3.35), cos(q.zxy * 3.35));
	return (abs(g) - 0.60) / (3.35 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.72);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2(time * -0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.32 + time * 0.33, vec3(0.50, 0.59, 0.45), vec3(0.50, 0.39, 0.35), vec3(1.04, 1.27, 1.29), vec3(0.35, 0.28, 0.93)) * fog;
	col += vec3(0.74, 0.52, 0.96) * (it / 65.0) * 0.76;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

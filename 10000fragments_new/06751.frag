uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.58;
	float g = dot(sin(q * 2.36), cos(q.zxy * 2.36));
	return (abs(g) - 0.24) / (2.36 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.85);
	vec3 rd = normalize(vec3(p, 1.57));
	rd.xy = rot2(time * -0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.39 + time * 0.12, vec3(0.54, 0.57, 0.44), vec3(0.34, 0.40, 0.38), vec3(1.30, 1.11, 1.19), vec3(0.16, 0.49, 0.97)) * fog;
	col += vec3(0.95, 0.80, 0.62) * (it / 54.0) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

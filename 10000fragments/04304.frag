uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.50;
	float g = dot(sin(q * 3.24), cos(q.zxy * 3.24));
	return (abs(g) - 0.52) / (3.24 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.53);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * 0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.11 + time * 0.21, vec3(0.46, 0.42, 0.48), vec3(0.47, 0.31, 0.36), vec3(1.30, 0.83, 1.11), vec3(0.16, 0.55, 0.27)) * fog;
	col += vec3(1.00, 0.82, 0.41) * (it / 52.0) * 0.66;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

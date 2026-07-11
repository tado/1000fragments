uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.55;
	float g = dot(sin(q * 1.56), cos(q.zxy * 1.56));
	return (abs(g) - 0.73) / (1.56 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.79);
	vec3 rd = normalize(vec3(p, 1.12));
	rd.xy = rot2(time * 0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.24 + time * 0.12, vec3(0.46, 0.49, 0.59), vec3(0.36, 0.36, 0.36), vec3(0.84, 0.82, 1.19), vec3(0.83, 0.56, 0.94)) * fog;
	col += vec3(0.62, 0.26, 0.50) * (it / 48.0) * 0.32;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

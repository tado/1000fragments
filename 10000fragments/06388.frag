uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.12;
	float g = dot(sin(q * 3.03), cos(q.zxy * 3.03));
	return (abs(g) - 0.76) / (3.03 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.36);
	vec3 rd = normalize(vec3(p, 1.72));
	rd.xy = rot2(time * -0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.38 + time * 0.36, vec3(0.46, 0.51, 0.51), vec3(0.31, 0.37, 0.43), vec3(0.74, 0.72, 0.87), vec3(0.20, 0.43, 0.38)) * fog;
	col += vec3(0.53, 0.75, 0.63) * (it / 72.0) * 0.76;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

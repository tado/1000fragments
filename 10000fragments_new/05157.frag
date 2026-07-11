uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.44;
	float g = dot(sin(q * 1.53), cos(q.zxy * 1.53));
	return (abs(g) - 0.29) / (1.53 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.37);
	vec3 rd = normalize(vec3(p, 1.23));
	rd.xy = rot2(time * 0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.13 + time * 0.37, vec3(0.50, 0.44, 0.57), vec3(0.33, 0.37, 0.32), vec3(0.73, 0.83, 1.35), vec3(0.97, 0.36, 0.75)) * fog;
	col += vec3(0.66, 0.63, 0.71) * (it / 60.0) * 0.90;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

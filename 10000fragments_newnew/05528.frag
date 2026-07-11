uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.87;
	float g = dot(sin(q * 3.78), cos(q.zxy * 3.78));
	return (abs(g) - 0.54) / (3.78 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.53));
	rd.xy = rot2(time * 0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.28 + time * 0.03, vec3(0.57, 0.41, 0.59), vec3(0.44, 0.48, 0.41), vec3(0.91, 0.94, 0.76), vec3(0.04, 0.89, 0.68)) * fog;
	col += vec3(0.43, 0.50, 0.54) * (it / 56.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.05;
	float g = dot(sin(q * 3.68), cos(q.zxy * 3.68));
	return (abs(g) - 0.38) / (3.68 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.41);
	vec3 rd = normalize(vec3(p, 1.78));
	rd.xy = rot2(time * 0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.21 + time * 0.16, vec3(0.44, 0.59, 0.54), vec3(0.39, 0.44, 0.48), vec3(0.80, 0.73, 1.00), vec3(0.01, 0.00, 0.26)) * fog;
	col += vec3(0.97, 0.52, 0.78) * (it / 61.0) * 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

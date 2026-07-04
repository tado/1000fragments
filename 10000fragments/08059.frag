uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.82;
	float g = dot(sin(q * 1.65), cos(q.zxy * 1.65));
	return (abs(g) - 0.38) / (1.65 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.38));
	rd.xy = rot2(time * -0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.12 + time * 0.14, vec3(0.51, 0.44, 0.53), vec3(0.33, 0.39, 0.30), vec3(1.28, 0.94, 1.35), vec3(0.92, 0.26, 0.26)) * fog;
	col += vec3(0.59, 0.97, 0.77) * (it / 48.0) * 0.48;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

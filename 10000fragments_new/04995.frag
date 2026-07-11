uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.02;
	float g = dot(sin(q * 1.64), cos(q.zxy * 1.64));
	return (abs(g) - 0.65) / (1.64 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.64));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.21 + time * 0.27, vec3(0.55, 0.58, 0.56), vec3(0.42, 0.30, 0.44), vec3(0.81, 0.86, 0.85), vec3(0.49, 0.21, 0.92)) * fog;
	col += vec3(0.92, 0.49, 0.26) * (it / 48.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

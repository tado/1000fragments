uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.44) * q.xz;
	q.xy = rot2(time * 0.79) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.96, q.y);
	return length(w) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.98);
	vec3 rd = normalize(vec3(p, 1.56));
	rd.xy = rot2(time * 0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.16 + time * 0.37, vec3(0.46, 0.56, 0.56), vec3(0.31, 0.42, 0.31), vec3(1.07, 1.06, 1.37), vec3(0.67, 0.09, 0.06)) * fog;
	col += vec3(0.59, 0.21, 0.21) * (it / 72.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

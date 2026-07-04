uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.71) * q.xz;
	q.xy = rot2(time * 0.65) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.98, q.y);
	return length(w) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.16);
	vec3 rd = normalize(vec3(p, 1.56));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.31 + time * 0.12, vec3(0.54, 0.56, 0.48), vec3(0.44, 0.33, 0.37), vec3(1.19, 1.25, 0.90), vec3(0.38, 0.17, 0.98)) * fog;
	col += vec3(0.20, 0.93, 0.71) * (it / 56.0) * 0.57;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

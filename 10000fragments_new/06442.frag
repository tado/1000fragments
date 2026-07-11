uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.40) * q.xz;
	q.xy = rot2(time * 1.13) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.86, q.y);
	return length(w) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.31);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.26 + time * 0.24, vec3(0.52, 0.50, 0.56), vec3(0.35, 0.47, 0.40), vec3(0.84, 0.95, 1.26), vec3(0.00, 0.74, 0.38)) * fog;
	col += vec3(0.63, 0.35, 0.38) * (it / 63.0) * 0.82;
	col = fract(col * 1.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

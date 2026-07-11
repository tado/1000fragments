uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.69) * q.xz;
	q.xy = rot2(time * 0.80) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.32, q.y);
	return length(w) - 0.18;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.72));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.37 + time * 0.24, vec3(0.51, 0.44, 0.45), vec3(0.35, 0.42, 0.41), vec3(0.87, 0.97, 1.19), vec3(0.67, 0.38, 0.36)) * fog;
	col += vec3(0.66, 0.33, 0.31) * (it / 70.0) * 0.79;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

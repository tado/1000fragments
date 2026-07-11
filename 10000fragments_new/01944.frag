uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.70) * q.xz;
	q.xy = rot2(time * 0.70) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.08, q.y);
	return length(w) - 0.22;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.30);
	vec3 rd = normalize(vec3(p, 1.51));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.31 + time * 0.17, vec3(0.40, 0.46, 0.56), vec3(0.50, 0.37, 0.32), vec3(1.27, 0.89, 0.94), vec3(0.33, 0.96, 0.39)) * fog;
	col += vec3(0.79, 0.41, 0.24) * (it / 59.0) * 0.57;
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

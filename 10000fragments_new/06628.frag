uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.53) * q.xz;
	q.xy = rot2(time * 0.92) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.81, q.y);
	return length(w) - 0.16;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.01);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * -0.22) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.18 + time * 0.39, vec3(0.41, 0.56, 0.57), vec3(0.36, 0.41, 0.31), vec3(1.35, 0.83, 1.29), vec3(0.35, 0.02, 0.13)) * fog;
	col += vec3(0.55, 0.83, 0.55) * (it / 67.0) * 0.54;
	col *= 0.80 + 0.16 * sin(gl_FragCoord.y * 0.87 + time * 15.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

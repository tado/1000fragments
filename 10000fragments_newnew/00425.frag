uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.73) * q.xz;
	q.xy = rot2(time * 1.12) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.86, q.y);
	return length(w) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.38);
	vec3 rd = normalize(vec3(p, 1.41));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.15 + time * 0.02, vec3(0.45, 0.41, 0.57), vec3(0.46, 0.43, 0.45), vec3(0.89, 0.82, 0.71), vec3(0.96, 0.70, 0.86)) * fog;
	col += vec3(0.50, 0.74, 0.97) * (it / 60.0) * 0.53;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

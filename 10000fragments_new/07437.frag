uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.58) * q.xz;
	q.xy = rot2(time * 0.89) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.32, q.y);
	return length(w) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.25);
	vec3 rd = normalize(vec3(p, 1.19));
	rd.xy = rot2(time * -0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.20 + time * 0.11, vec3(0.60, 0.56, 0.48), vec3(0.45, 0.35, 0.30), vec3(1.31, 1.16, 0.79), vec3(0.74, 0.10, 0.90)) * fog;
	col += vec3(0.23, 0.78, 0.53) * (it / 58.0) * 0.75;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

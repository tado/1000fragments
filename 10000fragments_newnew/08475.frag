uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.52) * q.xz;
	q.xy = rot2(time * 1.17) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.30, q.y);
	return length(w) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.67);
	vec3 rd = normalize(vec3(p, 1.65));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.24 + time * 0.24, vec3(0.60, 0.52, 0.41), vec3(0.40, 0.45, 0.34), vec3(1.20, 1.25, 0.93), vec3(0.54, 0.99, 0.01)) * fog;
	col += vec3(0.50, 0.99, 0.62) * (it / 64.0) * 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

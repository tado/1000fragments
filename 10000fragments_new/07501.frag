uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.43) * q.xz;
	q.xy = rot2(time * 0.44) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.32, q.y);
	return length(w) - 0.16;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.74);
	vec3 rd = normalize(vec3(p, 0.93));
	rd.xy = rot2(time * -0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.21 + time * 0.29, vec3(0.46, 0.49, 0.45), vec3(0.43, 0.43, 0.34), vec3(1.31, 1.28, 0.74), vec3(0.59, 0.67, 0.45)) * fog;
	col += vec3(0.73, 0.90, 0.41) * (it / 48.0) * 0.67;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

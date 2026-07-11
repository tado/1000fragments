uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.67) * q.xz;
	q.xy = rot2(time * 1.07) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.25, q.y);
	return length(w) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.87);
	vec3 rd = normalize(vec3(p, 1.68));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.17 + time * 0.12, vec3(0.41, 0.54, 0.51), vec3(0.38, 0.41, 0.34), vec3(1.12, 0.71, 1.29), vec3(0.25, 0.61, 0.40)) * fog;
	col += vec3(0.73, 0.96, 0.57) * (it / 72.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

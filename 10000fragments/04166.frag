uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.53) * q.xz;
	q.xy = rot2(time * 0.47) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.07, q.y);
	return length(w) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.02);
	vec3 rd = normalize(vec3(p, 1.75));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.31 + time * 0.09, vec3(0.48, 0.44, 0.50), vec3(0.32, 0.46, 0.32), vec3(1.04, 0.87, 1.12), vec3(0.85, 0.09, 0.48)) * fog;
	col += vec3(0.54, 0.27, 0.95) * (it / 63.0) * 0.97;
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

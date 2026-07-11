uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.47) * q.xz;
	q.xy = rot2(time * 1.13) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.80, q.y);
	return length(w) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.21);
	vec3 rd = normalize(vec3(p, 1.02));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.15 + time * 0.36, vec3(0.59, 0.52, 0.52), vec3(0.33, 0.37, 0.43), vec3(0.73, 0.87, 1.06), vec3(0.58, 0.39, 0.21)) * fog;
	col += vec3(0.73, 0.68, 0.21) * (it / 70.0) * 0.81;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.60) * q.xz;
	q.xy = rot2(time * 1.10) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.15, q.y);
	return length(w) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.16);
	vec3 rd = normalize(vec3(p, 1.14));
	rd.xy = rot2(time * 0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.11 + time * 0.36, vec3(0.46, 0.50, 0.54), vec3(0.50, 0.44, 0.39), vec3(1.21, 1.36, 0.93), vec3(0.54, 0.79, 0.99)) * fog;
	col += vec3(0.60, 0.48, 0.53) * (it / 69.0) * 0.68;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

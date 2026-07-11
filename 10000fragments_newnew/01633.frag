uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.41) * q.xz;
	q.xy = rot2(time * 0.69) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.99, q.y);
	return length(w) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.80);
	vec3 rd = normalize(vec3(p, 0.93));
	rd.xy = rot2(time * 0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.37 + time * 0.24, vec3(0.57, 0.60, 0.52), vec3(0.32, 0.50, 0.49), vec3(1.01, 1.40, 1.28), vec3(0.14, 0.60, 0.55)) * fog;
	col += vec3(0.52, 0.48, 0.76) * (it / 72.0) * 0.57;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

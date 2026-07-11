uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.33) * q.xz;
	q.xy = rot2(time * 1.00) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.06, q.y);
	return length(w) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.21));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.40 + time * 0.27, vec3(0.48, 0.50, 0.41), vec3(0.34, 0.33, 0.34), vec3(1.33, 1.21, 1.04), vec3(0.83, 0.95, 0.10)) * fog;
	col += vec3(0.61, 0.70, 0.69) * (it / 48.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

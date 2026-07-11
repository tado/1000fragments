uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.56) * q.xz;
	q.xy = rot2(time * 0.49) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.14, q.y);
	return length(w) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.74);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.24 + time * 0.39, vec3(0.52, 0.54, 0.48), vec3(0.41, 0.30, 0.40), vec3(0.91, 0.99, 0.73), vec3(0.24, 0.07, 0.64)) * fog;
	col += vec3(0.56, 0.82, 0.73) * (it / 67.0) * 0.83;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

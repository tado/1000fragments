uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.63) * q.xz;
	q.xy = rot2(time * 0.63) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.91, q.y);
	return length(w) - 0.23;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.21);
	vec3 rd = normalize(vec3(p, 1.25));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.34 + time * 0.35, vec3(0.58, 0.54, 0.47), vec3(0.32, 0.48, 0.50), vec3(0.94, 1.35, 1.14), vec3(0.71, 0.66, 0.95)) * fog;
	col += vec3(0.78, 0.87, 0.59) * (it / 70.0) * 0.32;
	col = mod(col * 1.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

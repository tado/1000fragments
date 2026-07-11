uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.64) * q.xz;
	q.xy = rot2(time * 0.74) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.92, q.y);
	return length(w) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.42);
	vec3 rd = normalize(vec3(p, 1.50));
	rd.xy = rot2(time * -0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.40 + time * 0.37, vec3(0.54, 0.42, 0.43), vec3(0.33, 0.44, 0.45), vec3(1.09, 1.16, 0.98), vec3(0.99, 0.07, 0.78)) * fog;
	col += vec3(0.89, 0.58, 0.26) * (it / 57.0) * 0.31;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

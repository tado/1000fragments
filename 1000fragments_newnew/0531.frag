uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.xz = rot2((time * 0.58) * 1.31) * q.xz;
	q.xy = rot2((time * 0.58) * 0.93) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.22, q.y);
	return length(w) - 0.18;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.49);
	vec3 rd = normalize(vec3(p, 1.08));
	rd.xy = rot2((time * 0.58) * 0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.30 + (time * 0.58) * 0.09, vec3(0.28, 0.32, 0.35), vec3(0.26, 0.31, 0.27), vec3(0.76, 0.78, 0.69), vec3(0.39, 0.49, 0.52)) * fog;
	col += vec3(0.77, 0.81, 0.86) * (it / 67.0) * 0.65;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.912, 0.983, 1.036) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

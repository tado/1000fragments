uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.xz = rot2((time * 0.69) * 1.09) * q.xz;
	q.xy = rot2((time * 0.69) * 0.80) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.86, q.y);
	return length(w) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.81);
	vec3 rd = normalize(vec3(p, 1.24));
	rd.xy = rot2((time * 0.69) * 0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.35 + (time * 0.69) * 0.10, vec3(0.32, 0.22, 0.22), vec3(0.20, 0.20, 0.22), vec3(0.40, 0.74, 0.75), vec3(0.92, 0.69, 0.62)) * fog;
	col += vec3(0.90, 0.85, 0.79) * (it / 65.0) * 0.74;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.998, 0.945) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

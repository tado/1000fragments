uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.36;
	vec2 g = mod(vec2(q.x, q.z), 2.46) - 1.23;
	float d = length(g) - (0.18 + 0.13 * sin(q.y * 2.82 + time * 3.76));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.23, 1.23, -3.0);
	vec3 rd = normalize(vec3(p, 1.48));
	rd.xy = rot2(time * 0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = hue(tt * 0.17 + time * 0.00) * fog;
	col += vec3(0.34, 0.35, 0.89) * (it / 54.0) * 0.99;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

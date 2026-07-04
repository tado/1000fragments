uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.69;
	vec2 g = mod(vec2(q.x, q.z), 2.25) - 1.12;
	float d = length(g) - (0.16 + 0.11 * sin(q.y * 1.65 + time * 3.20));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 1.69));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = hue(tt * 0.24 + time * 0.27) * fog;
	col += vec3(0.30, 0.87, 0.51) * (it / 63.0) * 0.85;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

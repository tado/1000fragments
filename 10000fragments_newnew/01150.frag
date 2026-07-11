uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.70;
	vec2 g = mod(vec2(q.x, q.z), 2.29) - 1.15;
	float d = length(g) - (0.28 + 0.07 * sin(q.y * 3.60 + time * 1.80));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.15, 1.15, -3.0);
	vec3 rd = normalize(vec3(p, 1.51));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = hue(tt * 0.16 + time * 0.16) * fog;
	col += vec3(0.88, 0.26, 0.62) * (it / 65.0) * 0.80;
	col = fract(col * 1.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

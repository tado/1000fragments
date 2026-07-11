uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 2.04;
	vec2 g = mod(vec2(q.x, q.z), 1.88) - 0.94;
	float d = length(g) - (0.29 + 0.13 * sin(q.y * 3.96 + time * 1.19));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.94, 0.94, -3.0);
	vec3 rd = normalize(vec3(p, 1.04));
	rd.xy = rot2(time * -0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = hue(tt * 0.22 + time * 0.00) * fog;
	col += vec3(0.25, 0.83, 0.38) * (it / 71.0) * 0.81;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

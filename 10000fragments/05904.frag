uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.62;
	vec2 g = mod(vec2(q.x, q.z), 2.53) - 1.26;
	float d = length(g) - (0.17 + 0.11 * sin(q.y * 2.08 + time * 1.93));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.26, 1.26, -3.0);
	vec3 rd = normalize(vec3(p, 1.43));
	rd.xy = rot2(time * 0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = hue(tt * 0.13 + time * 0.21) * fog;
	col += vec3(0.53, 0.94, 0.58) * (it / 55.0) * 0.65;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.48 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

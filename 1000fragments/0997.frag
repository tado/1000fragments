uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.75;
	vec2 g = mod(vec2(q.x, q.z), 2.10) - 1.05;
	float d = length(g) - (0.22 + 0.12 * sin(q.y * 1.28 + time * 3.50));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.31));
	rd.xy = rot2(time * 0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = hue(tt * 0.17 + time * 0.17) * fog;
	col += vec3(0.33, 0.26, 0.89) * (it / 67.0) * 0.65;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

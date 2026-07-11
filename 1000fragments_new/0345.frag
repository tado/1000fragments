uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.64;
	vec2 g = mod(vec2(q.x, q.z), 2.31) - 1.16;
	float d = length(g) - (0.29 + 0.13 * sin(q.y * 2.86 + time * 3.30));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 0.96));
	rd.xy = rot2(time * -0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = hue(tt * 0.10 + time * 0.03) * fog;
	col += vec3(0.21, 0.60, 0.88) * (it / 67.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

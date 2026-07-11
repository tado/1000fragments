uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.92;
	float g = dot(sin(q * 3.40), cos(q.zxy * 3.40));
	return (abs(g) - 0.64) / (3.40 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.67);
	vec3 rd = normalize(vec3(p, 0.97));
	rd.xy = rot2(time * -0.07) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = hue(tt * 0.15 + time * 0.28) * fog;
	col += vec3(0.74, 0.56, 0.97) * (it / 72.0) * 0.57;
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 1.04 + time * 9.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

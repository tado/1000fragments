uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.36;
	float g = dot(sin(q * 1.94), cos(q.zxy * 1.94));
	return (abs(g) - 0.48) / (1.94 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.14);
	vec3 rd = normalize(vec3(p, 1.50));
	rd.xy = rot2(time * -0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = hue(tt * 0.18 + time * 0.21) * fog;
	col += vec3(0.50, 0.38, 0.25) * (it / 71.0) * 0.31;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.72;
	float g = dot(sin(q * 1.83), cos(q.zxy * 1.83));
	return (abs(g) - 0.75) / (1.83 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.40);
	vec3 rd = normalize(vec3(p, 1.18));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = hue(tt * 0.29 + time * 0.17) * fog;
	col += vec3(0.73, 0.51, 0.96) * (it / 52.0) * 0.91;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

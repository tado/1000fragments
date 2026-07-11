uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.32;
	float g = dot(sin(q * 3.82), cos(q.zxy * 3.82));
	return (abs(g) - 0.65) / (3.82 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 0.94));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = hue(tt * 0.18 + time * 0.24) * fog;
	col += vec3(0.67, 0.56, 0.91) * (it / 71.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

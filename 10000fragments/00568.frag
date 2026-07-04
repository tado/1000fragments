uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.66;
	float g = dot(sin(q * 1.72), cos(q.zxy * 1.72));
	return (abs(g) - 0.59) / (1.72 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.46);
	vec3 rd = normalize(vec3(p, 1.78));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = hue(tt * 0.15 + time * 0.21) * fog;
	col += vec3(0.25, 0.57, 0.76) * (it / 69.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.84;
	float g = dot(sin(q * 3.81), cos(q.zxy * 3.81));
	return (abs(g) - 0.69) / (3.81 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.45);
	vec3 rd = normalize(vec3(p, 1.25));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = hue(tt * 0.25 + time * 0.20) * fog;
	col += vec3(0.21, 0.59, 0.92) * (it / 61.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

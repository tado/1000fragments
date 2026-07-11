uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.20;
	float g = dot(sin(q * 2.68), cos(q.zxy * 2.68));
	return (abs(g) - 0.37) / (2.68 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.36);
	vec3 rd = normalize(vec3(p, 1.28));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = hue(tt * 0.23 + time * 0.17) * fog;
	col += vec3(0.58, 0.75, 0.71) * (it / 72.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

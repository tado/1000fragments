uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.25;
	float g = dot(sin(q * 2.51), cos(q.zxy * 2.51));
	return (abs(g) - 0.27) / (2.51 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.66);
	vec3 rd = normalize(vec3(p, 1.68));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = hue(tt * 0.26 + time * 0.29) * fog;
	col += vec3(0.88, 0.82, 0.63) * (it / 71.0) * 0.85;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.67 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

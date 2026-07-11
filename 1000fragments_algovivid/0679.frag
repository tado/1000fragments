uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.58) * (0.48 + 0.46 * h1) + fi * 2.39), cos((time * 0.58) * (0.51 + 0.52 * h2) + fi * 1.73)) * 0.73;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.98 + (time * 0.58) * 0.47) * 0.11;
	p.y = abs(p.y) - 0.35;
	p *= 1.34;
	vec3 col = vec3(0.005, 0.001, 0.068);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.33, 2.66) + fi * 0.99 + (time * 0.58) * 0.29)) * (0.0111 / (length(p - na) + 0.027));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.96){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.54, 0.74, 0.44) * (0.0028 / (sd + 0.018)) * (1.0 - ll / 0.96);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 1.001, 0.999) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

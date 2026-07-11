uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.55) * (0.63 + 0.94 * h1) + fi * 2.39), cos((time * 0.55) * (0.71 + 0.46 * h2) + fi * 1.73)) * 0.78;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	p.y += sin(p.x * 1.44 + (time * 0.55) * 1.27) * 0.19;
	vec3 col = vec3(0.003, 0.026, 0.004);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.57, 3.14) + fi * 1.19 + (time * 0.55) * 0.86)) * (0.0105 / (length(p - na) + 0.022));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.02){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 1.57, 3.14) + ll * 1.24 + (time * 0.55) * 0.54)) * (0.0021 / (sd + 0.009)) * (1.0 - ll / 1.02);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 1.015, 0.926) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

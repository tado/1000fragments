uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.51) * (0.79 + 0.60 * h1) + fi * 2.39), cos((time * 0.51) * (0.62 + 0.77 * h2) + fi * 1.73)) * 0.73;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.78;
	p.x = abs(p.x) - 0.21;
	vec3 col = vec3(0.033, 0.002, 0.052);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.42, 0.84) + fi * 0.36 + (time * 0.51) * 0.61)) * (0.0118 / (length(p - na) + 0.025));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.08){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.29, 0.43, 0.84) * (0.0028 / (sd + 0.016)) * (1.0 - ll / 1.08);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.056, 0.972, 0.915) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

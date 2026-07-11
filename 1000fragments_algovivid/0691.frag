uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.76) * (0.40 + 1.13 * h1) + fi * 2.39), cos((time * 0.76) * (0.33 + 0.56 * h2) + fi * 1.73)) * 0.87;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p = rot2((time * 0.76) * 0.88) * p;
	vec3 col = vec3(0.037, 0.026, 0.037);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.36, 2.72) + fi * 0.77 + (time * 0.76) * 0.20)) * (0.0115 / (length(p - na) + 0.015));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.81){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.30, 0.60, 0.33) * (0.0011 / (sd + 0.010)) * (1.0 - ll / 0.81);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 1.76 + (time * 0.76) * 17.09);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.961, 1.003) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.51 + 0.63 * h1) + fi * 2.39), cos(time * (0.61 + 0.42 * h2) + fi * 1.73)) * 0.86;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.40) * p;
	vec3 col = vec3(0.033, 0.030, 0.018);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.39 + time * 0.90)) * (0.0045 / (length(p - na) + 0.027));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.08){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.31, 0.51, 0.26) * (0.0025 / (sd + 0.020)) * (1.0 - ll / 1.08);
			}
		}
	}
	col = col / (1.0 + col);
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.65 + 0.86 * h1) + fi * 2.39), cos(time * (0.69 + 0.91 * h2) + fi * 1.73)) * 0.56;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.18) * p;
	vec3 col = vec3(0.025, 0.016, 0.032);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.81 + time * 0.56)) * (0.0063 / (length(p - na) + 0.017));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.87){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.41, 0.31, 0.69) * (0.0013 / (sd + 0.010)) * (1.0 - ll / 0.87);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 1.09 + time * 6.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

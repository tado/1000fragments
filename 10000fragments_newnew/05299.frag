uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.64 + 0.68 * h1) + fi * 2.39), cos(time * (0.77 + 0.75 * h2) + fi * 1.73)) * 0.73;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.013, 0.024, 0.028);
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.30 + time * 0.78)) * (0.0092 / (length(p - na) + 0.024));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.88){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.26, 0.73, 0.60) * (0.0025 / (sd + 0.013)) * (1.0 - ll / 0.88);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.10 * sin(gl_FragCoord.y * 2.77 + time * 5.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

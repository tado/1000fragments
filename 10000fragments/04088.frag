uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.44 + 0.89 * h1) + fi * 2.39), cos(time * (0.58 + 0.33 * h2) + fi * 1.73)) * 0.66;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	vec3 col = vec3(0.037, 0.035, 0.065);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.36 + time * 0.53)) * (0.0060 / (length(p - na) + 0.014));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.04){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.33, 0.66, 0.48) * (0.0028 / (sd + 0.012)) * (1.0 - ll / 1.04);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 0.96 + time * 17.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.57 + 1.15 * h1) + fi * 2.39), cos(time * (0.46 + 0.75 * h2) + fi * 1.73)) * 0.61;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.037, 0.034);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.63 + time * 0.62)) * (0.0085 / (length(p - na) + 0.020));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.95){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.31, 0.66, 0.83) * (0.0028 / (sd + 0.012)) * (1.0 - ll / 0.95);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.12 * sin(gl_FragCoord.y * 2.46 + time * 10.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

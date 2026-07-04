uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.41 + 1.00 * h1) + fi * 2.39), cos(time * (0.70 + 0.51 * h2) + fi * 1.73)) * 0.84;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	vec3 col = vec3(0.037, 0.024, 0.005);
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.35 + time * 0.47)) * (0.0086 / (length(p - na) + 0.025));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.04){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.91, 0.95, 0.66) * (0.0025 / (sd + 0.017)) * (1.0 - ll / 1.04);
			}
		}
	}
	col = col / (1.0 + col);
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

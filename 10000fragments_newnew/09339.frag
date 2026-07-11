uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.57 + 0.40 * h1) + fi * 2.39), cos(time * (0.47 + 0.41 * h2) + fi * 1.73)) * 0.75;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	vec3 col = vec3(0.024, 0.005, 0.063);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.49 + time * 0.17)) * (0.0073 / (length(p - na) + 0.021));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.92){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * 1.33 + time * 0.72)) * (0.0027 / (sd + 0.012)) * (1.0 - ll / 0.92);
			}
		}
	}
	col = col / (1.0 + col);
	col = fract(col * 1.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

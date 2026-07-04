uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.77 + 0.72 * h1) + fi * 2.39), cos(time * (0.60 + 0.54 * h2) + fi * 1.73)) * 0.91;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	vec3 col = vec3(0.018, 0.010, 0.035);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.28 + time * 0.75)) * (0.0060 / (length(p - na) + 0.015));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.83){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * 2.84 + time * 0.57)) * (0.0023 / (sd + 0.019)) * (1.0 - ll / 0.83);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 2.89 + time * 5.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

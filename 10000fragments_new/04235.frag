uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.41 * sin(mf + 3.0) + ph), cos(t * 2.09 * cos(mf + 3.0) + ph));
        ms += 0.097 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(0.69) * p; }
	p += vec2(-0.66, -0.58) * sin(length(p) * 4.92 - time * 1.04) * 0.17;
	p = (floor(p * 25.8) + 0.5) / 25.8;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.94, 0.50, 0.30) * (0.10 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

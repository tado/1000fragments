uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.41 * sin(mf + 3.0) + ph), cos(t * 0.41 * cos(mf + 3.0) + ph));
        ms += 0.061 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.36;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.47; p = rot2(2.58) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.07, vec3(0.55, 0.45, 0.40), vec3(0.39, 0.31, 0.43), vec3(0.83, 0.81, 1.12), vec3(0.96, 0.59, 0.51));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

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
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.29 * sin(mf + 3.0) + ph), cos(t * 1.29 * cos(mf + 3.0) + ph));
        ms += 0.089 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.56 + time * 1.03) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.31; p = rot2(1.70) * p; }
	p += vec2(-0.72, 0.74) * sin(length(p) * 4.45 - time * 1.97) * 0.16;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.65 + time * 0.04, vec3(0.57, 0.55, 0.41), vec3(0.42, 0.39, 0.32), vec3(1.19, 0.88, 0.71), vec3(0.48, 0.21, 0.44));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

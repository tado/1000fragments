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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.67 * sin(mf + 3.0) + ph), cos(t * 0.67 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	p = rot2(0.43) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.33; p = rot2(2.25) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 5.40 - time * 0.71); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.14, vec3(0.45, 0.56, 0.50), vec3(0.45, 0.42, 0.41), vec3(0.90, 0.95, 1.01), vec3(0.19, 0.88, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

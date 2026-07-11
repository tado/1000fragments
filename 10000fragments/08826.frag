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
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.60 * sin(mf + 3.0) + ph), cos(t * 0.60 * cos(mf + 3.0) + ph));
        ms += 0.094 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.85 + t * 2.59 + ph) + sin(p.y * 13.97 - t * 2.59 + ph)
        + sin((p.x + p.y) * 9.42 + t * 2.59 + ph) + sin(length(p) * 17.53 - t * 2.59 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.40; p = rot2(1.40) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = d1 + d2;
	vec3 col = palette(d * 1.21 + time * 0.00, vec3(0.55, 0.59, 0.43), vec3(0.39, 0.43, 0.46), vec3(1.37, 1.00, 1.04), vec3(0.81, 0.87, 0.62));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

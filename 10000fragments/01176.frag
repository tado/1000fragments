uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.23 + t * 1.97 + ph) + sin(p.y * 3.35 - t * 1.97 + ph)
        + sin((p.x + p.y) * 3.96 + t * 1.97 + ph) + sin(length(p) * 4.85 - t * 1.97 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.27; p = rot2(0.40) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.20, vec3(0.42, 0.42, 0.59), vec3(0.41, 0.33, 0.31), vec3(0.75, 1.39, 0.86), vec3(0.06, 0.14, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

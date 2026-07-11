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
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.39 * sin(mf + 3.0) + ph), cos(t * 1.39 * cos(mf + 3.0) + ph));
        ms += 0.087 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.94) * p;
	p *= 2.93;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.71 + time * 0.19, vec3(0.43, 0.59, 0.56), vec3(0.42, 0.37, 0.43), vec3(0.90, 1.31, 1.17), vec3(0.02, 0.35, 0.87));
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

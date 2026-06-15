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
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.43 * sin(mf + 3.0) + ph), cos(t * 0.43 * cos(mf + 3.0) + ph));
        ms += 0.048 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.82 + time * 0.45) * p;
	p = rot2(time * -0.69) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.27, vec3(0.56, 0.52, 0.56), vec3(0.30, 0.46, 0.36), vec3(0.77, 1.27, 1.39), vec3(0.35, 0.07, 0.50));
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

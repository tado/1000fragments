uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.82 + sin(p.y * 3.23 + t * 2.77) * 1.75 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.94 * sin(mf + 3.0) + ph), cos(t * 0.94 * cos(mf + 3.0) + ph));
        ms += 0.083 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.07) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.64 + time * 0.19, vec3(0.54, 0.48, 0.41), vec3(0.35, 0.30, 0.44), vec3(0.76, 0.71, 1.26), vec3(0.46, 0.53, 0.60));
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.48 + sin(p.y * 1.40 + t * 2.63) * 4.79 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.45 * sin(mf + 3.0) + ph), cos(t * 1.45 * cos(mf + 3.0) + ph));
        ms += 0.032 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p = rot2(time * -1.22) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = d1 * d2;
	vec3 col = palette(d * 0.60 + time * 0.00, vec3(0.42, 0.44, 0.44), vec3(0.42, 0.45, 0.45), vec3(0.85, 1.11, 1.05), vec3(0.05, 0.33, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

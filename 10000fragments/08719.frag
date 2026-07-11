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
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.83 * sin(mf + 3.0) + ph), cos(t * 0.83 * cos(mf + 3.0) + ph));
        ms += 0.025 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.41 + t * 3.71 + ph) + sin(p.y * 10.55 - t * 1.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	p = rot2(time * 0.23) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.44);
	float d = d1 * d2;
	vec3 col = palette(d * 1.51 + time * 0.09, vec3(0.49, 0.59, 0.50), vec3(0.48, 0.36, 0.44), vec3(0.91, 0.99, 1.39), vec3(0.36, 0.56, 0.72));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

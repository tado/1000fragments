uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.99 + t * 4.10 + ph) + sin(p.y * 11.89 - t * 4.10 + ph)
        + sin((p.x + p.y) * 2.03 + t * 4.10 + ph) + sin(length(p) * 5.29 - t * 4.10 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.60 * sin(mf + 3.0) + ph), cos(t * 1.60 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.60;
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 5.26 - time * 0.73); }
	p = abs(p) - 0.78;
	p += vec2(-0.33, 0.40) * sin(length(p) * 3.44 - time * 1.81) * 0.25;
	p = rot2(time * -0.70) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.57 + time * 0.13, vec3(0.59, 0.49, 0.51), vec3(0.46, 0.41, 0.38), vec3(0.84, 1.23, 1.39), vec3(0.62, 0.37, 0.45));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

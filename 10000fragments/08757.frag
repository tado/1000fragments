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
        vec2 mm = vec2(sin(t * 2.44 * sin(mf + 3.0) + ph), cos(t * 2.44 * cos(mf + 3.0) + ph));
        ms += 0.022 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	p *= 2.19;
	p = rot2(0.90) * p;
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.57 + time * 0.15, vec3(0.57, 0.59, 0.55), vec3(0.32, 0.48, 0.33), vec3(1.15, 0.98, 0.81), vec3(0.28, 0.94, 0.51));
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

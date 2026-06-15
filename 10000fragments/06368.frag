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
        vec2 mm = vec2(sin(t * 1.80 * sin(mf + 3.0) + ph), cos(t * 1.80 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.99 + time * 0.87) * p;
	p = rot2(2.15) * p;
	p = abs(p) - 0.55;
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.21, vec3(0.58, 0.46, 0.47), vec3(0.44, 0.50, 0.39), vec3(0.87, 0.82, 1.01), vec3(0.37, 0.49, 0.34));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

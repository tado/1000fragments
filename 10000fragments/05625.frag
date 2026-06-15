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
        vec2 mm = vec2(sin(t * 0.31 * sin(mf + 3.0) + ph), cos(t * 0.31 * cos(mf + 3.0) + ph));
        ms += 0.046 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 2.48 - time * 0.37); }
	p = rot2(length(p) * -3.75 + time * 0.97) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.27, vec3(0.46, 0.46, 0.50), vec3(0.48, 0.39, 0.50), vec3(1.19, 0.85, 1.05), vec3(0.47, 0.97, 0.51));
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

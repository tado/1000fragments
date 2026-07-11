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
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.16 * sin(mf + 3.0) + ph), cos(t * 2.16 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.56) * p;
	p = rot2(p.y * 3.97 + time * 0.37) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.15, vec3(0.58, 0.44, 0.58), vec3(0.45, 0.46, 0.32), vec3(1.28, 0.95, 0.91), vec3(0.61, 0.42, 0.68));
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

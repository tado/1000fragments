uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.31 * sin(mf + 3.0) + ph), cos(t * 1.31 * cos(mf + 3.0) + ph));
        ms += 0.046 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	p += vec2(0.32, 0.91) * sin(length(p) * 5.33 - time * 1.09) * 0.14;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.02, vec3(0.51, 0.44, 0.49), vec3(0.30, 0.38, 0.39), vec3(1.37, 0.94, 1.22), vec3(0.91, 0.16, 0.79));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

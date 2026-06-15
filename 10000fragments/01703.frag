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
        vec2 mm = vec2(sin(t * 1.04 * sin(mf + 3.0) + ph), cos(t * 1.04 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.71 + time * 0.21) * p;
	p = rot2(2.43) * p;
	p = rot2(length(p) * 3.08 + time * 0.77) * p;
	p = rot2(time * 0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.07, vec3(0.41, 0.50, 0.41), vec3(0.43, 0.31, 0.42), vec3(1.37, 1.37, 1.20), vec3(0.20, 0.45, 0.98));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.71 * sin(mf + 3.0) + ph), cos(t * 1.50 * cos(mf + 3.0) + ph));
        ms += 0.083 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.01, vec3(0.52, 0.51, 0.57), vec3(0.33, 0.32, 0.40), vec3(0.75, 1.22, 0.84), vec3(0.13, 0.32, 0.68));
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.23 * sin(mf + 3.0) + ph), cos(t * 0.89 * cos(mf + 3.0) + ph));
        ms += 0.026 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = abs(p) - 0.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.06, vec3(0.47, 0.57, 0.55), vec3(0.42, 0.43, 0.42), vec3(1.15, 0.95, 1.21), vec3(0.99, 0.87, 0.32));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

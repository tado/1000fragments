uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.78 * sin(mf + 3.0) + ph), cos(t * 0.78 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.13, vec3(0.43, 0.57, 0.53), vec3(0.30, 0.45, 0.31), vec3(1.08, 0.91, 1.08), vec3(0.16, 0.58, 0.52));
	col = mod(col * 2.06, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
